// Import the resolvers

const {helpCommand} = require('../resolvers/helpCommand');
const {musicCommand} = require('../resolvers/musicCommand');

// This is an event that allow us to answer to user messages
// The function is triggered everytime a user send a message

const ClientOnMessage = (client, Discord) => {

    // Splits the command if it begins with "!"
    function splitCommand(receivedMessage) {
        let command = receivedMessage.content.substr(1).toLocaleLowerCase();
        let splittedCommand = command.split(" ");
        let primaryCommand = splittedCommand[0];
        let arguments = splittedCommand.slice(1);
    
        if (primaryCommand == "help") {
            helpCommand(arguments, receivedMessage);
        }

        if(primaryCommand == "m") {
            musicCommand(arguments, receivedMessage);
        }
    }

    // Once i have called the resolvers i return the result

    return(
        client.on('message', (receivedMessage) => {

            // This is necessary to avoid that the bot answers
            // to his own messages, generating an infinite loop
            if (receivedMessage.author == client.user) {
                return;
            }

            // This is to call the above function
            if (receivedMessage.content.startsWith("!")) {
                splitCommand(receivedMessage);
            }
        })
    )
}

module.exports.ClientOnMessage = ClientOnMessage;