// This is the discord library for node.js
const Discord = require('discord.js')

const dsBot = () => {
    
    // Creates a new bot instance
    
    const client = new Discord.Client();
    
    // Imports the events
    const ClientOnReady = require('./events/clientOnReady').ClientOnReady;
    const ClientOnMessage = require('./events/clientOnMessage').ClientOnMessage;
    
    // This is an event that allow us the bot to do something 
    // everytime it goes on
    
    ClientOnReady(client, Discord);
    
    // This is an event that allow us to answer to user messages
    // The function is triggered everytime a user send a message
    
    ClientOnMessage(client, Discord);
    
    
    // The token of the discord bot
    
    const token = "INSERT DISCORD TOKEN HERE";
    
    client.login(token);
}

module.exports.dsBot = dsBot;