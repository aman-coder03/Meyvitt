/* =========================================================
   STOPWORDS
   Common words ignored when scoring questions, so "how",
   "do" and "you" no longer push the wrong answer to the top.
========================================================== */

const STOPWORDS = new Set(
    (
        "a an the i you your my me we is it its are am be do does did can " +
        "could would should will to of in on for with at by from and or but " +
        "if so this that these those what which who how when where why there " +
        "here have has had not no yes please just about into than then also any some"
    ).split(" ")
);


class AIAgent {

    constructor(knowledge, config) {

        this.knowledge = knowledge;

        this.config = config;

        this.conversation = [];

        this._normCache = new Map();

        // Sales conversation state
        this.salesState = {

            lastRecommendedProduct: null,

            customerPreference: null,

            pendingQuestion: null,

            comparedProducts: [],

            stage: "start"

        };

    }


    /* =========================================================
       MAIN PROCESSOR
    ========================================================== */

    process(message) {

        const text = this.normalize(message);

        this.conversation.push({
            role: "user",
            message: message
        });


        /* GREETING */

        const greeting = this.checkGreeting(text);

        if (greeting) {
            return { type: "text", text: greeting };
        }


        /* SALES CONVERSATION (follow-ups and preferences) */

        const salesResponse = this.handleSalesConversation(text);

        if (salesResponse) {
            return salesResponse;
        }

        // A discovery question only lasts one turn
        if (this.salesState.stage === "discovery") {
            this.salesState.stage = "start";
        }


        /* SALES DISCOVERY ("help me choose") */

        const discovery = this.handleDiscovery(text);

        if (discovery) {
            return discovery;
        }


        /* COMPARISON */

        if (this.isComparisonRequest(text)) {

            this.salesState.stage = "comparison";

            this.salesState.comparedProducts =
                this.findProductsForComparison(text);

            return {
                type: "comparison",
                products: this.salesState.comparedProducts,
                recommendedId: this.getRecommendedIdFor(
                    this.salesState.comparedProducts
                )
            };

        }


        /* INTENT + PRODUCT DETECTION */

        const intent = this.findBestIntent(text);

        const product = this.findProduct(text);

        if (product) {
            return { type: "product", product: product };
        }


        /* FAQ */

        if (intent) {

            let answer = intent.answer;

            if (intent.id === "support" || intent.id === "contact") {

                const contact = this.knowledge.company.contact;

                answer +=
                    `\n\nEmail: ${contact.email}` +
                    `\nPhone: ${contact.phone}`;

            }

            return { type: "text", text: answer };

        }


        /* GENERAL QUESTION ABOUT WHAT IS OFFERED */

        if (
            this.containsAny(
                text,
                ["product", "products", "sell", "selling", "offer", "buy"]
            )
        ) {

            return {
                type: "text",
                text:
                    "PointsGo helps you find award flights you can book with credit card points and miles. I can explain how it works, which cards are supported or help you pick a plan."
            };

        }


        /* GENERAL HELP */

        if (this.containsAny(text, ["help", "assist", "assistance"])) {

            return {
                type: "text",
                text:
                    "Of course. I can help with how PointsGo works, supported cards, plans and pricing, booking with points, accounts and support."
            };

        }


        /* FALLBACK */

        return { type: "text", text: this.getFallback() };

    }


    /* =========================================================
       TEXT HELPERS
    ========================================================== */

