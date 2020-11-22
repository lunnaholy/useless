let HearManager = require("./modules/Hear/hear");
const Discord = require('discord.js');
const fs = require('fs');

let hear = new HearManager();

const client = new Discord.Client();

client.login(JSON.parse(fs.readFileSync("./auth.json")).token);

client.once('ready', () => {
    console.log(`Now listening ${client.guilds.cache.size} servers`)
    console.log("Now " + hear.count() + " commands loaded");
    updatePresence();
    setInterval(function () {
        updatePresence();
    }, 60 * 1000);
});

client.on('message', message => {
    if(message.content.indexOf("reload hear") > -1){
        if (JSON.parse(fs.readFileSync('./owners.json')).indexOf(message.author.id) == -1) return message.channel.send("Insufficient permissions.");
        let solvedName = require.resolve('./modules/Hear/hear.js');
        delete require.cache[solvedName];

        HearManager = require("./modules/Hear/hear.js");
        hear = new HearManager();

        return message.channel.send("Reloaded hear module.");
    }
    return hear.hear(message);
});

function getServerLocale(count) {
    if (count.endsWith("1")) {
        return "server";
    }
    if (count.endsWith("2") || count.endsWith("3") || count.endsWith("4")) {
        return "servers";
    } else {
        return "servers";
    }
}

function updatePresence() {
    client.user.setPresence({
        status: 'online',
        activity: {
            type: 'LISTENING',
            name: `${client.guilds.cache.size} ${getServerLocale(client.guilds.cache.size.toString())} | u!help`
        }
    });
}