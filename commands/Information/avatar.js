const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "avatar",
    description: "Returns the user's current avatar.",
    dontShowInHelp: false,
    regexp: "avatar( )?(<@[!-*][a-z0-9]+>)?",
    example: "avatar [mention]",
    guildOnly: true,
    callback: (message) => {
        if (message.mentions.users.size) {
            let member = message.mentions.users.first();
            return message.channel.send(new MessageEmbed().setImage(member.displayAvatarURL({
                dynamic: true,
                size: 512
            })).setTitle(member.username).setColor("BLUE"));
        } else {
            return message.channel.send(new MessageEmbed().setImage(message.author.displayAvatarURL({
                dynamic: true,
                size: 512
            })).setTitle(message.author.username).setColor("BLUE"));
        }
    }
}