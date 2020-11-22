const fs = require("fs");

module.exports = {
    enabled: true,
    trigger: "prefix",
    regexp: 'prefix (.*)',
    description: 'Overrides the global prefix for your guild.',
    example: 'prefix u!',
    callback: async (message, args, hear) => {
        if(message.member.hasPermission("ADMINISTRATOR")){
            if(args.length < 2){
                return message.channel.send(`Incorrect use of the command! Enter ${hear.getPrefixForGuild(message.guild.id)}help prefix for examples.`);
            }
            if(fs.existsSync("./temp/prefixes.json")){
                const prefixes = JSON.stringify(fs.readFileSync("./temp/prefixes.json"));
                prefixes[message.guild.id] = args[1];
                fs.writeFileSync("./temp/prefixes.json", JSON.stringify(prefixes, null, "\n"));
            } else {
                const prefixes = {};
                prefixes[message.guild.id] = args[1];
                fs.writeFileSync("./temp/prefixes.json", JSON.stringify(prefixes, null, "\n"));
            }
            message.channel.send("Successfully!");
        } else {
            return message.channel.send("Insufficient permissions. Only guild admin can do that.");
        }
    }
}