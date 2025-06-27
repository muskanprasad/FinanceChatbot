require('dotenv').config();     
module.exports = {
    port: process.env.PORT || 3000,        
    financialApiKey: process.env.FINANCIAL_API_KEY,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongodbURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET       
};