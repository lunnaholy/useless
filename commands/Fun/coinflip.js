const { MessageEmbed } = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "coinflip",
    description: 'Throws a coin for you.',
    example: 'coinflip',
    dontShowInHelp: false,
    callback: (message) => {
        const side = getRandomInt(0, 1);
        const sideString = side ? "Heads" : "Tails";

        const embed = new MessageEmbed()
            .setImage(coinSides[side])
            .setColor("BLUE")
            .setTitle("Coinflip > " + sideString);

        return message.channel.send(embed);
    }
}

const coinSides = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/US_One_Cent_Rev.png/200px-US_One_Cent_Rev.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/US_One_Cent_Obv.png/200px-US_One_Cent_Obv.png',
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}