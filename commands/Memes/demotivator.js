const demotivator = require('../../modules/Memes/demotivator');

module.exports = {
    enabled: true,
    trigger: "demotivator",
    description: "Create Your Own Demotivator. Requires attached picture.",
    dontShowInHelp: false,
    example: "demotivator Oh shit:Im sorry",
    regexp: "demotivator (.*):(.*)",
    callback: (message, args) => {
        if (args.length < 3) {
            return message.channel.send(`Not enough arguments. Send '${hear.getPrefixForGuild(message.guild.id)}help demotivator' to recieve example of use.`);
        } else {
            let url;
            if (message.attachments.size >= 1) {
                url = message.attachments.first().url;
            } else {
                return message.channel.send('Attach a picture, please');
            }
            message.channel.send('The generation process has started. You will receive the result in a few seconds.').then(msg => {
                demotivator.generate(args, url)
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