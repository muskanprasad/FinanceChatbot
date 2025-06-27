console.log('--- Loading geminiService.js ---'); 

const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

console.log('Config loaded. API Key presence:', !!config.financialApiKey); 
console.log('Raw API Key value from config:', config.financialApiKey ? '***** (present)' : 'NOT PRESENT');

const API_KEY = config.financialApiKey;
if (!API_KEY) {
    console.error("FINANCIAL_API_KEY (used for Gemini) is not set in environment variables during geminiService loading.");
}

let genAI;
let model;
try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    console.log('Google Generative AI client and model initialized successfully.'); 
} catch (initError) {
    console.error('Error initializing Google Generative AI client or model:', initError); 
}

async function generateTextFromGemini(prompt) {
    console.log('Attempting to call generateTextFromGemini function.');
    if (!API_KEY || !model) {
        throw new Error("Gemini API key or model is missing. Cannot generate text.");
    }
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log('Successfully received response from Gemini.'); 
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error); 
        throw new Error("Failed to get response from Gemini API.");
    }
}

console.log('Type of generateTextFromGemini before export:', typeof generateTextFromGemini); 

module.exports = {
    generateTextFromGemini
};

console.log('--- geminiService.js finished loading and exporting ---');
console.log('Module.exports object:', module.exports);
