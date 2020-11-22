const waifu = require("../../modules/Images/waifu");

module.exports = {
    enabled: true,
    trigger: "waifu",
    description: "Sends you a random waifu.",
    dontShowInHelp: false,
    example: "waifu",
    callback: (message) => {
        message.reply("please wait a bit").then(msg => {
            waifu.getWaifu()
                .then(url => {
                    msg.delete();
                    return message.channel.send({
                        files: [url]
                    });
                });
        });
    }
}