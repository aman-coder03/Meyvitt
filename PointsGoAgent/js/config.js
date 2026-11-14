const AGENT_CONFIG = {

    brand: {
        name: "PointsGo",
        assistantName: "PointsGo Assistant",

        logo: "",   /* leave empty: do not use PointsGo's logo in an unofficial demo */

        primaryColor: "#111111",     /* REPLACE with PointsGo's main colour from their site CSS */
        secondaryColor: "#f5f5f5",   /* REPLACE */

        poweredByText: "Unofficial demo by Meyvitt",
        poweredByLogo: "assets/meyvitt.png"
    },


    assistant: {

        greeting:
            "Hi! I'm the PointsGo Assistant. How can I help you today?",

        welcomeSubtitle:
            "Ask me how PointsGo works, which cards are supported, or let me help you pick the right plan.",

        fallback:
            "I'm not completely sure about that, but I can help you with:\n\n• How PointsGo works\n• Supported credit cards\n• Plans and pricing\n• Booking with points\n• Your account\n• Contacting support\n\nWhat would you like to know?",

        typingDelay: 500,

        placeholderExamples: [
            "Ask me anything...",
            "Try: \"how does PointsGo work?\"",
            "Try: \"which cards are supported?\"",
            "Try: \"help me choose a plan\""
        ]

    },


    quickActions: [

        "How does PointsGo work?",
        "Which cards are supported?",
        "What are your prices?",
        "How can I contact you?"

    ]

};