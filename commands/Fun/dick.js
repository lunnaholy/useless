module.exports = {
    enabled: true,
    trigger: "penislength",
    description: 'A ruler for your little friend.',
    example: 'penislength',
    dontShowInHelp: true,
    callback: (message, args) => {
        return message.channel.send(`<@!${message.author.id}> penis is ${getRandomInt(0, 40) - 10} cm. length.`, { files: ["https://images-na.ssl-images-amazon.com/images/I/815ngCDihDL._AC_SY450_.jpg"] });
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

