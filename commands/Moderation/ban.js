const {
    Permissions
} = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "ban",
    description: "Ban member from guild.",
    permissions: [Permissions.FLAGS.BAN_MEMBERS],
    dontShowInHelp: false,
    regexp: "ban (<@[!-*][a-z0-9]+>)( )?(?<reason>.*)?",
    example: "ban <mention> [reason]",
    guildOnly: true,
    callback: (message, args) => {
        const member = message.mentions.members.first();
        if (member) {
            if (!args['groups']['reason']) args['groups']['reason'] = "No reason provided";
            member
                .ban({ reason: `Reason: ${args['groups']['reason']}. Banned by ${message.author.tag}.` })
                .then(() => {
                    return message.channel.send(`Successfully banned ${member.user.tag}.`);
                })
                .catch(_ => {
                    return message.reply('I was unable to ban this member');
                });
        } else {
            return message.channel.send("You need to mention the member.");
        }
    }
}