const {
    ICONS,
    AchievementCreator
} = require("mc-achievements");

module.exports = {
    enabled: true,
    trigger: "achievement",
    regexp: 'achievement (.*):(.*)',
    description: "Create your own Minecraft achievement.",
    dontShowInHelp: false,
    example: "achievement First Line:Second Line",
    callback: (message, args, hear) => {
        if (args.length < 3) {
            return message.channel.send(`Not enough arguments. Send '${hear.getPrefixForGuild(message.guild.id)}help achievement' to recieve example of use.`);
        } else {
            if (args[1].length > 30 || args[2].length > 30) {
                return message.channel.send(`One or more arguments is too long. Send '${hear.getPrefixForGuild(message.guild.id)}help achievement' to recieve example of use.`);
            } else {
                let url;
                if (message.attachments.size >= 1) {
                    url = message.attachments.first().url || ".";
                }
                message.channel.send('The generation process has started. You will receive the result in a few seconds.').then(msg => {
                    AchievementCreator.create(ICONS.bottleOfEnchanting, args[1], args[2], url)
                        .then(buffer => {
                            msg.delete();
                            return message.channel.send({
                                files: [buffer]
                            });
                        })
                })
            }
        }
    }
}