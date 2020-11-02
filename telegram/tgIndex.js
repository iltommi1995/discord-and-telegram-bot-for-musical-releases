// The two resolvers are imported

const {helpCommand} = require('./resolvers/helpCommand');
const {musicCommand} = require('./resolvers/musicCommand');

// The javascript library for telegram bots is imported

const TelegramBot = require('node-telegram-bot-api');

const tgBot = () => {

    // A new istance of the bot is created, passing the bot token
    
    const token = "INSERT TELEGRAM TOKEN HERE";
    const bot = new TelegramBot(token, {polling: true});
    
    // This is an "onText" event, which is triggered by user messages to the bot
    
    bot.onText(/\/(.+)/, (msg, match) => {
    
        // In chatId is stored the id of the chat the message came from, so that 
        // the bot can reply in the correct chat
    
        const chatId = msg.chat.id;  
    
        // The message is processed. First it's converted in LowerCase, then splitted
        // to create 2 variables: the first one contains the first word of the message
        // and the second one contains the other words of the message
    
        let rawCommand = match[1].toLowerCase();
        let rawCommandSplitted = rawCommand.split(" ");
        let firstCommand = rawCommandSplitted[0];
        let elaboratedCommand = rawCommandSplitted.splice(1);
    
        // Based on what the first word of the message is, the resolvers are called
        
        switch(firstCommand) {
            case "help":
                helpCommand(elaboratedCommand, chatId, bot);
            break;
            case "m":
                musicCommand(elaboratedCommand, chatId, bot);
            break;
        }
    
        console.log(chatId);
        console.log(match[1]);
    });
}

module.exports.tgBot = tgBot;
