//server.js has the code to start the server

const app = require('./src/app')
const config = require('./src/config')

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Finance Chatbot Backend working on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
})