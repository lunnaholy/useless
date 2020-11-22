const floor = require('../../modules/Memes/floor');

module.exports = {
    enabled: true,
    trigger: "floor",
    description: "Create Your Own 'Floor Is Lava' Meme",
    dontShowInHelp: false,
    example: "floor Egor's mom",
    regexp: "floor (.*)",
    callback: (message, args) => {
        if (args.length < 2) {
            return message.channel.send(`Not enough arguments. Send '${hear.getPrefixForGuild(message.guild.id)}help floor' to recieve example of use.`);
        } else {
            message.channel.send('The generation process has started. You will receive the result in a few seconds.').then(msg => {
                floor.generate(args[1], message.author.avatarURL({
                        size: 64,
                        format: 'png'
                    }))
                    .then(buffer => {
                        msg.delete();
                        return message.channel.send({
                            files: [buffer]
                        });
                    });
            });
        }
    }
}