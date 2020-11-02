// Resolver of the command '!help [topic]'

// "arguments" is the message that the user sent, without the first word
    
function helpCommand(arguments, receivedMessage) {
    // The case where the elaboratedCommand is void (l'utente ha scritto solo '!help')

    if (arguments.length == 0) {
        receivedMessage.channel.send("I don't know what you are asking me. Try with '!help [topic]'");
    } 
    // The case where elaboratedCommand contains something

    else {
        // The possible answers to send to the users
        
        switch(arguments[0]) {
        case "music":
            let musicAnswer = 
                "This are the things you can ask me about music:\n"                                                             +
                "1- '!m new rap releases' --> To get a list of the new rap releases\n"                                          +
                "2- '!m new italian rap releases' --> To get a list of the new italian rap releases\n"                          +
                "3- '!m new american rap releases' --> To get a list of the new american rap releases\n"                        +
                "4- '!m new english rap releases' --> To get a list of the new english rap releases\n"                          +
                "\nRemember that it doasn't matter if you write in upper or lower case, i will understand!"                     ;
            receivedMessage.channel.send(musicAnswer);
        break;
        case "recap":
            let recapAnswer = 
                "This are the topics you can ask informations for:\n"                                                           +
                "1- '!help music' --> To get a list of the things you can ask me about music\n"                                 ;   
            receivedMessage.channel.send(recapAnswer);
        break;
        default:
            receivedMessage.channel.send("I'm sorry but i don't know nothing about " + arguments[0]);
        }
    }
}

module.exports.helpCommand = helpCommand;