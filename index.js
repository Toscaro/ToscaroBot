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

client.on("message", async message => {
    // Don't accept private messages, messages from bot and only read messages starting with prefix.
    if(message.author.bot || !message.content.startsWith(config.prefix) || message.channel.type == "dm"){ return; }
    // Get all arguments from message e.g: array ["Hello", "my", "name", "is", "Lucas"] and remove the prefix with substr(1). 
    var args = message.content.trim().substr(1).split(" ");

    switch (args[0].toLowerCase()) {
        case ("ping"):
        message.channel.send("Ping....").then(m =>{
            let ping = m.createdTimestamp - message.createdTimestamp;
            let ramdomMessage = ["PONG, it's insane :D", "PONG, wow dude", "PONG, well, just this now"];
            let newMessage = ramdomMessage[Math.floor(Math.random() * ramdomMessage.length)];

            m.edit(`${newMessage}: My ping: \`${ping}ms\`, API Latency: \`${Math.round(client.ping)}ms\`.`);
        });
        break;

    }
    console.log(args[0]);
});

client.login(config.token);