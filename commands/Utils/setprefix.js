const {
    Permissions
} = require("discord.js");
const fs = require("fs");

module.exports = {
    enabled: true,
    trigger: "prefix",
    regexp: 'prefix (.*)',
    description: 'Overrides the global prefix for your guild.',
    example: 'prefix u!',
    guildOnly: true,
    permissions: [Permissions.FLAGS.MANAGE_GUILD],
    callback: (message, args, hear) => {
        if (args.length < 2) {
            return message.channel.send(`Incorrect use of the command! Enter ${hear.getPrefixForGuild(message.guild.id)}help prefix for examples.`);
        }
        if (fs.existsSync("./temp/prefixes.json")) {
            const prefixes = JSON.parse(fs.readFileSync("./temp/prefixes.json"));
            prefixes[message.guild.id] = args[1];
            fs.writeFileSync("./temp/prefixes.json", JSON.stringify(prefixes, null, "\t"));
        } else {
            const prefixes = {};
            prefixes[message.guild.id] = args[1];
            fs.writeFileSync("./temp/prefixes.json", JSON.stringify(prefixes, null, "\t"));
        }
        return message.channel.send("Successfully!");
    }
}