const {
    MessageEmbed
} = require('discord.js');
const fs = require('fs');

module.exports = {
    enabled: true,
    trigger: "eval",
    regexp: 'eval (.*)',
    description: 'This command is able to execute JS code. And that is all.',
    example: "eval 'hello'.toUpperCase()",
    dontShowInHelp: true,
    callback: (message, args, hear) => {
        if (JSON.parse(fs.readFileSync('./owners.json')).indexOf(message.author.id) == -1) return message.channel.send("Insufficient permissions.");
        new Promise((res, rej) => {
                try {
                    res(eval(args[1]));
                } catch (e) {
                    rej(e);
                }
            }).then(res => {
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Execution > Successfully!")
                    .addField("**Your code:**", [
                        '```js\n' + args[1] + '```'
                    ])
                    .addField("**Execution result:**", [
                        '```' + res + '```'
                    ])
                return message.channel.send(embed);
            })
            .catch(e => {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Execution > Failed!")
                    .addField("**Your code:**", [
                        '```js\n' + args[1] + '```'
                    ])
                    .addField("**Execution error:**", [
                        '```' + e + '```'
                    ])
                return message.channel.send(embed);
            });
    }
}