const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    message.channel.send("Ping....").then(m =>{
        let ping = m.createdTimestamp - message.createdTimestamp;
        let ramdomMessage = ["PONG, it's insane :D", "PONG, wow dude", "PONG, well, just this now"];
        let newMessage = ramdomMessage[Math.floor(Math.random() * ramdomMessage.length)];

        m.edit(`${newMessage}: My ping: \`${ping}ms\`, API Latency: \`${Math.round(client.ping)}ms\`.`);
    });

}

module.exports.help = {
    name: "ping"
}