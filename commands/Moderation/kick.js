const {
    Permissions
} = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "kick",
    description: "Kick member from guild.",
    permissions: [Permissions.FLAGS.KICK_MEMBERS],
    dontShowInHelp: false,
    regexp: "kick (<@[!-*][a-z0-9]+>)( )?(?<reason>.*)?",
    example: "kick <mention> [reason]",
    guildOnly: true,
    callback: (message, args) => {
        const member = message.mentions.members.first();
        if (member) {
            if (!args['groups']['reason']) args['groups']['reason'] = "No reason provided";
            member
                .kick(`Reason: ${args['groups']['reason']}. Kicked by ${message.author.tag}.`)
                .then(() => {
                    return message.channel.send(`Successfully kicked ${member.user.tag}.`);
                })
                .catch(_ => {
                    return message.reply('I was unable to kick this member');
                });
        } else {
            return message.channel.send("You need to mention the member.");
        }
    }
}