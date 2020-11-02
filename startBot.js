// Import the bots

const { tgBot } = require('./telegram/tgIndex');
const { dsBot } = require('./discord/dsIndex');

// Start the bots 

tgBot();
dsBot();