const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./database/database.db");

client.commands = new Discord.Collection();
client.prefix = config.prefix;

fs.readdir("./commands/", (err, files) => {
    if (err) { console.log(err); }

    let jsFiles = files.filter(f => f.split(".").pop() == "js");

    if (jsFiles.length <= 0) {
        console.log("No js commands in commands folder");
        return;
    }

    jsFiles.forEach((f, i) => {
        let filePath = require(`./commands/${f}`);
        console.log(`New command added! ${f}`);
        client.commands.set(filePath.help.name, filePath);
    });
});

db.run(`CREATE TABLE IF NOT EXISTS servers
(SERVERID STRING PRIMARY KEY,
    PREFIX STRING)`);

client.on("ready", () => {
    console.log("Bot on!" + 
    "\nUsers: " + client.users.size + 
    "\nServers " + client.guilds.size);
    client.user.setActivity(`${client.users.size} usuarios`, {type: "Watching"});
});

client.on("message", async message => {
    // Don't accept private messages, messages from bot and only read messages starting with prefix.
    if(message.author.bot || !message.content.startsWith(client.prefix) || message.channel.type == "dm"){ return; }
    // Example message !Hello my name is Lucas
    // Get all arguments from message example: array ["Hello", "my", "name", "is", "Lucas"] and remove the prefix with substr(1). 
    let allMessage = message.content.trim().substr(client.prefix.length).split(" ");
    let command = allMessage[0].toLowerCase();
    // args will be: array ["my", "name", "is", "Lucas"] removing the command with slice(1)
    let args = allMessage.slice(1);

    let commandFile = client.commands.get(command);
    if (commandFile) { 
        commandFile.run(client, message, args);
        console.log(`All Message: ${allMessage}`)
        console.log(`Command: ${command}`);
        console.log(`Arguments: ${args}`)
    }
});

//When someone add ToscaroBot in a server
client.on("guildCreate", async guild => {
    let serverId = guild.id;
    let serverName = guild.name;
    let defaultPrefix = config.prefix;
    console.log(`New server.. ID: ${serverId}, Name: ${serverName}`);
    db.run(`INSERT INTO servers (SERVERID, PREFIX)
    VALUES (${serverId}, "${defaultPrefix}")`);
});

//When someone remove ToscaroBot from server
client.on("guildDelete", guild => {
    let serverId = guild.id;
    let serverName = guild.name;
    console.log(`Bye server.. ID: ${serverId}, Name: ${serverName}`);
    db.run(`DELETE FROM servers WHERE SERVERID = ${serverId}`)
})

client.login(config.token);