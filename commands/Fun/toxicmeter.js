module.exports = {
    enabled: true,
    trigger: "toxicmeter",
    description: 'Determines the degree of toxicity of the Guild.',
    example: 'toxicmeter',
    dontShowInHelp: false,
    callback: (message, args) => {
        return message.channel.send(`The guild is ${getRandomInt(0, 1000)}% toxic.`, { files: ["https://cdn3.nbrii.com/wp-content/uploads/2014/06/bigstock-Toxic-Sign-79381810.jpg"]});
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}