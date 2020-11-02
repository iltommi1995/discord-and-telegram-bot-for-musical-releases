// Resolver of the command '!help [topic]'

// "arguments" is the message that the user sent, without the first word. I need
// also to pass the chatId and the bot

const helpCommand = function (elaboratedCommand, chatId, bot) {
    // The case where the elaboratedCommand is void (user wrote only '/help')

    if (elaboratedCommand.length == 0) {
        bot.sendMessage(chatId, "I don't know what you're asking me. Try with '/help [topic]'");
    } 
    
    // The case where elaboratedCommand contains something

    else {
        // The possible answers to send to the users
        
        switch(elaboratedCommand[0]) {
        case "music":
            let musicAnswer = 
                "This are the thing you can ask me about music:\n"                                                              +
                "1- '/m new rap releases' --> To get a list of the new rap releases\n"                                          +
                "2- '/m new italian rap releases' --> To get a list of the new italian rap releases\n"                          +
                "3- '/m new american rap releases' --> To get a list of the new american rap releases\n"                        +
                "4- '/m new english rap releases' --> To get a list of the new english rap releases\n"                          ;
            bot.sendMessage(chatId, musicAnswer);
        break;
        case "recap":
            let recapAnswer = 
                "This are the topics you can ask me for:\n"                                                                      +
                "1- '/help music' --> To get a list of the thigs you can ask me about music\n"                                   ;        
            bot.sendMessage(chatId, recapAnswer);
        break;
        default:
            bot.sendMessage(chatId, "I'm sorry but i don't know the topic " + elaboratedCommand);
        }
    }
}

module.exports.helpCommand = helpCommand;