/*
 * PointsGo demo knowledge base (UNOFFICIAL DEMO by Meyvitt)
 * Built only from facts visible on pointsgo.com (home, search, terms, privacy).
 * Items marked REPLACE need real data from the pricing page before sharing.
 */

const KNOWLEDGE = {

    /* =========================================================
       COMPANY
    ========================================================== */

    company: {

        name: "PointsGo",

        description:
            "PointsGo helps you find flights you can book with your credit card points and airline miles.",

        website:
            "https://www.pointsgo.com/",

        contact: {
            email: "support@pointsgo.com",
            phone: "1-800-FLIGHTS"
        }

    },


    /* =========================================================
       PRODUCTS (used for plan recommendations)
       REPLACE names, prices, features and url with the real
       plans from the pricing page. priceValue must be a number.
    ========================================================== */

    products: [

        {
            id: "plan-basic",

            name: "Basic plan",   /* REPLACE */

            image: "",

            keywords: [
                "basic plan",
                "starter plan",
                "cheapest plan"
            ],

            synonyms: [
                "basic",
                "starter",
                "affordable",
                "budget",
                "cheap",
                "simple"
            ],

            description:
                "A simple way to start searching award flights with your points.",   /* REPLACE */

            price:
                "$XX/month",   /* REPLACE */

            priceValue:
                10,   /* REPLACE (number only, used for sorting) */

            features: [
                "Search flights with points and miles",
                "Works with major bank cards"
            ],   /* REPLACE with real features */

            bestFor:
                "Travellers planning an occasional trip.",

            ctaText:
                "View pricing",

            url:
                "https://www.pointsgo.com/pricing"

        },


        {
            id: "plan-premium",

            name: "Premium plan",   /* REPLACE */

            image: "",

            keywords: [
                "premium plan",
                "pro plan",
                "best plan"
            ],

            synonyms: [
                "premium",
                "advanced",
                "professional",
                "best",
                "top",
                "more features"
            ],

            description:
                "Full access to advanced search features and exclusive flight deals.",   /* REPLACE (home page meta text mentions premium access to exclusive flight deals and advanced search) */

            price:
                "$XX/month",   /* REPLACE */

            priceValue:
                20,   /* REPLACE (number only, used for sorting) */

            features: [
                "Advanced search features",
                "Exclusive flight deals"
            ],   /* REPLACE with real features */

            bestFor:
                "Frequent travellers who want the most from their points.",

            ctaText:
                "View pricing",

            url:
                "https://www.pointsgo.com/pricing"

        }

    ],


    /* =========================================================
       FAQ / INTENTS
    ========================================================== */

    faqs: [

        {
            id: "how-it-works",

            priority: 8,

            keywords: [
                "how does it work",
                "how it works",
                "how does pointsgo work",
                "how do i use this",
                "how do i search"
            ],

            synonyms: [
                "process",
                "works",
                "steps"
            ],

            answer:
                "Enter where you're flying from and to, your departure date and your cabin (economy, or business and first class). PointsGo searches award flights across 100+ airlines using your points and miles, then guides you step by step to book directly with the airline."
        },


        {
            id: "about",

            priority: 5,

            keywords: [
                "what is pointsgo",
                "what do you do",
                "what does pointsgo do",
                "tell me about pointsgo",
                "about you",
                "who are you"
            ],

            synonyms: [
                "company",
                "business",
                "provide",
                "offer"
            ],

            answer:
                "PointsGo is a flight search and points optimisation tool. It helps you find the best ways to redeem credit card points and airline miles for flights."
        },


        {
            id: "long-flights",

            priority: 6,

            keywords: [
                "long flights",
                "long haul",
                "europe",
                "asia",
                "australia",
                "best for"
            ],

            synonyms: [
                "international",
                "overseas"
            ],

            answer:
                "PointsGo works best for long flights, such as trips to Europe, Asia and Australia."
        },


        {
            id: "cards",

            priority: 10,

            keywords: [
                "which cards",
                "what cards",
                "supported cards",
                "credit cards",
                "amex",
                "american express",
                "chase",
                "capital one",
                "citi",
                "wells fargo",
                "bilt",
                "sapphire",
                "platinum",
                "venture"
            ],

            synonyms: [
                "cards",
                "banks",
                "points program"
            ],

            answer:
                "PointsGo supports cards from Amex, Chase, Capital One, Citi, Wells Fargo and Bilt, including Amex Platinum and Gold, Chase Sapphire Preferred and Reserve, Capital One Venture X, Citi Strata Premier and Elite, and more. You can pick the cards you have on the homepage."
        },


        {
            id: "cabin",

            priority: 6,

            keywords: [
                "first class",
                "business class",
                "economy",
                "cabin",
                "premium cabin"
            ],

            synonyms: [
                "class",
                "seat"
            ],

            answer:
                "You can search economy, or business and first class. Many travellers use points for premium cabins on long flights."
        },


        {
            id: "booking",

            priority: 10,

            keywords: [
                "do you sell flights",
                "do you book flights",
                "book with you",
                "how do i book",
                "book a flight",
                "where do i book",
                "booking"
            ],

            synonyms: [
                "book",
                "booking",
                "reserve"
            ],

            answer:
                "PointsGo doesn't sell flights directly. It finds the options and gives you step-by-step guidance, then you book directly with the airline using your points."
        },


        {
            id: "pricing",

            priority: 8,

            keywords: [
                "price",
                "prices",
                "pricing",
                "cost",
                "how much",
                "how much does it cost",
                "subscription",
                "plans"
            ],

            synonyms: [
                "price",
                "cost",
                "expensive",
                "pricing",
                "budget"
            ],

            answer:
                "Some PointsGo features need a paid subscription. You can see the current plans on the Pricing page, or I can help you pick one that fits."
        },


        {
            id: "affordable",

            priority: 10,

            keywords: [
                "affordable",
                "cheapest",
                "cheap",
                "budget",
                "low cost",
                "less expensive"
            ],

            synonyms: [
                "affordable",
                "cheap",
                "budget",
                "inexpensive"
            ],

            answer:
                "Absolutely. I can help you find the most affordable plan."
        },


        {
            id: "premium",

            priority: 10,

            keywords: [
                "premium",
                "best plan",
                "advanced option",
                "exclusive deals"
            ],

            synonyms: [
                "premium",
                "advanced",
                "professional",
                "best",
                "top"
            ],

            answer:
                "If you want more advanced search features and exclusive flight deals, I'd look at the premium option."
        },


        {
            id: "compare",

            priority: 12,

            keywords: [
                "compare",
                "comparison",
                "compare plans",
                "difference between plans",
                "which is better"
            ],

            synonyms: [
                "compare",
                "comparison",
                "difference",
                "versus",
                "vs"
            ],

            answer:
                "Sure. Here's a quick comparison of the available plans."
        },


        {
            id: "cancel-refund",

            priority: 8,

            keywords: [
                "cancel",
                "cancel subscription",
                "cancellation",
                "refund",
                "refunds",
                "money back",
                "renew",
                "renewal"
            ],

            synonyms: [
                "cancel",
                "refund",
                "renew"
            ],

            answer:
                "Subscriptions renew automatically unless you cancel before the renewal date. For cancellations or refunds, please contact our support team."
        },


        {
            id: "payment",

            priority: 6,

            keywords: [
                "payment methods",
                "how can i pay",
                "how do i pay",
                "billing",
                "pay for subscription"
            ],

            synonyms: [
                "payment",
                "billing",
                "checkout"
            ],

            answer:
                "Payments for subscriptions are processed securely through a third-party payment provider. The available options are shown at checkout."
        },


        {
            id: "account",

            priority: 8,

            keywords: [
                "account",
                "login",
                "log in",
                "sign in",
                "sign up",
                "register",
                "create account",
                "google"
            ],

            synonyms: [
                "account",
                "login",
                "register",
                "sign in"
            ],

            answer:
                "You need an account for some features. You can sign up with your email or sign in with Google."
        },


        {
            id: "accuracy",

            priority: 8,

            keywords: [
                "availability",
                "is it accurate",
                "accurate",
                "guarantee",
                "seats available",
                "award space"
            ],

            synonyms: [
                "available",
                "accurate",
                "guarantee"
            ],

            answer:
                "Award seat availability and points prices change frequently and are controlled by airlines and loyalty programs. Always confirm with the airline before you make decisions."
        },


        {
            id: "privacy",

            priority: 8,

            keywords: [
                "privacy",
                "my data",
                "personal information",
                "is my data safe",
                "data security",
                "delete my account"
            ],

            synonyms: [
                "privacy",
                "data",
                "security"
            ],

            answer:
                "PointsGo says it does not sell your personal information. You can access, correct or request deletion of your data. See the Privacy Policy on the website for details."
        },


        {
            id: "lounges",

            priority: 6,

            keywords: [
                "lounge",
                "lounges",
                "airport lounge"
            ],

            synonyms: [
                "lounge"
            ],

            answer:
                "PointsGo has a Lounges section on the website. Take a look at the Lounges page for details."
        },


        {
            id: "deals-newsletter",

            priority: 6,

            keywords: [
                "deals",
                "newsletter",
                "subscribe",
                "travel tips",
                "email updates"
            ],

            synonyms: [
                "deals",
                "tips",
                "updates"
            ],

            answer:
                "You can subscribe to the newsletter at the bottom of the website to get flight deals and travel tips by email."
        },


        {
            id: "location",

            priority: 5,

            keywords: [
                "where are you located",
                "where are you based",
                "office",
                "address",
                "location",
                "headquarters"
            ],

            synonyms: [
                "located",
                "based"
            ],

            answer:
                "PointsGo is based in San Francisco, CA."
        },


        {
            id: "support",

            priority: 10,

            keywords: [
                "support",
                "customer support",
                "customer service",
                "need help",
                "support team",
                "problem with"
            ],

            synonyms: [
                "support",
                "assistance",
                "customer service"
            ],

            answer:
                "Our support team can help with questions about your account, subscription and searches."
        },


        {
            id: "contact",

            priority: 11,

            keywords: [
                "contact",
                "contact you",
                "contact details",
                "email",
                "phone",
                "speak to someone",
                "talk to someone",
                "human",
                "speak with someone",
                "how can i contact you"
            ],

            synonyms: [
                "contact",
                "email",
                "phone",
                "human",
                "person",
                "representative"
            ],

            answer:
                "You can contact our team using the details below."
        }

    ]

};