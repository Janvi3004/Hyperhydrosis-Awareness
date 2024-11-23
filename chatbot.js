document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Predefined responses for the chatbot
    const botResponses = {
        "what is hyperhidrosis?": "Hyperhidrosis is a condition characterized by excessive sweating, which may affect your daily activities.",
        "what are the symptoms?": "Symptoms include excessive sweating in specific areas such as palms, feet, underarms, or face.",
        "what are the treatments?": "Treatments include antiperspirants, medications, Botox injections, or in severe cases, surgery.",
        "can it be cured?": "There is no permanent cure, but treatments can help manage the symptoms effectively.",
        default: "I'm sorry, I don't understand your question. Please try asking something else about hyperhidrosis."
    };

    // Function to add a chat message
    const addMessage = (message, isBot = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', isBot ? 'bot-message' : 'user-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
    };

    // Handle user input
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage);
            userInput.value = '';

            // Get bot response
            const botResponse = botResponses[userMessage.toLowerCase()] || botResponses.default;
            setTimeout(() => addMessage(botResponse, true), 1000);
        }
    });
});
