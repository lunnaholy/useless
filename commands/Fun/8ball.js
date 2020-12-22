const { MessageEmbed } = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "8ball",
    description: 'Crystal Ball.',
    example: '8ball Will I eat three hamburgers?',
    dontShowInHelp: false,
    regexp: '8ball (.*)',
    callback: (message, args) => {
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Crystal Ball > " + args[1])
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/9/90/Magic8ball.jpg")
            .setDescription(states[getRandomInt(0, states.length - 1)]);

        return message.channel.send(embed);
    }
}

const states = ["Definitely yes", "Definitely no", "Maybe", "Probably yes", "Probably no", "Rather yes than no", "Rather no than yes", "Rephrase and try again.", "Yes", "No"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}