    /* Lowercase, drop apostrophes (can't -> cant), turn other symbols into spaces */
    normalize(text) {

        return String(text)
            .toLowerCase()
            .replace(/[\u2019'`]/g, "")
            .replace(/[^a-z0-9\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    }


    /* Normalize keywords once instead of on every message */
    normCached(text) {

        let value = this._normCache.get(text);

        if (value === undefined) {
            value = this.normalize(text);
            this._normCache.set(text, value);
        }

        return value;

    }


    /* Whole-word phrase match: "api" no longer matches "capital" */
    phraseIn(text, phrase) {

        return (" " + text + " ").includes(" " + phrase + " ");

    }


    containsAny(text, words) {

        const normalizedText = this.normalize(text);

        return words.some(
            word => this.phraseIn(normalizedText, this.normCached(word))
        );

    }


    /* =========================================================
       GREETING
    ========================================================== */

    checkGreeting(text) {

        const greetings = [
            "hi", "hello", "hey", "hiya", "howdy", "yo",
            "good morning", "good afternoon", "good evening",
            "hi there", "hello there", "hey there"
        ];

        if (greetings.includes(text)) {
            return this.config.assistant.greeting;
        }

        const words = text.split(" ");

        const startsWithGreeting =
            ["hi", "hello", "hey", "hiya", "howdy"].includes(words[0]);

        if (startsWithGreeting && words.length <= 3) {
            return this.config.assistant.greeting;
        }

        if (
            startsWithGreeting &&
            this.containsAny(text, [
                "can you help",
                "could you help",
                "are you able to help",
                "i need some help",
                "can you assist",
                "could you assist"
            ])
        ) {
            return this.config.assistant.greeting;
        }

        return null;

    }


    /* =========================================================
       COMPARISON DETECTION
    ========================================================== */

    isComparisonRequest(text) {

        const phrases = [
            "compare",
            "comparison",
            "compare products",
            "compare product",
            "compare the products",
            "compare these products",
            "compare the options",
            "compare options",
            "compare plans",
            "product comparison",
            "difference between",
            "differences between",
            "what is the difference",
            "whats the difference",
            "which is better",
            "which product is better",
            "which one is better"
        ];

        return phrases.some(
            phrase => this.phraseIn(text, this.normCached(phrase))
        );

    }


    /* =========================================================
       FIND PRODUCTS TO COMPARE
    ========================================================== */

    findProductsForComparison(text) {

        /* 1. If the customer named specific products, compare those */

        const matched = this.knowledge.products
            .map(product => ({
                product,
                score: this.scoreProduct(text, product)
            }))
            .filter(entry => entry.score >= 20)
            .sort((a, b) => b.score - a.score)
            .map(entry => entry.product);

        if (matched.length >= 2) {
            return matched.slice(0, 2);
        }


        /* 2. Mid sales-conversation: last recommendation vs a different one */

        if (this.salesState.lastRecommendedProduct) {

            const current = this.salesState.lastRecommendedProduct;

            const alternative = this.knowledge.products.find(
                product => product.id !== current.id
            );

            if (alternative) {
                return [current, alternative];
            }

        }


        /* 3. Cheapest vs premium */

        const cheapest = this.getCheapestProduct();
        const premium = this.getPremiumProduct();

        if (cheapest && premium && cheapest.id !== premium.id) {
            return [cheapest, premium];
        }


        /* 4. Last resort */

        return this.knowledge.products.slice(0, 2);

    }


    /* =========================================================
       INTENT SCORING
    ========================================================== */

    findBestIntent(text) {

        const tokens = [
            ...new Set(
                text.split(" ").filter(t => t && !STOPWORDS.has(t))
            )
        ];

        let bestIntent = null;
        let highestScore = 0;

        for (const faq of this.knowledge.faqs) {

            let evidence = 0;

            const keywordWords = new Set();

            /* Phrase matches (whole words only) */

            for (const keyword of faq.keywords || []) {

                const nk = this.normCached(keyword);

                if (text === nk) {
                    evidence += 100;
                }
                else if (this.phraseIn(text, nk)) {
                    evidence += 25;
                }

                nk.split(" ").forEach(w => {
                    if (!STOPWORDS.has(w)) keywordWords.add(w);
                });

            }

            /* Synonyms */

            for (const synonym of faq.synonyms || []) {

                if (this.phraseIn(text, this.normCached(synonym))) {
                    evidence += 8;
                }

            }

            /* Token overlap: each meaningful word counts once per intent */

            for (const token of tokens) {

                if (keywordWords.has(token)) {
                    evidence += 3;
                    continue;
                }

                for (const word of keywordWords) {
                    if (this.similar(token, word)) {
                        evidence += 1;
                        break;
                    }
                }

            }

            /* Priority only breaks ties; real evidence is required */

            if (evidence < 8) {
                continue;
            }

            const score = evidence + (faq.priority || 0);

            if (score > highestScore) {
                highestScore = score;
                bestIntent = faq;
            }

        }

        return bestIntent;

    }


    /* =========================================================
       SALES DISCOVERY
    ========================================================== */

    handleDiscovery(text) {

        const discoveryPhrases = [
            "help me choose",
            "help me decide",
            "help me pick",
            "i dont know what to choose",
            "which product should i buy",
            "which plan should i buy",
            "which plan should i choose",
            "what should i buy",
            "which product is right for me",
            "which plan is right for me",
            "help me find a product",
            "help me find a plan",
            "recommend a product",
            "recommend a plan",
            "recommend something",
            "looking for a product",
            "looking for something",
            "i need a product",
            "help choosing a product",
            "help choosing a plan"
        ];

        if (!this.containsAny(text, discoveryPhrases)) {
            return null;
        }

        this.salesState.stage = "discovery";
        this.salesState.pendingQuestion = "preference";

        return {
            type: "text",
            text:
                "Absolutely. I can help you choose. What matters most to you: keeping the price low, getting more features, or having something simple for everyday use?"
        };

    }


    /* =========================================================
       SALES CONVERSATION ENGINE
    ========================================================== */

    /* Shared helper: remember what we recommended and show the product card */
    recommend(product, preference, salesMessage) {

        this.salesState.customerPreference = preference;
        this.salesState.lastRecommendedProduct = product;
        this.salesState.pendingQuestion = null;
        this.salesState.stage = "recommendation";

        return {
            type: "product",
            product: product,
            salesMessage: salesMessage
        };

    }


    handleSalesConversation(text) {

        /* Questions about flights or cabins are not plan questions
           ("cheap flights", "premium cabin", "basic economy") */

        if (
            this.containsAny(text, [
                "flight", "flights", "ticket", "tickets", "airfare",
                "cabin", "economy", "business class", "first class"
            ])
        ) {
            return null;
        }

        /* Long questions never trigger plan cards, so words like "why",
           "easy" or "budget" inside e.g. "why is my search stuck" are ignored. */

        const wordCount = text.split(" ").length;

        const inFlow = ["recommendation", "comparison"].includes(
            this.salesState.stage
        );

        /* Clear multi-word follow-ups are allowed to be a little longer */

        const strongFollowUp = inFlow && this.containsAny(text, [
            "which one",
            "which do you recommend",
            "which would you recommend",
            "what do you recommend",
            "which should i choose",
            "which should i buy",
            "which is best for me",
            "what would you recommend",
            "recommend one",
            "why do you recommend",
            "tell me more",
            "more information",
            "anything cheaper",
            "something cheaper",
            "more features",
            "better features",
            "more advanced"
        ]);

        const limit =
            this.salesState.stage === "discovery"
                ? 99
                : (inFlow ? (strongFollowUp ? 8 : 4) : 3);

        if (wordCount > limit) {

            if (inFlow) {
                this.salesState.stage = "start";
            }

            return null;

        }

        const stage = this.salesState.stage;


        /* ---------- FOLLOW-UPS (a recommendation already exists) ---------- */

        if (stage === "recommendation") {

            /* WHY THIS PRODUCT? */

            if (
                this.containsAny(text, [
                    "why",
                    "why this",
                    "why this one",
                    "why do you recommend",
                    "why recommend",
                    "why this product",
                    "why this plan",
                    "tell me more",
                    "more about it",
                    "more information"
                ])
            ) {

                const product = this.salesState.lastRecommendedProduct;

                if (product) {

                    return {
                        type: "text",
                        text:
                            `${product.name} is a good fit because ${product.description} ` +
                            `It's priced at ${product.price}. ` +
                            `If you'd like, I can also compare it with another option.`
                    };

                }

            }


            /* CHEAPER OPTION */

            if (
                this.containsAny(text, [
                    "cheaper",
                    "cheaper option",
                    "cheaper plan",
                    "cheaper product",
                    "less expensive",
                    "lower price",
                    "anything cheaper",
                    "something cheaper",
                    "more affordable"
                ])
            ) {

                const current = this.salesState.lastRecommendedProduct;
                const cheapest = this.getCheapestProduct();

                if (!current || !cheapest) {
                    return null;
                }

                if (
                    this.getNumericPrice(cheapest.price, cheapest.priceValue) >=
                    this.getNumericPrice(current.price, current.priceValue)
                ) {

                    return {
                        type: "text",
                        text:
                            `${current.name} is already our most affordable option at ${current.price}. There isn't a cheaper option available at the moment.`
                    };

                }

                return this.recommend(
                    cheapest,
                    "price",
                    `Yes, this is a more affordable option. ${cheapest.name} is available for ${cheapest.price}.`
                );

            }


            /* MORE FEATURES */

            if (
                this.containsAny(text, [
                    "more features",
                    "better features",
                    "more advanced",
                    "premium",
                    "advanced",
                    "more powerful",
                    "higher quality",
                    "professional",
                    "best features"
                ])
            ) {

                const premium = this.getPremiumProduct();

                if (!premium) {
                    return null;
                }

                return this.recommend(
                    premium,
                    "features",
                    `If you'd rather have more features, I'd recommend ${premium.name}. It's our more advanced option and is better suited to customers who want additional functionality.`
                );

            }


            /* SIMPLE OPTION */

            if (
                this.containsAny(text, [
                    "simple",
                    "basic",
                    "straightforward",
                    "easy",
                    "everyday",
                    "nothing complicated"
                ])
            ) {

                const product = this.getCheapestProduct();

                if (!product) {
                    return null;
                }

                return this.recommend(
                    product,
                    "simple",
                    `For something simple and practical, I'd recommend ${product.name}. It's a straightforward option without paying for features you may not need.`
                );

            }

        }


        /* ---------- INITIAL PREFERENCE (start or discovery only) ---------- */

        if (stage === "start" || stage === "discovery") {

            /* AFFORDABLE */

            if (
                this.containsAny(text, [
                    "cheap",
                    "affordable",
                    "budget",
                    "lowest price",
                    "save money",
                    "less expensive",
                    "lower price",
                    "on a budget",
                    "not too expensive"
                ])
            ) {

                const product = this.getCheapestProduct();

                if (product) {

                    return this.recommend(
                        product,
                        "price",
                        `If keeping the price down is your priority, I'd recommend ${product.name}. At ${product.price}, it's our most affordable option.`
                    );

                }

            }


            /* PREMIUM */

            if (
                this.containsAny(text, [
                    "premium",
                    "advanced",
                    "more features",
                    "better features",
                    "more powerful",
                    "higher quality",
                    "best features",
                    "professional"
                ])
            ) {

                const product = this.getPremiumProduct();

                if (product) {

                    return this.recommend(
                        product,
                        "features",
                        `If you'd rather have more features, I'd recommend ${product.name}. It's the more advanced option and is better suited to customers who want additional functionality.`
                    );

                }

            }


            /* SIMPLE */

            if (
                this.containsAny(text, [
                    "simple",
                    "basic",
                    "straightforward",
                    "easy",
                    "everyday",
                    "just need something simple",
                    "nothing complicated"
                ])
            ) {

                const product = this.getCheapestProduct();

                if (product) {

                    return this.recommend(
                        product,
                        "simple",
                        `For something simple and practical, I'd recommend ${product.name}. It's a straightforward option without paying for features you may not need.`
                    );

                }

            }

        }


        /* ---------- WHICH ONE DO YOU RECOMMEND? ---------- */

        if (
            stage === "recommendation" &&
            this.containsAny(text, [
                "which one",
                "which do you recommend",
                "which would you recommend",
                "what do you recommend",
                "which should i choose",
                "which should i buy",
                "which is best for me",
                "what would you recommend",
                "recommend one"
            ])
        ) {

            const product = this.getRecommendationForPreference();

            if (product) {

                this.salesState.lastRecommendedProduct = product;

                let reason =
                    `Based on what you've told me, I'd recommend ${product.name}.`;

                if (this.salesState.customerPreference === "price") {
                    reason +=
                        ` You mentioned that affordability is important to you, and ${product.name} is our most affordable option at ${product.price}.`;
                }
                else if (this.salesState.customerPreference === "features") {
                    reason +=
                        ` You mentioned that you'd prefer more features, and this is our more advanced option.`;
                }
                else if (this.salesState.customerPreference === "simple") {
                    reason +=
                        ` You mentioned that you wanted something simple, and this option is designed for straightforward everyday use.`;
                }

                return { type: "text", text: reason };

            }

        }


        /* ---------- COMPARE (inside a recommendation) ---------- */

        if (
            stage === "recommendation" &&
            this.containsAny(text, [
                "compare",
                "comparison",
                "whats the difference",
                "what is the difference",
                "difference between",
                "which is better"
            ])
        ) {

            const products = this.findProductsForComparison(text);

            if (products.length >= 2) {

                this.salesState.comparedProducts = products;
                this.salesState.stage = "comparison";

                return {
                    type: "comparison",
                    products: products,
                    recommendedId: this.getRecommendedIdFor(products)
                };

            }

        }

        return null;

    }


    /* =========================================================
       RECOMMENDATION HELPERS
    ========================================================== */

    getRecommendationForPreference() {

        switch (this.salesState.customerPreference) {

            case "price":
                return this.getCheapestProduct();

            case "features":
                return this.getPremiumProduct();

            case "simple":
                return this.getCheapestProduct();

            default:
                return this.salesState.lastRecommendedProduct;

        }

    }


    getRecommendedIdFor(products) {

        if (!products || !products.length) {
            return null;
        }

        const candidate = this.getRecommendationForPreference();

        if (!candidate) {
            return null;
        }

        return products.some(p => p.id === candidate.id)
            ? candidate.id
            : null;

    }


    getNumericPrice(price, priceValue) {

        if (typeof priceValue === "number" && !Number.isNaN(priceValue)) {
            return priceValue;
        }

        if (typeof price === "number") {
            return price;
        }

        return parseFloat(String(price).replace(/[^0-9.]/g, ""));

    }


    /* =========================================================
       PRODUCT DETECTION
    ========================================================== */

    scoreProduct(text, product) {

        let score = 0;

        for (const keyword of product.keywords || []) {
            if (this.phraseIn(text, this.normCached(keyword))) {
                score += 30;
            }
        }

        for (const synonym of product.synonyms || []) {
            if (this.phraseIn(text, this.normCached(synonym))) {
                score += 10;
            }
        }

        return score;

    }


    findProduct(text) {

        let bestProduct = null;
        let highestScore = 0;

        for (const product of this.knowledge.products) {

            const score = this.scoreProduct(text, product);

            if (score > highestScore) {
                highestScore = score;
                bestProduct = product;
            }

        }

        if (!bestProduct || highestScore < 20) {
            return null;
        }

        return bestProduct;

    }


    getCheapestProduct() {

        if (!this.knowledge.products.length) {
            return null;
        }

        return [...this.knowledge.products].sort(
            (a, b) =>
                this.getNumericPrice(a.price, a.priceValue) -
                this.getNumericPrice(b.price, b.priceValue)
        )[0];

    }


    getPremiumProduct() {

        if (!this.knowledge.products.length) {
            return null;
        }

        return [...this.knowledge.products].sort(
            (a, b) =>
                this.getNumericPrice(b.price, b.priceValue) -
                this.getNumericPrice(a.price, a.priceValue)
        )[0];

    }


    /* =========================================================
       SIMPLE FUZZY MATCHING (typo tolerance)
    ========================================================== */

    similar(a, b) {

        if (a.length < 4 || b.length < 4) {
            return false;
        }

        if (a === b) {
            return true;
        }

        const distance = this.levenshtein(a, b);

        return distance <= 1 && Math.max(a.length, b.length) >= 5;

    }


    levenshtein(a, b) {

        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {

            for (let j = 1; j <= a.length; j++) {

                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }

            }

        }

        return matrix[b.length][a.length];

    }


    /* =========================================================
       FALLBACK
    ========================================================== */

    getFallback() {

        if (
            this.config &&
            this.config.assistant &&
            this.config.assistant.fallback
        ) {
            return this.config.assistant.fallback;
        }

        return `
I'm not completely sure about that, but I can help you with:

• How PointsGo works
• Supported credit cards
• Plans and pricing
• Booking with points
• Your account
• Contacting support

What would you like to know?
        `.trim();

    }

}