document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       ELEMENTS
    ========================== */

    const launcher =
        document.getElementById(
            "agentLauncher"
        );

    const chatWidget =
        document.getElementById(
            "chatWidget"
        );

    const closeChat =
        document.getElementById(
            "closeChat"
        );

    const chatMessages =
        document.getElementById(
            "chatMessages"
        );

    const chatForm =
        document.getElementById(
            "chatForm"
        );

    const userInput =
        document.getElementById(
            "userInput"
        );

    const agentName =
        document.getElementById(
            "agentName"
        );

    const agentLogo =
        document.getElementById(
            "agentLogo"
        );

    const launcherBadge =
        document.getElementById(
            "launcherBadge"
        );


    /* =========================
       BRAND CONFIG
    ========================== */

    document.documentElement.style.setProperty(
        "--brand-primary",
        AGENT_CONFIG.brand.primaryColor
    );


    document.documentElement.style.setProperty(
        "--brand-secondary",
        AGENT_CONFIG.brand.secondaryColor
    );


    agentName.textContent =
        AGENT_CONFIG.brand.assistantName;


    if (AGENT_CONFIG.brand.logo) {

        agentLogo.innerHTML = `
            <img
                src="${AGENT_CONFIG.brand.logo}"
                alt="${AGENT_CONFIG.brand.name}"
            >
        `;

    }


    /* =========================
       POWERED BY WATERMARK
    ========================== */

    const poweredBy =
        document.getElementById(
            "poweredBy"
        );

    if (
        poweredBy &&
        AGENT_CONFIG.brand.poweredByText
    ) {

        poweredBy.innerHTML = `
            ${
                AGENT_CONFIG.brand.poweredByLogo
                ?
                `<img src="${AGENT_CONFIG.brand.poweredByLogo}" alt="">`
                :
                ""
            }
            <span>${AGENT_CONFIG.brand.poweredByText}</span>
        `;

    }


    /* =========================
       CREATE AGENT
    ========================== */

    const agent =
        new AIAgent(
            KNOWLEDGE,
            AGENT_CONFIG
        );


    /* =========================
       OPEN CHAT
    ========================== */

    launcher.addEventListener(
        "click",
        () => {

            chatWidget.classList.remove(
                "hidden"
            );

            launcher.style.display =
                "none";

            if (launcherBadge) {

                launcherBadge.classList.add(
                    "hidden"
                );

            }

            userInput.focus();

        }
    );


    /* =========================
       CLOSE CHAT
    ========================== */

    closeChat.addEventListener(
        "click",
        () => {

            chatWidget.classList.add(
                "hidden"
            );

            launcher.style.display =
                "flex";

        }
    );


    /* =========================
       INITIAL WELCOME SCREEN
    ========================== */

    renderWelcomeScreen();


    /* =========================
       ROTATING INPUT PLACEHOLDER
    ========================== */

    startPlaceholderRotation();


    /* =========================
       WELCOME SCREEN
    ========================== */

    function renderWelcomeScreen() {

        const welcome =
            document.createElement(
                "div"
            );


        welcome.className =
            "welcome-message";


        const actionsHtml =
            AGENT_CONFIG.quickActions
                .map(
                    (action, index) => `
                        <button
                            type="button"
                            class="welcome-action"
                            data-action-index="${index}"
                        >
                            <span>${escapeHtml(action)}</span>
                            <span></span>
                        </button>
                    `
                )
                .join("");


        const iconMarkup =
            agentLogo
            ?
            agentLogo.innerHTML
            :
            "";


        welcome.innerHTML = `

            <div class="welcome-icon">
                <div class="ai-robot">
                    ${iconMarkup}
                </div>
            </div>

            <h2>${escapeHtml(AGENT_CONFIG.brand.assistantName)}
            </h2>

            <p>
                ${escapeHtml(
                    AGENT_CONFIG.assistant.welcomeSubtitle ||
                    AGENT_CONFIG.assistant.greeting
                )}
            </p>

            <div class="welcome-actions">
                ${actionsHtml}
            </div>

        `;


        chatMessages.appendChild(
            welcome
        );


        welcome
            .querySelectorAll(".welcome-action")
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const index =
                                Number(
                                    button.dataset.actionIndex
                                );

                            handleUserMessage(
                                AGENT_CONFIG.quickActions[index]
                            );

                        }
                    );

                }
            );

    }


    /* =========================
       ROTATING PLACEHOLDER
    ========================== */

    function startPlaceholderRotation() {

        const examples =
            AGENT_CONFIG.assistant.placeholderExamples;

        if (
            !examples ||
            !examples.length
        ) {

            return;

        }


        let index = 0;

        userInput.placeholder =
            examples[0];


        setInterval(
            () => {

                if (
                    document.activeElement === userInput ||
                    userInput.value
                ) {

                    return;

                }


                index =
                    (index + 1) %
                    examples.length;

                userInput.placeholder =
                    examples[index];

            },
            3000
        );


        userInput.addEventListener(
            "focus",
            () => {

                userInput.placeholder =
                    examples[0];

            }
        );

    }


    /* =========================
       TEXT HELPERS
    ========================== */

    function escapeHtml(text) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            text == null ? "" : String(text);

        return div.innerHTML;

    }


    function formatTime() {

        const now =
            new Date();

        return now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /* =========================
       SEND MESSAGE
    ========================== */

    chatForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const message =
                userInput.value.trim();


            if (!message) {
                return;
            }


            handleUserMessage(
                message
            );


            userInput.value = "";

        }
    );


    /* =========================
       MESSAGE HANDLER
    ========================== */

    function handleUserMessage(
        message
    ) {

        addUserMessage(
            message
        );


        showTyping();


        setTimeout(
            () => {

                removeTyping();


                const response =
                    agent.process(
                        message
                    );


                if (
                    response.type ===
                    "product"
                ) {

                    addProductMessage(
                        response.product,
                        response.salesMessage
                    );

                }

                else if (
                    response.type ===
                    "comparison"
                ) {

                    addComparisonMessage(
                        response.products,
                        response.recommendedId
                    );

                }

                else {

                    addAgentMessage(
                        response.text
                    );

                }

            },

            AGENT_CONFIG
                .assistant
                .typingDelay

        );

    }


    /* =========================
       USER MESSAGE
    ========================== */

    function addUserMessage(
        text
    ) {

        const message =
            document.createElement(
                "div"
            );


        message.className =
            "message user";


        message.innerHTML = `
            <div>${escapeHtml(text)}</div>
            <div class="message-time">${formatTime()}</div>
        `;


        chatMessages.appendChild(
            message
        );


        scrollToBottom();

    }


    /* =========================
       AGENT MESSAGE
    ========================== */

    function addAgentMessage(
        text
    ) {

        const message =
            document.createElement(
                "div"
            );


        message.className =
            "message agent";


        const safeText =
            escapeHtml(text).replace(
                /\n/g,
                "<br>"
            );


        message.innerHTML = `
            <div>${safeText}</div>
            <div class="message-time">${formatTime()}</div>
        `;


        chatMessages.appendChild(
            message
        );


        scrollToBottom();

    }


    /* =========================
       PRODUCT CARD
    ========================== */

    function addProductMessage(
        product,
        salesMessage = null
    ) {

        const message =
            document.createElement(
                "div"
            );


        message.className =
            "message agent";


        const features =
            product.features || [];


        const imageHtml =
            product.image
            ?
            `<img class="product-image" src="${product.image}" alt="${escapeHtml(product.name)}">`
            :
            `<div class="product-image product-image-placeholder">${escapeHtml((product.name || "?").charAt(0))}</div>`;


        message.innerHTML = `

            <div class="sales-intro">
                ${
                    salesMessage ||
                    "This option may be a good fit for you:"
                }
            </div>

            <div class="product-card">

                ${imageHtml}

                <div class="product-card-header">

                    <h4>
                        ${product.name}
                    </h4>

                    <div class="product-price">
                        ${product.price}
                    </div>

                </div>


                <p class="product-description">
                    ${product.description}
                </p>


                ${
                    features.length
                    ?
                    `
                    <div class="product-features">

                        ${features.map(
                            feature => `
                                <div class="product-feature">
                                    <span>✓</span>
                                    ${feature}
                                </div>
                            `
                        ).join("")}

                    </div>
                    `
                    :
                    ""
                }


                ${
                    product.bestFor
                    ?
                    `
                    <div class="product-best-for">

                        <strong>
                            Best for
                        </strong>

                        <span>
                            ${product.bestFor}
                        </span>

                    </div>
                    `
                    :
                    ""
                }


                <button
                    class="product-cta"
                    onclick="window.open('${product.url || "#"}', '_blank')"
                >
                    ${product.ctaText || "View Product"}
                </button>

            </div>

            <div class="message-time">${formatTime()}</div>

        `;


        chatMessages.appendChild(
            message
        );


        scrollToBottom();

    }

    /* =========================
        PRODUCT COMPARISON
    ========================== */

        function addComparisonMessage(products, recommendedId = null) {

        const message =
            document.createElement("div");


        message.className =
            "message agent";


        if (
            !products ||
            products.length < 2
        ) {

            message.textContent =
                "I need at least two products to compare.";

            chatMessages.appendChild(
                message
            );

            scrollToBottom();

            return;

        }


        function renderComparisonProduct(product) {

            const features =
                product.features || [];

            const isRecommended =
                recommendedId &&
                product.id === recommendedId;

            const imageHtml =
                product.image
                ?
                `<img class="comparison-image" src="${product.image}" alt="${escapeHtml(product.name)}">`
                :
                `<div class="comparison-image comparison-image-placeholder">${escapeHtml((product.name || "?").charAt(0))}</div>`;

            return `

                <div class="comparison-product ${isRecommended ? "comparison-product-recommended" : ""}">

                    ${
                        isRecommended
                        ?
                        `<div class="comparison-badge">Best match for you</div>`
                        :
                        ""
                    }

                    ${imageHtml}

                    <div class="comparison-product-name">
                        ${product.name}
                    </div>
                    <div class="comparison-price">
                        ${product.price}
                    </div>

                    <div class="comparison-section">

                        <strong>
                            Overview
                        </strong>

                        <span>
                            ${product.description}
                        </span>

                    </div>

                    ${
                        product.bestFor
                        ?
                        `
                        <div class="comparison-section">

                            <strong>
                                Best for
                            </strong>

                            <span>
                                ${product.bestFor}
                            </span>

                        </div>
                        `
                        :
                        ""
                    }

                    ${
                        features.length
                        ?
                        `
                        <div class="comparison-features">

                            ${features.map(
                                feature =>
                                    `<span>✓ ${feature}</span>`
                            ).join("")}

                        </div>
                        `
                        :
                        ""
                    }

                </div>

            `;

        }


        const productsHtml =
            products
                .slice(0, 2)
                .map(renderComparisonProduct)
                .join("");


        message.innerHTML = `

            <div class="comparison-intro">
                Here's a quick comparison to help you choose:
            </div>

            <div class="comparison-card">
                ${productsHtml}
            </div>

            <div class="message-time">${formatTime()}</div>

        `;


        chatMessages.appendChild(
            message
        );


        scrollToBottom();

    }


    /* =========================
       TYPING INDICATOR
    ========================== */

    function showTyping() {

        const typing =
            document.createElement(
                "div"
            );


        typing.id =
            "typingIndicator";


        typing.className =
            "message agent typing";


        typing.innerHTML = `

            <span></span>
            <span></span>
            <span></span>

        `;


        chatMessages.appendChild(
            typing
        );


        scrollToBottom();

    }


    function removeTyping() {

        const typing =
            document.getElementById(
                "typingIndicator"
            );


        if (typing) {

            typing.remove();

        }

    }


    /* =========================
       SCROLL
    ========================== */

    function scrollToBottom() {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }

});