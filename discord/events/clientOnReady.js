// This is an event that allow us the bot to do something 
// everytime it goes on

const ClientOnReady = (client, Discord) => {
    return(
        client.on('ready', () => {
            console.log("Connected as " + client.user.tag);

            // We can modify the bot activity
            client.user.setActivity("Spotify", {type: "LISTENING"});

            client.guilds.cache.forEach(g => {

                // Console log the name of the server to which the bot is connected
                console.log(g.name);

                // Console log the name, the type and the id of every channel

                g.channels.cache.forEach((channel) => {
                    console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
                
                })
            });

            // Get the channel id
            let generalChannel = client.channels.cache.get("INSERT DISCORD CHANNEL HERE");

            let introduction = 
                "Hello humans, i'm online, write me one of the following instructions and i will answer:\n "                    +
                "1- '!help [topic]' --> To get help on one of my functions\n"                                                   +
                "2- '!help recap' --> To get the list of the topics to get informations about\n"                                +
                "3- '!m new rap releases' --> To get a list of the new rap releases\n"                                          +
                "4- '!m new italian rap releases' --> To get a list of the new italian rap releases\n"                          +
                "5- '!m new american rap releases' --> To get a list of the new american rap releases\n"                        +
                "6- '!m new english rap releases' --> To get a list of the new english rap releases\n"                          +
                "\nRemember that it doasn't matter if you write in upper or lower case, i will understand!"                     ;

            // Send a message everytime the bot connects to the channel
            generalChannel.send(introduction);
        })
    )
}

module.exports.ClientOnReady = ClientOnReady;