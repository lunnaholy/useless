const Spotify = require("../../modules/Images/spotify");

module.exports = {
    enabled: true,
    trigger: "spotify",
    description: "Generates a pretty-sexy with your current Spotify track.",
    dontShowInHelp: false,
    example: "spotify",
    callback: (message) => {
        if(message.author.presence.activities.length > 0){
            let spotify;
            message.author.presence.activities.forEach(activity => {
                if(activity.name == "Spotify"){
                    spotify = activity;
                }
            });

            if(!spotify){
                return message.author.send("Can't find Spotify Presence. Check your Spotify integration.");
            }

            message.reply("please wait a bit").then(msg => {
                Spotify.generate(spotify.syncID, spotify.state.replace("; ", ", "), spotify.details)
                    .then(buffer => {
                        msg.delete();
                        return message.channel.send({ files: [buffer] });
                    });
            });
        } else {
            return message.author.send("Can't find Spotify Presence. Check your Spotify integration.");
        }
    }
}