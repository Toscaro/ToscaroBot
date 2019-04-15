const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.prefix = config.prefix;

client.on("ready", () => {
    console.log("Bot on!" + 
    "\nUsers: " + client.users.size + 
    "\nServers " + client.guilds.size);
    client.user.setActivity(`${client.users.size} usuarios`, {type: "Watching"});
});

client.login(config.token);