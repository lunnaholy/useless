const leet = require("leet");

module.exports = {
    enabled: true,
    trigger: "leet",
    description: 'makes you an elite',
    regexp: 'leet (.*)',
    dontShowInHelp: false,
    example: 'leet Hello World, im a elite!',
    callback: (message, args, hear) => {
        if(args.length < 2){
            return message.channel.send(`Incorrect use of the command! Enter ${hear.getPrefixForGuild(message.guild.id)}help leet for examples.`)
        }
        return message.channel.send(leet.convert(args[1]));
    }
}