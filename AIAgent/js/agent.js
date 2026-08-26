class AIAgent {

    constructor(knowledge, config) {

        this.knowledge = knowledge;

        this.config = config;

        this.conversation = [];

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


        /* =========================
           GREETING
        ========================== */

        const greeting =
            this.checkGreeting(text);

        if (greeting) {

            return {
                type: "text",
                text: greeting
            };

        }


        /* =========================
            SALES CONVERSATION
        ========================== */

        const salesResponse =
            this.handleSalesConversation(text);

        if (salesResponse) {

            return salesResponse;

        }


        /* =========================
        SALES DISCOVERY
        ========================= */

        const discovery =
            this.handleDiscovery(text);

        if (discovery) {
            return discovery;
        }


        /* =========================
        COMPARISON
        ========================= */

        if (
            this.isComparisonRequest(text)
        ) {

            this.salesState.stage =
                "comparison";

            this.salesState.comparedProducts =
                this.findProductsForComparison(text);

            return {
                type: "comparison",
                products:
                    this.salesState.comparedProducts,
                recommendedId:
                    this.getRecommendedIdFor(
                        this.salesState.comparedProducts
                    )
            };

        }


        /* =========================
        INTENT DETECTION
        ========================= */

        const intent =
            this.findBestIntent(text);


        /* =========================
        PRODUCT DETECTION
        ========================== */

        const product =
            this.findProduct(text);

        if (product) {

            return {
                type: "product",
                product: product
            };

        }


        /* =========================
           FAQ
        ========================= */

        if (intent) {

            let answer =
                intent.answer;


            /* Contact / support */

            if (
                intent.id === "support" ||
                intent.id === "contact"
            ) {

                const contact =
                    this.knowledge.company.contact;

                answer +=
                    `\n\nEmail: ${contact.email}` +
                    `\nPhone: ${contact.phone}`;

            }


            return {
                type: "text",
                text: answer
            };

        }


        /* =========================
           GENERAL PRODUCT QUESTION
        ========================= */

        if (
            this.containsAny(
                text,
                [
                    "product",
                    "products",
                    "sell",
                    "selling",
                    "offer",
                    "buy"
                ]
            )
        ) {

            return {
                type: "text",

                text:
                    "We offer a range of products designed to meet different customer needs. I can show you the available options or help you compare them."
            };

        }


        /* =========================
           GENERAL HELP
        ========================= */

        if (
            this.containsAny(
                text,
                [
                    "help",
                    "assist",
                    "assistance"
                ]
            )
        ) {

            return {
                type: "text",

                text:
                    "Of course. I can help with products, pricing, recommendations, delivery, returns, orders, payments and support."
            };

        }


        /* =========================
           FALLBACK
        ========================= */

        return {

            type: "text",

            text:
                this.getFallback()

        };

    }


    /* =========================================================
       NORMALIZE
    ========================================================== */

    normalize(text) {

        return text
            .toLowerCase()
            .trim()
            .replace(/[?!.,;:]/g, "")
            .replace(/\s+/g, " ");

    }


    /* =========================================================
       GREETING
    ========================================================== */

    checkGreeting(text) {

        const greetings = [
            "hi",
            "hello",
            "hey",
            "hiya",
            "good morning",
            "good afternoon",
            "good evening"
        ];


        if (greetings.includes(text)) {

            return this.config.assistant.greeting;

        }


        const generalGreetingPatterns = [
            "hi ",
            "hello ",
            "hey ",
            "hiya "
        ];


        const isGreeting =
            generalGreetingPatterns.some(
                pattern =>
                    text.startsWith(pattern)
            );


        if (isGreeting) {

            // General conversational opener
            if (
                this.containsAny(
                    text,
                    [
                        "can you help",
                        "could you help",
                        "are you able to help",
                        "i need some help",
                        "can you assist",
                        "could you assist"
                    ]
                )
            ) {

                return this.config.assistant.greeting;

            }

        }


        return null;

    }

    /* =========================================================
        COMPARISON DETECTION
    ========================================================== */

    isComparisonRequest(text) {

        const comparisonPhrases = [

            "compare",
            "comparison",
            "compare products",
            "compare product",
            "compare the products",
            "compare these products",
            "compare the options",
            "compare options",
            "product comparison",

            "difference between",
            "differences between",
            "what is the difference",
            "whats the difference",

            "which is better",
            "which product is better",
            "which one is better"

        ];


        return comparisonPhrases.some(
            phrase =>
                text.includes(
                    phrase
                )
        );

    }


    /* =========================================================
        FIND PRODUCTS TO COMPARE
    ========================================================== */

    findProductsForComparison(text) {

        /* 1. If the customer named specific products, compare those */

        const scored =
            this.knowledge.products.map(
                product => {

                    let score = 0;


                    for (
                        const keyword
                        of product.keywords || []
                    ) {

                        if (
                            text.includes(
                                this.normalize(keyword)
                            )
                        ) {

                            score += 30;

                        }

                    }


                    for (
                        const synonym
                        of product.synonyms || []
                    ) {

                        if (
                            text.includes(
                                this.normalize(synonym)
                            )
                        ) {

                            score += 10;

                        }

                    }


                    return {
                        product,
                        score
                    };

                }
            );


        const matched =
            scored
                .filter(entry => entry.score >= 20)
                .sort((a, b) => b.score - a.score)
                .map(entry => entry.product);


        if (matched.length >= 2) {

            return matched.slice(0, 2);

        }


        /* 2. If we're mid sales-conversation, compare the last
              recommendation against a different product */

        if (
            this.salesState.lastRecommendedProduct
        ) {

            const current =
                this.salesState.lastRecommendedProduct;

            const alternative =
                this.knowledge.products.find(
                    product =>
                        product.id !== current.id
                );

            if (alternative) {

                return [
                    current,
                    alternative
                ];

            }

        }


        /* 3. Fall back to cheapest vs. premium — a more
              meaningful default than array order */

        const cheapest =
            this.getCheapestProduct();

        const premium =
            this.getPremiumProduct();

        if (
            cheapest &&
            premium &&
            cheapest.id !== premium.id
        ) {

            return [
                cheapest,
                premium
            ];

        }


        /* 4. Last resort — whatever is in the catalog */

        return this.knowledge.products.slice(0, 2);

    }


    /* =========================================================
       INTENT SCORING
    ========================================================== */

    findBestIntent(text) {

        let bestIntent = null;

        let highestScore = 0;


        for (
            const faq
            of this.knowledge.faqs
        ) {

            let score = 0;


            /* Exact phrase matching */

            for (
                const keyword
                of faq.keywords || []
            ) {

                const normalizedKeyword =
                    this.normalize(keyword);


                if (
                    text === normalizedKeyword
                ) {

                    score += 100;

                }

                else if (
                    text.includes(
                        normalizedKeyword
                    )
                ) {

                    score += 25;

                }

            }


            /* Synonym matching */

            for (
                const synonym
                of faq.synonyms || []
            ) {

                const normalizedSynonym =
                    this.normalize(synonym);


                if (
                    text.includes(
                        normalizedSynonym
                    )
                ) {

                    score += 8;

                }

            }


            /* Token matching */

            const tokens =
                text.split(" ");


            for (
                const keyword
                of faq.keywords || []
            ) {

                const keywordTokens =
                    this.normalize(keyword)
                        .split(" ");


                for (
                    const token
                    of tokens
                ) {

                    for (
                        const keywordToken
                        of keywordTokens
                    ) {

                        if (
                            token ===
                            keywordToken
                        ) {

                            score += 3;

                        }

                        else if (
                            this.similar(
                                token,
                                keywordToken
                            )
                        ) {

                            score += 1;

                        }

                    }

                }

            }


            /* Priority */

            score +=
                (faq.priority || 0);


            if (
                score > highestScore
            ) {

                highestScore =
                    score;

                bestIntent =
                    faq;

            }

        }


        /*
         * Ignore very weak matches.
         * Priority alone must not be enough to pass —
         * there must be some real keyword/synonym/token evidence.
         */

        if (
            highestScore < 12 ||
            highestScore <= (bestIntent ? (bestIntent.priority || 0) : 0)
        ) {

            return null;

        }


        return bestIntent;

    }


    /* =========================================================
    SALES DISCOVERY
    ========================================================= */

    handleDiscovery(text) {

        const discoveryPhrases = [

            "help me choose",
            "help me decide",
            "help me pick",
            "i dont know what to choose",
            "i don't know what to choose",
            "which product should i buy",
            "what should i buy",
            "which product is right for me",
            "help me find a product",
            "recommend a product",
            "recommend something",
            "looking for a product",
            "looking for something",
            "i need a product",
            "help choosing a product"

        ];


        if (
            !this.containsAny(
                text,
                discoveryPhrases
            )
        ) {

            return null;

        }


        this.salesState.stage =
            "discovery";

        this.salesState.pendingQuestion =
            "preference";


        return {

            type: "text",

            text:
                "Absolutely. I can help you choose. What matters most to you — keeping the price low, getting more features, or having something simple for everyday use?"

        };

    }



    /* =========================================================
    SALES CONVERSATION ENGINE
    ========================================================= */

    handleSalesConversation(text) {

        /* =====================================================
        FOLLOW-UP: WHY THIS PRODUCT?
        Highest priority once a recommendation exists
        ===================================================== */

        if (
            this.salesState.stage === "recommendation" &&
            this.containsAny(
                text,
                [
                    "why",
                    "why this",
                    "why this one",
                    "why do you recommend",
                    "why recommend",
                    "why this product",
                    "tell me more",
                    "more about it",
                    "more information"
                ]
            )
        ) {

            const product =
                this.salesState.lastRecommendedProduct;

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


        /* =====================================================
        FOLLOW-UP: CHEAPER OPTION
        ===================================================== */

        if (
            this.salesState.stage === "recommendation" &&
            this.containsAny(
                text,
                [
                    "cheaper",
                    "cheaper option",
                    "cheaper product",
                    "less expensive",
                    "lower price",
                    "anything cheaper",
                    "something cheaper",
                    "more affordable"
                ]
            )
        ) {

            const currentProduct =
                this.salesState.lastRecommendedProduct;

            const cheapestProduct =
                this.getCheapestProduct();

            if (
                !currentProduct ||
                !cheapestProduct
            ) {

                return null;

            }


            const currentPrice =
                this.getNumericPrice(
                    currentProduct.price,
                    currentProduct.priceValue
                );

            const cheapestPrice =
                this.getNumericPrice(
                    cheapestProduct.price,
                    cheapestProduct.priceValue
                );


            if (
                cheapestPrice >= currentPrice
            ) {

                return {

                    type: "text",

                    text:
                        `${currentProduct.name} is already our most affordable option at ${currentProduct.price}. There isn't a cheaper option available at the moment.`

                };

            }


            this.salesState.customerPreference =
                "price";

            this.salesState.lastRecommendedProduct =
                cheapestProduct;

            this.salesState.stage =
                "recommendation";


            return {

                type: "product",

                product:
                    cheapestProduct,

                salesMessage:
                    `Yes — this is a more affordable option. ${cheapestProduct.name} is available for ${cheapestProduct.price}.`

            };

        }


        /* =====================================================
        FOLLOW-UP: MORE FEATURES
        ===================================================== */

        if (
            this.salesState.stage === "recommendation" &&
            this.containsAny(
                text,
                [
                    "more features",
                    "better features",
                    "more advanced",
                    "premium",
                    "advanced",
                    "more powerful",
                    "higher quality",
                    "professional",
                    "best features"
                ]
            )
        ) {

            const premiumProduct =
                this.getPremiumProduct();

            if (!premiumProduct) {
                return null;
            }


            this.salesState.customerPreference =
                "features";

            this.salesState.lastRecommendedProduct =
                premiumProduct;

            this.salesState.stage =
                "recommendation";


            return {

                type: "product",

                product:
                    premiumProduct,

                salesMessage:
                    `If you'd rather have more features, I'd recommend ${premiumProduct.name}. It's our more advanced option and is better suited to customers who want additional functionality.`

            };

        }


        /* =====================================================
        FOLLOW-UP: SIMPLE OPTION
        ===================================================== */

        if (
            this.salesState.stage === "recommendation" &&
            this.containsAny(
                text,
                [
                    "simple",
                    "basic",
                    "straightforward",
                    "easy",
                    "everyday",
                    "nothing complicated"
                ]
            )
        ) {

            const product =
                this.getCheapestProduct();

            if (!product) {
                return null;
            }


            this.salesState.customerPreference =
                "simple";

            this.salesState.lastRecommendedProduct =
                product;

            this.salesState.stage =
                "recommendation";


            return {

                type: "product",

                product:
                    product,

                salesMessage:
                    `For something simple and practical, I'd recommend ${product.name}. It's a straightforward option for everyday use without paying for features you may not need.`

            };

        }


        /* =====================================================
        INITIAL CUSTOMER PREFERENCE
        Only runs when NOT already in a recommendation
        conversation.
        ===================================================== */

        if (
            this.salesState.stage === "start" ||
            this.salesState.stage === "discovery"
        ) {

            /* =========================
            AFFORDABLE
            ========================== */

            if (
                this.containsAny(
                    text,
                    [
                        "cheap",
                        "affordable",
                        "budget",
                        "lowest price",
                        "save money",
                        "less expensive",
                        "lower price",
                        "on a budget",
                        "not too expensive"
                    ]
                )
            ) {

                this.salesState.customerPreference =
                    "price";


                const product =
                    this.getCheapestProduct();


                if (product) {

                    this.salesState.lastRecommendedProduct =
                        product;

                    this.salesState.pendingQuestion =
                        null;

                    this.salesState.stage =
                        "recommendation";


                    return {

                        type: "product",

                        product:
                            product,

                        salesMessage:
                            `If keeping the price down is your priority, I'd recommend ${product.name}. At ${product.price}, it's our most affordable option and is a good choice for everyday use.`

                    };

                }

            }


            /* =========================
            PREMIUM
            ========================== */

            if (
                this.containsAny(
                    text,
                    [
                        "premium",
                        "advanced",
                        "more features",
                        "better features",
                        "more powerful",
                        "higher quality",
                        "best features",
                        "professional"
                    ]
                )
            ) {

                this.salesState.customerPreference =
                    "features";


                const product =
                    this.getPremiumProduct();


                if (product) {

                    this.salesState.lastRecommendedProduct =
                        product;

                    this.salesState.pendingQuestion =
                        null;

                    this.salesState.stage =
                        "recommendation";


                    return {

                        type: "product",

                        product:
                            product,

                        salesMessage:
                            `If you'd rather have more features, I'd recommend ${product.name}. It's the more advanced option and is better suited to customers who want additional functionality.`

                    };

                }

            }


            /* =========================
            SIMPLE
            ========================== */

            if (
                this.containsAny(
                    text,
                    [
                        "simple",
                        "basic",
                        "straightforward",
                        "easy",
                        "everyday",
                        "just need something simple",
                        "nothing complicated"
                    ]
                )
            ) {

                this.salesState.customerPreference =
                    "simple";


                const product =
                    this.getCheapestProduct();


                if (product) {

                    this.salesState.lastRecommendedProduct =
                        product;

                    this.salesState.pendingQuestion =
                        null;

                    this.salesState.stage =
                        "recommendation";


                    return {

                        type: "product",

                        product:
                            product,

                        salesMessage:
                            `For something simple and practical, I'd recommend ${product.name}. It's a straightforward option for everyday use without paying for features you may not need.`

                    };

                }

            }

        }


        /* =====================================================
        FOLLOW-UP: WHICH ONE DO YOU RECOMMEND?
        ===================================================== */

        if (
            this.salesState.stage === "recommendation" &&
            this.containsAny(
                text,
                [
                    "which one",
                    "which do you recommend",
                    "which would you recommend",
                    "what do you recommend",
                    "which should i choose",
                    "which should i buy",
                    "which is best for me",
                    "what would you recommend",
                    "recommend one"
                ]
            )
        ) {

            const product =
                this.getRecommendationForPreference();

            if (product) {

                this.salesState.lastRecommendedProduct =
                    product;


                let reason =
                    `Based on what you've told me, I'd recommend ${product.name}.`;


                if (
                    this.salesState.customerPreference ===
                    "price"
                ) {

                    reason +=
                        ` You mentioned that affordability is important to you, and ${product.name} is our most affordable option at ${product.price}.`;

                }

                else if (
                    this.salesState.customerPreference ===
                    "features"
                ) {

                    reason +=
                        ` You mentioned that you'd prefer more features, and this is our more advanced option.`;

                }

                else if (
                    this.salesState.customerPreference ===
                    "simple"
                ) {

                    reason +=
                        ` You mentioned that you wanted something simple, and this option is designed for straightforward everyday use.`;

                }


                return {

                    type: "text",

                    text: reason

                };

            }

        }


        /* =====================================================
        FOLLOW-UP: COMPARE
        ===================================================== */

        if (
            this.salesState.stage === "recommendation" &&
            this.containsAny(
                text,
                [
                    "compare",
                    "comparison",
                    "what's the difference",
                    "what is the difference",
                    "difference between",
                    "which is better"
                ]
            )
        ) {

            const products =
                this.findProductsForComparison(text);


            if (
                products.length >= 2
            ) {

                this.salesState.comparedProducts =
                    products;

                this.salesState.stage =
                    "comparison";


                return {

                    type: "comparison",

                    products:
                        products,

                    recommendedId:
                        this.getRecommendedIdFor(products)

                };

            }

        }


        return null;

    }


    /* =========================================================
    RECOMMENDATION BASED ON CUSTOMER PREFERENCE
    ========================================================= */

    getRecommendationForPreference() {

        switch (
            this.salesState.customerPreference
        ) {

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


    /* =========================================================
    RECOMMENDED PRODUCT ID FOR A COMPARISON
    ========================================================= */

    getRecommendedIdFor(products) {

        if (
            !products ||
            !products.length
        ) {

            return null;

        }


        const candidate =
            this.getRecommendationForPreference();

        if (!candidate) {

            return null;

        }


        const isInList =
            products.some(
                product =>
                    product.id === candidate.id
            );

        return isInList ? candidate.id : null;

    }


    /* =========================================================
    GET NUMERIC PRICE
    ========================================================= */

    getNumericPrice(price, priceValue) {

        if (
            typeof priceValue === "number" &&
            !Number.isNaN(priceValue)
        ) {

            return priceValue;

        }

        if (typeof price === "number") {

            return price;

        }

        return parseFloat(
            String(price)
                .replace(/[^0-9.]/g, "")
        );

    }


    /* =========================================================
       PRODUCT DETECTION
    ========================================================== */

    findProduct(text) {

        let bestProduct = null;

        let highestScore = 0;


        for (
            const product
            of this.knowledge.products
        ) {

            let score = 0;


            /* Product keywords */

            for (
                const keyword
                of product.keywords || []
            ) {

                const normalizedKeyword =
                    this.normalize(keyword);


                if (
                    text.includes(
                        normalizedKeyword
                    )
                ) {

                    score += 30;

                }

            }


            /* Product synonyms */

            for (
                const synonym
                of product.synonyms || []
            ) {

                const normalizedSynonym =
                    this.normalize(synonym);


                if (
                    text.includes(
                        normalizedSynonym
                    )
                ) {

                    score += 10;

                }

            }


            if (
                score > highestScore
            ) {

                highestScore =
                    score;

                bestProduct =
                    product;

            }

        }


        if (!bestProduct || highestScore < 20) {
            return null;
        }

        return bestProduct;

    }


    /* =========================================================
       CHEAPEST PRODUCT
    ========================================================== */

    getCheapestProduct() {

        if (
            !this.knowledge.products.length
        ) {

            return null;

        }


        return [
            ...this.knowledge.products
        ].sort(
            (a, b) =>
                this.getNumericPrice(a.price, a.priceValue) -
                this.getNumericPrice(b.price, b.priceValue)
        )[0];

    }


    /* =========================================================
       PREMIUM PRODUCT
    ========================================================== */

    getPremiumProduct() {

        if (
            !this.knowledge.products.length
        ) {

            return null;

        }


        return [
            ...this.knowledge.products
        ].sort(
            (a, b) =>
                this.getNumericPrice(b.price, b.priceValue) -
                this.getNumericPrice(a.price, a.priceValue)
        )[0];

    }


    /* =========================================================
       SIMPLE FUZZY MATCHING
    ========================================================== */

    similar(a, b) {

        if (
            a.length < 4 ||
            b.length < 4
        ) {

            return false;

        }


        if (
            a === b
        ) {

            return true;

        }


        const distance =
            this.levenshtein(
                a,
                b
            );


        const maxLength =
            Math.max(
                a.length,
                b.length
            );


        return (
            distance <= 1 &&
            maxLength >= 5
        );

    }


    /* =========================================================
       LEVENSHTEIN DISTANCE
    ========================================================== */

    levenshtein(a, b) {

        const matrix = [];


        for (
            let i = 0;
            i <= b.length;
            i++
        ) {

            matrix[i] = [i];

        }


        for (
            let j = 0;
            j <= a.length;
            j++
        ) {

            matrix[0][j] = j;

        }


        for (
            let i = 1;
            i <= b.length;
            i++
        ) {

            for (
                let j = 1;
                j <= a.length;
                j++
            ) {

                if (
                    b.charAt(i - 1) ===
                    a.charAt(j - 1)
                ) {

                    matrix[i][j] =
                        matrix[i - 1][j - 1];

                }

                else {

                    matrix[i][j] =
                        Math.min(

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
       TEXT HELPERS
    ========================================================== */

    containsAny(text, words) {
        const normalizedText = this.normalize(text);
        return words.some(word => normalizedText.includes(this.normalize(word)));
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

• Products
• Pricing
• Recommendations
• Delivery
• Returns
• Support

What would you like to know?
        `.trim();

    }

}