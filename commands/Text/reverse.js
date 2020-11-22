module.exports = {
    enabled: true,
    trigger: "reverse",
    description: 'reverses your text',
    regexp: 'reverse (.*)',
    dontShowInHelp: false,
    example: 'reverse Some text',
    callback: (message, args, hear) => {
        if(args.length < 2){
            return message.channel.send(`Incorrect use of the command! Enter ${hear.getPrefixForGuild(message.guild.id)}help reverse for examples.`)
        }
        return message.channel.send(args[1].split("").reverse().join(""));
    }
}