module.exports = {
    enabled: true,
    trigger: "ahshit",
    description: 'Here we go again.',
    example: 'ahshit',
    dontShowInHelp: false,
    callback: (message) => {
        return message.channel.send({ files: ["https://media1.tenor.com/images/0c15616631fcda816db577c5a2414bcb/tenor.gif?itemid=19209462"] });
    }
}