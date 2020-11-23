const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    enabled: true,
    trigger: "help",
    description: "Brief help on all bot commands.",
    regexp: 'help(.*)',
    example: "help",
    dontShowInHelp: true,
    callback: (message, args, hear) => {
        const embed = new MessageEmbed()
            .setTitle("Useless > Help")
            .setColor("BLUE");
        let cache = hear.cache;
        let prefix = hear.getPrefixForGuild(message);
        args = args[1].split(" ");
        if (args.length == 1) {
            embed.setDescription(`You can get help for any available command by sending **${prefix}help <command>**`)
            for (const [cat, cmds] of Object.entries(hear.cache)) {
                let localmd = [];
                cmds.forEach(cmd => {
                    localmd.push('`' + cmd.name + '`');
                });
                if (localmd.length > 0) {
                    embed.addField(`> **${cat}**`, [
                        `${localmd.join(", ")}`
                    ]);
                }
            }
        } else if (args.length == 2) {
            let cmd, category;
            for (const [cat, cmds] of Object.entries(hear.cache)) {
                cmds.forEach(e => {
                    if (e.name == args[1]) {
                        cmd = e;
                        category = cat;
                    }
                });
            }
            if (typeof cmd != "undefined") {
                if(!cmd.permissions){
                    embed.addField(`> **${cmd.name}**`, [
                        `**Description:** ${cmd.description}`,
                        `**Usage:** ${prefix}${cmd.usage}`,
                        `**Category:** ${category}`
                    ]);
                } else {
                    embed.addField(`> **${cmd.name}**`, [
                        `**Description:** ${cmd.description}`,
                        `**Usage:** ${prefix}${cmd.usage}`,
                        `**Category:** ${category}`,
                        `**Permissions:** ${cmd.permissions.join(", ")}`
                    ]);
                }
            } else {
                embed.addField(`> **${args[1]}**`, [
                    `Command ${args[1]} don't found.`
                ]);
            }
        }
        //message.channel.send('I sent you help on commands in DM.');
        return message.channel.send(embed);
    }
}