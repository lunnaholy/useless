const dogs = require("../../modules/Images/dogs");

module.exports = {
    enabled: true,
    trigger: "dogs",
    description: "Sends you a random dog.",
    dontShowInHelp: false,
    example: "dog",
    callback: (message) => {
        message.reply("please wait a bit").then(msg => {
            dogs.getDog()
                .then(url => {
                    msg.delete();
                    return message.channel.send({
                        files: [url]
                    });
                });
        });
    }
}