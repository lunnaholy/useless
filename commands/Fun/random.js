module.exports = {
    enabled: true,
    trigger: "random",
    description: 'Chooses one of countless things.',
    example: 'random Item 1;Item 2;Item 3...',
    regexp: 'random (.*)+',
    dontShowInHelp: false,
    callback: (message, args) => {
        if(args[1]){
            let items = args[1].split(";") || [args[1]];
            let item = items[getRandomInt(0, items.length - 1)];

            return message.channel.send(`I choose ${item}`, { files: ["https://ic.pics.livejournal.com/trance_se/13326498/58374/58374_600.jpg"] });
        } else {
            console.log(args);
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}