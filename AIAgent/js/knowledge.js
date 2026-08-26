const KNOWLEDGE = {

    /* =========================================================
       COMPANY
    ========================================================== */

    company: {

        name: "Your Brand",

        description:
            "We are a customer-focused company providing quality products and services designed around our customers' needs.",

        website:
            "https://example.com/",

        contact: {
            email: "hello@example.com",
            phone: "+44 0000 000000"
        }

    },


    /* =========================================================
       PRODUCTS
    ========================================================== */

    products: [

        {
            id: "product-1",

            name: "Example Product",

            image: "",

            keywords: [
                "product",
                "example product",
                "main product",
                "basic product",
                "standard product"
            ],

            synonyms: [
                "affordable",
                "budget",
                "cheap",
                "basic",
                "starter",
                "everyday",
                "simple"
            ],

            description:
                "Our main product is designed to provide a simple and reliable solution for customers looking for a high-quality option.",

            price:
                "£49.99",

            priceValue:
                49.99,

            features: [
                "Simple and reliable",
                "Designed for everyday use",
                "High-quality solution"
            ],

            bestFor:
                "Customers looking for an affordable everyday option.",

            ctaText:
                "View Product",

            url:
                "#"

        },


        {
            id: "product-2",

            name: "Premium Product",

            image: "",

            keywords: [
                "premium",
                "premium product",
                "advanced product",
                "professional product"
            ],

            synonyms: [
                "advanced",
                "professional",
                "premium",
                "high end",
                "best",
                "top"
            ],

            description:
                "Our premium option provides additional features and is designed for customers looking for a more advanced solution.",

            price:
                "£79.99",

            priceValue:
                79.99,

            features: [
                "Advanced features",
                "Premium experience",
                "Designed for demanding users"
            ],

            bestFor:
                "Customers looking for a more advanced and premium solution.",

            ctaText:
                "Explore Premium",

            url:
                "#"

        }

    ],


    /* =========================================================
       FAQ / INTENTS
    ========================================================== */

    faqs: [

        {
            id: "how-it-works",

            priority: 6,

            keywords: [
                "how does it work",
                "how it works",
                "how does this work",
                "how do i use this"
            ],

            synonyms: [
                "process",
                "works"
            ],

            answer:
                "Just tell me what you're looking for — a price range, must-have features, or how you plan to use it — and I'll recommend the right product or compare your options."
        },

        {
            id: "locations",

            keywords: [
                "office",
                "offices",
                "location",
                "locations",
                "where are you located",
                "where is your office",
                "where are your offices",
                "do you have an office",
                "do you have offices",
                "based in",
                "located in",
                "head office",
                "headquarters",
                "manchester",
                "london",
                "birmingham",
                "uk"
            ],

            answer:
                "Our office and location information can be found on our website. If you'd like, I can also help you with our products, pricing, availability or support."
        },

        {
            id: "about",

            priority: 5,

            keywords: [
                "what do you do",
                "what does your company do",
                "what is your company",
                "tell me about the company",
                "about you",
                "about the company",
                "what do you provide",
                "what do you offer",
                "what services do you provide",
                "what does your business do"
            ],

            synonyms: [
                "company",
                "business",
                "provide",
                "services",
                "offer"
            ],

            answer:
                "We provide quality products and services designed around our customers' needs, with a focus on quality, convenience and a simple customer experience."

        },


        {
            id: "products",

            priority: 8,

            keywords: [
                "products",
                "product",
                "what do you sell",
                "what do you offer",
                "what can i buy",
                "available products",
                "show me products",
                "what products do you have"
            ],

            synonyms: [
                "sell",
                "selling",
                "buy",
                "offer",
                "available"
            ],

            answer:
                "We offer a range of products designed to meet different customer needs. I can help you explore the available options or compare them."

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
                "how much are your products",
                "what does it cost"
            ],

            synonyms: [
                "price",
                "cost",
                "expensive",
                "pricing",
                "budget"
            ],

            answer:
                "Our products are available at different price points. I can help you compare the available options and find one that suits your budget."

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
                "less expensive",
                "not too expensive",
                "something affordable",
                "something cheap"
            ],

            synonyms: [
                "affordable",
                "cheap",
                "budget",
                "economical",
                "inexpensive"
            ],

            answer:
                "Absolutely. I can help you find the most affordable option."

        },


        {
            id: "premium",

            priority: 10,

            keywords: [
                "premium",
                "best product",
                "best option",
                "advanced option",
                "high end",
                "professional option"
            ],

            synonyms: [
                "premium",
                "advanced",
                "professional",
                "best",
                "top"
            ],

            answer:
                "If you're looking for a more advanced experience, I'd recommend our premium option."

        },


        {
            id: "compare",

            priority: 12,

            keywords: [
                "compare",
                "comparison",
                "compare products",
                "compare options",
                "difference between products",
                "difference between them",
                "which is better",
                "which one is better"
            ],

            synonyms: [
                "compare",
                "comparison",
                "difference",
                "better",
                "versus",
                "vs"
            ],

            answer:
                "Sure. Here's a quick comparison of our available options."

        },


        {
            id: "shipping",

            priority: 5,

            keywords: [
                "shipping",
                "delivery",
                "deliver",
                "delivery time",
                "shipping time",
                "when will it arrive",
                "how long does delivery take"
            ],

            synonyms: [
                "delivery",
                "shipping",
                "arrive",
                "arrival"
            ],

            answer:
                "Delivery times depend on the destination and the selected delivery option. Please check the latest delivery information during checkout."

        },


        {
            id: "returns",

            priority: 5,

            keywords: [
                "return",
                "returns",
                "refund",
                "refunds",
                "send it back",
                "money back"
            ],

            synonyms: [
                "return",
                "refund",
                "money back"
            ],

            answer:
                "If you need to return an order or request a refund, please contact our support team so they can guide you through the process."

        },


        {
            id: "payment",

            priority: 5,

            keywords: [
                "payment",
                "pay",
                "payment methods",
                "card",
                "credit card",
                "debit card",
                "how can i pay"
            ],

            synonyms: [
                "payment",
                "pay",
                "card",
                "checkout"
            ],

            answer:
                "We support standard online payment methods. The available options will be displayed during checkout."

        },


        {
            id: "support",

            priority: 10,

            keywords: [
                "support",
                "customer support",
                "customer service",
                "help",
                "need help",
                "support team",
                "technical support"
            ],

            synonyms: [
                "support",
                "help",
                "assistance",
                "customer service"
            ],

            answer:
                "Our support team can help with questions about products, orders, payments and other issues."

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

        },


        {
            id: "order",

            priority: 6,

            keywords: [
                "order",
                "my order",
                "order status",
                "where is my order",
                "track my order",
                "order tracking"
            ],

            synonyms: [
                "order",
                "tracking",
                "track",
                "shipment"
            ],

            answer:
                "For order-specific information, please contact our support team with your order details so they can assist you."

        },


        {
            id: "cancel",

            priority: 6,

            keywords: [
                "cancel",
                "cancel order",
                "cancellation",
                "cancel my order"
            ],

            synonyms: [
                "cancel",
                "cancellation"
            ],

            answer:
                "If you would like to cancel an order, please contact our support team as soon as possible. Cancellation availability may depend on the order status."

        },


        {
            id: "availability",

            priority: 6,

            keywords: [
                "available",
                "availability",
                "in stock",
                "stock",
                "out of stock"
            ],

            synonyms: [
                "available",
                "stock",
                "availability"
            ],

            answer:
                "Product availability can change over time. Please check the product page for the latest stock information."

        },


        {
            id: "account",

            priority: 5,

            keywords: [
                "account",
                "login",
                "log in",
                "sign in",
                "register",
                "create account"
            ],

            synonyms: [
                "account",
                "login",
                "register",
                "sign in"
            ],

            answer:
                "You can manage your account through the account section of the website."

        }

    ]

};