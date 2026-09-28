const Groq = require('groq-sdk');
const config = require('../config');

const API_KEY = config.groqApiKey;
if (!API_KEY) {
    console.error("GROQ_API_KEY is not set in environment variables.");
}

const client = new Groq({ apiKey: API_KEY });

async function generateTextFromGroq(prompt) {
    console.log('Calling Groq API...');
    if (!API_KEY) {
        throw new Error("Groq API key is missing.");
    }
    try {
        const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
        { role: "user", content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 1024,
});
        const text = response.choices[0].message.content;
        console.log('Successfully received response from Groq.');
        return text;
    } catch (error) {
        console.error("Error calling Groq API:", error);
        throw new Error("Failed to get response from Groq API.");
    }
}

module.exports = {
    generateTextFromGroq
};