const cats = require("../../modules/Images/cats");

module.exports = {
    enabled: true,
    trigger: "cats",
    description: "Sends you a random cat.",
    dontShowInHelp: false,
    example: "cats",
    callback: (message) => {
        message.reply("please wait a bit").then(msg => {
            cats.getCat()
                .then(url => {
                    msg.delete();
                    return message.channel.send({
                        files: [url]
                    });
                });
        });
    }
}