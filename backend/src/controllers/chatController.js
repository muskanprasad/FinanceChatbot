const chatbotService = require('../services/chatbotService');

async function handleChatMessage(req, res) {
    const { message } = req.body;
    const user = req.user; 

    if (!message) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    try {
        
        const chatbotResponse = await chatbotService.getChatbotResponse(message, user);

        
        res.json(chatbotResponse);

    } catch (error) {
        console.error('Error processing chat message:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


module.exports = {
    handleChatMessage
};