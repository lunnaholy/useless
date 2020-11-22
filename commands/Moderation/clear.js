const { Permissions } = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "clear",
    description: "Bulk removes messages from the channel.",
    permissions: [Permissions.FLAGS.MANAGE_MESSAGES],
    dontShowInHelp: false,
    regexp: "clear ([0-9]+)",
    example: "clear",
    callback: (message, args) => {
        const amount = args[1];
        if(isNaN(amount)) return message.channel.send(args[1] + " is not a number!");
        if(amount > 100 || amount < 1) return message.channel.send(args[1] + " (amount) should be between 0 and 100!");

        message.channel.messages.fetch({
            limit: amount
        }).then(messages => {
            return message.channel.bulkDelete(messages);
        });
    }
}