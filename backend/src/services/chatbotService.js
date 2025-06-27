// 




// chatbotService.js — Finance-only chatbot with budgeting support and no personal data access

const fs = require('fs');
const path = require('path');
const geminiService = require('./geminiService');

const intentsDataPath = path.join(__dirname, '../../data/intents.json');
const intentsData = JSON.parse(fs.readFileSync(intentsDataPath, 'utf8'));

function detectIntent(text) {
    const lowerText = text.toLowerCase();
    for (const intent of intentsData.intents) {
        for (const keyword of intent.keywords) {
            if (lowerText.includes(keyword)) {
                return intent.name;
            }
        }
    }
    return "fallback";
}

function extractEntities(text, intent) {
    const entities = {};
    const lowerText = text.toLowerCase();

    if (intent === "check_balance") {
        if (lowerText.includes("saving") || lowerText.includes("savings")) {
            entities.account_type = "savings";
        } else if (lowerText.includes("checking")) {
            entities.account_type = "checking";
        } else if (lowerText.includes("credit")) {
            entities.account_type = "credit";
        }
    }

    return entities;
}

async function getChatbotResponse(message, user) {
    const intent = detectIntent(message);
    const entities = extractEntities(message, intent);

    const baseDisclaimer = "\n\nDisclaimer: I am an AI-powered financial education bot and cannot provide personalized financial advice or access personal data. Please consult a certified financial professional for specific guidance.";
    let responseText = "";

    // Reject personal info or real-time data queries
    if (["check_balance", "get_transactions", "view_personal_data", "account_info"].includes(intent)) {
        responseText = `I cannot access personal data, accounts, or real-time information. I am strictly designed to provide general financial education and budgeting help.${baseDisclaimer}`;
    }

    // Greet or say goodbye
    else if (intent === "greet") {
        responseText = `Hello ${user?.username || 'there'}! How can I assist you with budgeting or finance today?${baseDisclaimer}`;
    } else if (intent === "goodbye") {
        responseText = `Goodbye! Wishing you success in your financial journey.${baseDisclaimer}`;
    }

    // Handle budgeting separately
    else if (intent === "budgeting") {
        const prompt = `You are a finance-only assistant. Answer the following question with a focus on personal budgeting advice.\n\nUser: ${message}`;
        try {
            responseText = await geminiService.generateTextFromGemini(prompt);
            responseText += baseDisclaimer;
        } catch (err) {
            console.error("Gemini error:", err);
            responseText = `I'm currently unable to assist with that budgeting query. Please try again shortly.${baseDisclaimer}`;
        }
    }

    // For all finance-related queries (fallback, investment, savings, etc.)
    else {
        const prompt = `You are a helpful assistant who strictly responds to finance-related questions only. If the user's question is NOT about finance, budgeting, investing, saving, loans, or credit, reply with: "I can only answer queries related to finance and budgeting."\n\nUser: ${message}`;
        try {
            responseText = await geminiService.generateTextFromGemini(prompt);
            responseText += baseDisclaimer;
        } catch (err) {
            console.error("Gemini error fallback:", err);
            responseText = `I'm sorry, I'm unable to process this request right now.${baseDisclaimer}`;
        }
    }

    return {
        response: responseText,
        intent,
        entities
    };
}

module.exports = {
    getChatbotResponse
};
