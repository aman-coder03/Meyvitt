/*
 * PointsGo demo knowledge base (UNOFFICIAL DEMO by Meyvitt)
 *
 * Sources used (all public):
 *  - Home page, Search page, Media page
 *  - Terms of Service and Privacy Policy (last updated April 8, 2026)
 *  - Page metadata (pricing page description, social handle)
 *
 * NOT available when this was written:
 *  - Pricing and Lounges page bodies (came back empty), so plans below are placeholders
 *  - LinkedIn page (blocked to automated access). Paste its "About" text to extend this file.
 *
 * Rule used throughout: if a fact is not on the site, the answer says so and
 * points to support@pointsgo.com instead of guessing.
 * Items marked REPLACE need real data before sharing.
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
                "Premium access to exclusive flight deals and advanced search features.",   /* from the pricing page description; REPLACE with plan details */

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

        /* ------------------------------------------------------
           WHAT IS POINTSGO / HOW IT WORKS
        ------------------------------------------------------- */

        {
            id: "how-it-works",

            priority: 8,

            keywords: [
                "how does it work",
                "how it works",
                "how does pointsgo work",
                "how do i use this",
                "how do i use pointsgo",
                "how do i search",
                "how to search flights",
                "how do i find flights"
            ],

            synonyms: [
                "process",
                "works",
                "steps"
            ],

            answer:
                "Enter where you're leaving from and going to, your departure date and your cabin. PointsGo searches for flights you can book with your points and miles, shows the best deals, then guides you step by step to book directly with the airline."
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
                "who are you",
                "what is this",
                "what is this site"
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
            id: "demo-video",

            priority: 6,

            keywords: [
                "demo",
                "video",
                "60 second demo",
                "show me how it works",
                "watch a demo",
                "walkthrough",
                "tutorial"
            ],

            synonyms: [
                "demo",
                "walkthrough"
            ],

            answer:
                "The homepage has a 60-second demo called 'How PointsGo Works in 60 Seconds'. It shows how to search flights with your points, find the best deals and book directly with the airline."
        },


        {
            id: "get-started",

            priority: 7,

            keywords: [
                "get started",
                "getting started",
                "how do i start",
                "try it",
                "start searching",
                "i want to try",
                "where do i begin",
                "first step"
            ],

            synonyms: [
                "start",
                "begin",
                "try"
            ],

            answer:
                "Easy: open the Search page, enter where you're leaving from and going to, pick a date and cabin, and search. You can also tap your card brand on the homepage to see how to book with those points."
        },


        {
            id: "long-flights",

            priority: 6,

            keywords: [
                "long flights",
                "long haul",
                "long distance",
                "europe",
                "asia",
                "australia",
                "short flights",
                "domestic flights",
                "best for"
            ],

            synonyms: [
                "international",
                "overseas"
            ],

            answer:
                "PointsGo is best for long flights, such as trips to Europe, Asia and Australia. I don't have details on how well it works for short or domestic routes."
        },


        /* ------------------------------------------------------
           SEARCH
        ------------------------------------------------------- */

        {
            id: "search-inputs",

            priority: 7,

            keywords: [
                "what do i enter",
                "what do i need to search",
                "search fields",
                "search form",
                "departure date",
                "origin and destination",
                "leaving from",
                "going to"
            ],

            synonyms: [
                "origin",
                "destination",
                "departure"
            ],

            answer:
                "The search form asks for where you're leaving from, where you're going, your departure date and your cabin (Economy, or Business and First class)."
        },


        {
            id: "cabin",

            priority: 6,

            keywords: [
                "first class",
                "business class",
                "economy",
                "cabin",
                "premium cabin",
                "lie flat"
            ],

            synonyms: [
                "class",
                "seat"
            ],

            answer:
                "You can search Economy, or Business and First class. Premium cabins are a popular use of points on long flights."
        },


        {
            id: "search-features-unknown",

            priority: 9,

            keywords: [
                "flexible dates",
                "flexible date",
                "multi city",
                "multi-city",
                "round trip",
                "roundtrip",
                "one way",
                "return flight",
                "nearby airports",
                "date range",
                "calendar view",
                "filters",
                "filter results",
                "sort results",
                "price alerts",
                "deal alerts",
                "fare alerts"
            ],

            synonyms: [
                "flexible",
                "alerts",
                "filter"
            ],

            answer:
                "I don't have confirmed details on that feature. The Search page lets you choose where you're leaving from and going to, a date and a cabin. For anything beyond that, please check the Search page or email support@pointsgo.com."
        },


        {
            id: "airlines",

            priority: 8,

            keywords: [
                "which airlines",
                "what airlines",
                "how many airlines",
                "airline list",
                "airline partners",
                "supported airlines",
                "100 airlines",
                "loyalty programs"
            ],

            synonyms: [
                "airlines",
                "airline"
            ],

            answer:
                "PointsGo says it finds deals across 100+ airlines. I don't have the full airline list, so for a specific airline please try a search or email support@pointsgo.com."
        },


        {
            id: "no-results",

            priority: 9,

            keywords: [
                "no results",
                "no flights found",
                "nothing found",
                "search returns nothing",
                "search not working",
                "search is stuck",
                "search stuck",
                "loading forever",
                "keeps loading",
                "searching for flights"
            ],

            synonyms: [
                "stuck",
                "loading"
            ],

            answer:
                "Sorry about that. Award seats and points prices change often and are controlled by airlines and loyalty programs, so results can vary by date. Try different dates or a different cabin. If search seems stuck, check the service status on the page and email support@pointsgo.com if it persists."
        },


        {
            id: "service-status",

            priority: 8,

            keywords: [
                "service status",
                "is the site down",
                "is pointsgo down",
                "system status",
                "systems operational",
                "outage",
                "down for everyone"
            ],

            synonyms: [
                "status",
                "outage",
                "operational"
            ],

            answer:
                "The site shows a service status indicator (it reads 'All systems operational' when things are working). If something looks wrong, try again later or email support@pointsgo.com."
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
                "award space",
                "will the seat still be there",
                "is it up to date"
            ],

            synonyms: [
                "available",
                "accurate",
                "guarantee"
            ],

            answer:
                "Award seat availability and points prices change frequently and are controlled by airlines and loyalty programs, not PointsGo. PointsGo doesn't guarantee any specific seat, so always confirm with the airline before you decide."
        },


        {
            id: "savings-value",

            priority: 7,

            keywords: [
                "how much can i save",
                "is it worth it",
                "worth it",
                "value of my points",
                "cents per point",
                "best deal",
                "best flight deals",
                "get more from my points"
            ],

            synonyms: [
                "save",
                "worth",
                "value"
            ],

            answer:
                "PointsGo aims to help you find the best flight deals for the points you've saved. I can't quote specific savings, because they depend on your route, dates and points balance."
        },


        /* ------------------------------------------------------
           BOOKING AND POINTS
        ------------------------------------------------------- */

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
                "booking",
                "book directly"
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
            id: "transfer-points",

            priority: 8,

            keywords: [
                "transfer points",
                "transfer partners",
                "how do i transfer",
                "point transfer",
                "transfer ratio",
                "transfer bonus",
                "move my points"
            ],

            synonyms: [
                "transfer",
                "partners"
            ],

            answer:
                "PointsGo guides you step by step when booking with points for the card brands it supports. I don't have details on specific transfer partners or ratios, and these can change, so please confirm with your card issuer and the airline."
        },


        /* ------------------------------------------------------
           CARDS
        ------------------------------------------------------- */

        {
            id: "cards",

            priority: 10,

            keywords: [
                "which cards",
                "what cards",
                "supported cards",
                "credit cards",
                "credit card points",
                "card brands",
                "which banks",
                "what banks",
                "do you support my card",
                "my card"
            ],

            synonyms: [
                "cards",
                "banks",
                "points program"
            ],

            answer:
                "The homepage lists these card brands: Amex (Platinum, Gold, Green or Blue Business Plus), Chase (Sapphire Preferred, Sapphire Reserve, Ink Preferred), Capital One (Venture X, Venture, VentureOne), Citi (Strata Premier, Strata Elite, Prestige), Bilt and Wells Fargo Autograph. Tap your card on the homepage to see how to book with it."
        },


        {
            id: "cards-amex",

            priority: 11,

            keywords: [
                "amex",
                "american express",
                "amex platinum",
                "amex gold",
                "amex green",
                "blue business plus",
                "membership rewards"
            ],

            synonyms: [
                "amex"
            ],

            answer:
                "Yes. The homepage lists Amex Platinum, Amex Gold, and Amex Green or Blue Business Plus."
        },


        {
            id: "cards-chase",

            priority: 11,

            keywords: [
                "chase sapphire",
                "chase ink",
                "chase card",
                "chase cards",
                "chase points",
                "do you support chase",
                "sapphire preferred",
                "sapphire reserve",
                "ink preferred",
                "ultimate rewards"
            ],

            synonyms: [
                "sapphire"
            ],

            answer:
                "Yes. The homepage lists Chase Sapphire Preferred, Chase Sapphire Reserve and Chase Ink Preferred."
        },


        {
            id: "cards-capitalone",

            priority: 11,

            keywords: [
                "capital one",
                "venture x",
                "venturex",
                "venture one",
                "ventureone",
                "capital one venture"
            ],

            synonyms: [
                "capital one"
            ],

            answer:
                "Yes. The homepage lists Capital One Venture X, Venture and VentureOne."
        },


        {
            id: "cards-citi",

            priority: 11,

            keywords: [
                "citi strata",
                "strata premier",
                "strata elite",
                "citi prestige",
                "citi card",
                "citi cards",
                "citibank",
                "citi bank",
                "citi thankyou",
                "do you support citi"
            ],

            synonyms: [
                "strata"
            ],

            answer:
                "Yes. The homepage lists Citi Strata Premier, Citi Strata Elite and Citi Prestige."
        },


        {
            id: "cards-wells-bilt",

            priority: 11,

            keywords: [
                "wells fargo",
                "autograph",
                "autograph journey",
                "bilt",
                "bilt card",
                "bilt rewards"
            ],

            synonyms: [
                "wells fargo",
                "bilt"
            ],

            answer:
                "Yes. The homepage lists the Bilt Card and the Wells Fargo Autograph or Autograph Journey card."
        },


        {
            id: "other-cards-programs",

            priority: 9,

            keywords: [
                "other cards",
                "my card isnt listed",
                "my card is not listed",
                "not listed",
                "card not supported",
                "discover card",
                "barclays",
                "us bank",
                "bank of america",
                "airline miles",
                "airline card",
                "frequent flyer",
                "skymiles",
                "aadvantage",
                "mileageplus"
            ],

            synonyms: [
                "other card",
                "frequent flyer"
            ],

            answer:
                "PointsGo is built for credit card points and airline miles. I can only confirm the card brands shown on the homepage. For another card or loyalty program, please email support@pointsgo.com."
        },


        {
            id: "regions",

            priority: 8,

            keywords: [
                "which countries",
                "what countries",
                "available in my country",
                "outside the us",
                "outside the united states",
                "international users",
                "worldwide",
                "united kingdom",
                "india",
                "canada",
                "europe users",
                "my country"
            ],

            synonyms: [
                "countries",
                "country"
            ],

            answer:
                "I don't have confirmed information on which countries are supported. The supported cards listed are US-based brands. Please email support@pointsgo.com to check availability for your country."
        },


        {
            id: "hotels",

            priority: 8,

            keywords: [
                "hotel",
                "hotels",
                "hotel points",
                "book hotels",
                "car rental",
                "rental car",
                "cruise"
            ],

            synonyms: [
                "hotel",
                "accommodation"
            ],

            answer:
                "PointsGo is a flight search tool. I don't have information on hotels or other travel bookings."
        },


        /* ------------------------------------------------------
           PRICING AND SUBSCRIPTIONS
        ------------------------------------------------------- */

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
                "subscription plans",
                "what plans",
                "monthly price",
                "yearly price"
            ],

            synonyms: [
                "price",
                "cost",
                "expensive",
                "pricing",
                "budget"
            ],

            answer:
                "Some PointsGo features need a paid subscription. The Pricing page describes premium access to exclusive flight deals and advanced search features. See the Pricing page for current plans, or I can help you pick one that fits."
        },


        {
            id: "free-or-paid",

            priority: 9,

            keywords: [
                "is it free",
                "is pointsgo free",
                "free to use",
                "free version",
                "free plan",
                "free search",
                "do i have to pay",
                "paid features"
            ],

            synonyms: [
                "free"
            ],

            answer:
                "The Terms say some features require a paid subscription, so not everything is paid. I don't have the exact split between free and paid, so please check the Pricing page."
        },


        {
            id: "trial-discount",

            priority: 9,

            keywords: [
                "free trial",
                "trial",
                "discount",
                "coupon",
                "promo code",
                "promotion",
                "student discount",
                "annual plan",
                "yearly plan",
                "monthly plan",
                "money saving"
            ],

            synonyms: [
                "discount",
                "promo",
                "trial"
            ],

            answer:
                "I don't have information on trials, discounts or promo codes. Please check the Pricing page or email support@pointsgo.com."
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
                "exclusive deals",
                "exclusive flight deals"
            ],

            synonyms: [
                "premium",
                "advanced",
                "professional",
                "best",
                "top"
            ],

            answer:
                "If you want premium access to exclusive flight deals and advanced search features, I'd look at the premium option."
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
                "renewal",
                "auto renew",
                "stop my subscription",
                "unsubscribe from plan"
            ],

            synonyms: [
                "cancel",
                "refund",
                "renew"
            ],

            answer:
                "Subscriptions renew automatically unless you cancel before the renewal date. Refunds follow PointsGo's refund policy. For cancellations or refunds, please contact support@pointsgo.com."
        },


        {
            id: "payment",

            priority: 7,

            keywords: [
                "payment methods",
                "how can i pay",
                "how do i pay",
                "billing",
                "pay for subscription",
                "stripe",
                "update payment",
                "change my card on file",
                "invoice",
                "receipt"
            ],

            synonyms: [
                "payment",
                "billing",
                "checkout"
            ],

            answer:
                "Subscription payments are processed through Stripe. The available payment options are shown at checkout. For billing questions, invoices or receipts, please email support@pointsgo.com."
        },


        /* ------------------------------------------------------
           ACCOUNT AND SECURITY
        ------------------------------------------------------- */

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
                "sign in with google",
                "google sign in",
                "login with google",
                "do i need an account"
            ],

            synonyms: [
                "account",
                "login",
                "register",
                "sign in"
            ],

            answer:
                "You need an account for some features. You can sign up with your email and password, or sign in with Google."
        },


        {
            id: "password",

            priority: 10,

            keywords: [
                "forgot password",
                "reset password",
                "change password",
                "cant log in",
                "cant login",
                "cannot log in",
                "cannot login",
                "locked out",
                "password not working"
            ],

            synonyms: [
                "password"
            ],

            answer:
                "I can't see the password reset steps from here. Please try the sign-in page, or email support@pointsgo.com and the team will help you get back in."
        },


        {
            id: "account-security",

            priority: 10,

            keywords: [
                "hacked",
                "someone accessed my account",
                "unauthorized",
                "unauthorised",
                "suspicious activity",
                "account compromised",
                "stolen account"
            ],

            synonyms: [
                "hacked",
                "unauthorized",
                "suspicious"
            ],

            answer:
                "The Terms ask you to notify PointsGo immediately about any unauthorised use of your account. Please email support@pointsgo.com right away."
        },


        /* ------------------------------------------------------
           PRIVACY, LEGAL AND DATA
        ------------------------------------------------------- */

        {
            id: "privacy",

            priority: 8,

            keywords: [
                "privacy",
                "my data",
                "personal information",
                "is my data safe",
                "data security",
                "is it safe",
                "is it secure",
                "encrypted",
                "what data do you collect",
                "what information do you collect"
            ],

            synonyms: [
                "privacy",
                "data",
                "security"
            ],

            answer:
                "PointsGo says it does not sell your personal information, and that sensitive data is encrypted in transit and at rest. It collects account details, searches and information you choose to enter, such as card and points balances. See the Privacy Policy for full details."
        },


        {
            id: "data-sharing",

            priority: 9,

            keywords: [
                "do you sell my data",
                "share my data",
                "share my information",
                "third parties",
                "who sees my data",
                "data sharing"
            ],

            synonyms: [
                "sharing",
                "third party"
            ],

            answer:
                "PointsGo says it doesn't sell personal information. It may share it with service providers, when required by law, or with business partners only with your explicit consent."
        },


        {
            id: "delete-data",

            priority: 11,

            keywords: [
                "delete my account",
                "delete my data",
                "remove my data",
                "close my account",
                "erase my data",
                "download my data",
                "gdpr",
                "ccpa",
                "opt out"
            ],

            synonyms: [
                "delete",
                "erase"
            ],

            answer:
                "Under the Privacy Policy you can access and download your data, correct it, request deletion of your account and data, and opt out of marketing. To make a request, email support@pointsgo.com."
        },


        {
            id: "cookies",

            priority: 8,

            keywords: [
                "cookies",
                "cookie policy",
                "tracking",
                "analytics"
            ],

            synonyms: [
                "cookie"
            ],

            answer:
                "PointsGo uses cookies to keep you signed in, remember your preferences and analyse how the service is used. You can control cookies in your browser settings."
        },


        {
            id: "children",

            priority: 8,

            keywords: [
                "children",
                "kids",
                "under 13",
                "age limit",
                "minimum age",
                "how old"
            ],

            synonyms: [
                "child",
                "minor"
            ],

            answer:
                "The service isn't directed to anyone under 13, and PointsGo says it doesn't knowingly collect personal information from children under 13."
        },


        {
            id: "terms",

            priority: 8,

            keywords: [
                "terms",
                "terms of service",
                "terms and conditions",
                "conditions",
                "legal",
                "governing law",
                "liability",
                "disclaimer"
            ],

            synonyms: [
                "terms",
                "legal"
            ],

            answer:
                "The Terms of Service (last updated April 8, 2026) cover your account responsibilities, acceptable use, subscriptions that renew automatically, and disclaimers. PointsGo provides information and recommendations only, and the terms are governed by California law."
        },


        {
            id: "api-scraping",

            priority: 10,

            keywords: [
                "api",
                "scrape",
                "scraping",
                "resell",
                "automated access",
                "developer",
                "integrate with pointsgo",
                "white label"
            ],

            synonyms: [
                "scraping",
                "automated"
            ],

            answer:
                "The Terms don't allow scraping, automated access, reselling or sharing access to the service. For partnerships or integrations, please email support@pointsgo.com."
        },


        /* ------------------------------------------------------
           CONTENT AND EXTRAS
        ------------------------------------------------------- */

        {
            id: "lounges",

            priority: 6,

            keywords: [
                "lounge",
                "lounges",
                "airport lounge",
                "lounge access"
            ],

            synonyms: [
                "lounge"
            ],

            answer:
                "PointsGo has a Lounges page on the website, and the Media page has lounge videos. I don't have the lounge details, so please take a look at those pages."
        },


        {
            id: "media",

            priority: 7,

            keywords: [
                "media",
                "videos",
                "reviews",
                "cabin review",
                "flight review",
                "youtube",
                "tiktok",
                "instagram",
                "shorts"
            ],

            synonyms: [
                "videos",
                "reviews"
            ],

            answer:
                "The Media page has short, practical videos from PointsGo, including cabin reviews, lounge visits and travel tips."
        },


        {
            id: "deals-newsletter",

            priority: 6,

            keywords: [
                "deals",
                "newsletter",
                "subscribe",
                "travel tips",
                "email updates",
                "mailing list",
                "stay updated"
            ],

            synonyms: [
                "deals",
                "tips",
                "updates"
            ],

            answer:
                "You can subscribe to the newsletter at the bottom of the website to get the latest flight deals and travel tips by email, and unsubscribe at any time."
        },


        {
            id: "social",

            priority: 7,

            keywords: [
                "twitter",
                "social media",
                "follow you",
                "facebook",
                "linkedin"
            ],

            synonyms: [
                "social"
            ],

            answer:
                "PointsGo's Twitter handle is @pointsgo."
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
            id: "team-careers",

            priority: 8,

            keywords: [
                "who founded",
                "founder",
                "who owns",
                "team",
                "careers",
                "jobs",
                "hiring",
                "work for you",
                "press",
                "investors",
                "funding"
            ],

            synonyms: [
                "careers",
                "founder"
            ],

            answer:
                "I don't have details about the team, careers or press. Please email support@pointsgo.com."
        },


        {
            id: "mobile-app",

            priority: 8,

            keywords: [
                "mobile app",
                "app store",
                "play store",
                "ios app",
                "android app",
                "download the app",
                "chrome extension"
            ],

            synonyms: [
                "app"
            ],

            answer:
                "I don't have information about a mobile app. PointsGo is available on the website, and you can email support@pointsgo.com to ask about apps."
        },


        {
            id: "competitors",

            priority: 9,

            keywords: [
                "point me",
                "pointsyeah",
                "roame",
                "seats aero",
                "points path",
                "google flights",
                "alternative",
                "alternatives",
                "competitor",
                "competitors",
                "better than",
                "different from"
            ],

            synonyms: [
                "alternative",
                "competitor"
            ],

            answer:
                "I can only speak for PointsGo. It's built to help you find flights you can book with your points and miles, with step-by-step booking guidance. The best way to compare is to try a search and look at the Pricing page."
        },


        /* ------------------------------------------------------
           SUPPORT AND CONTACT
        ------------------------------------------------------- */

        {
            id: "support-hours",

            priority: 9,

            keywords: [
                "support hours",
                "opening hours",
                "business hours",
                "when are you open",
                "response time",
                "how long to reply",
                "24/7",
                "live chat"
            ],

            synonyms: [
                "hours",
                "response time"
            ],

            answer:
                "I don't have support hours or response times. You can reach the team at support@pointsgo.com."
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
                "problem with",
                "complaint",
                "report a bug",
                "something is wrong",
                "not working",
                "error"
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
                "phone number",
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


        /* ------------------------------------------------------
           ABOUT THIS ASSISTANT / SMALL TALK
        ------------------------------------------------------- */

        {
            id: "bot-identity",

            priority: 10,

            keywords: [
                "are you a bot",
                "are you a robot",
                "are you human",
                "are you real",
                "are you ai",
                "is this ai",
                "who built you",
                "who made you",
                "meyvitt"
            ],

            synonyms: [
                "bot",
                "robot",
                "chatbot"
            ],

            answer:
                "I'm an automated assistant, an unofficial demo built by Meyvitt. I answer using information from the PointsGo website and I'm not an official PointsGo support agent. For account issues, please email support@pointsgo.com."
        },


        {
            id: "thanks",

            priority: 12,

            keywords: [
                "thanks",
                "thank you",
                "thanks a lot",
                "thank you so much",
                "cheers",
                "appreciate it",
                "great thanks",
                "perfect thanks"
            ],

            synonyms: [
                "thanks",
                "thankyou"
            ],

            answer:
                "You're welcome! Anything else I can help you with?"
        },


        {
            id: "goodbye",

            priority: 12,

            keywords: [
                "bye",
                "goodbye",
                "see you",
                "see you later",
                "that is all",
                "thats all",
                "no thanks",
                "im done"
            ],

            synonyms: [
                "bye",
                "goodbye"
            ],

            answer:
                "Thanks for stopping by! Happy travels."
        },


        {
            id: "how-are-you",

            priority: 12,

            keywords: [
                "how are you",
                "how are you doing",
                "whats up",
                "how is it going"
            ],

            synonyms: [],

            answer:
                "I'm doing well, thanks for asking! I can help you with how PointsGo works, supported cards, plans and booking with points. What would you like to know?"
        }

    ]

};