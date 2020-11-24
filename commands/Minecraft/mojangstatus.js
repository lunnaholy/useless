const mojang = require("mojang");

module.exports = {
    enabled: true,
    trigger: "mojangstatus",
    description: 'Obtaining API Mojang status.',
    example: 'mojangstatus',
    dontShowInHelp: false,
    callback: (message) => {
        mojang.status()
            .then(status => {
                let table = "";
                status.forEach(status => {
                    table += (`\nNode: \`${status.hostname}\` | Status: ${getSmileByColor(status.color)} | Is Available: ${getSmileByColor(status.isAvailable)} | Has Issues: ${getSmileByColor(status.hasIssues)}`);
                });
                return message.channel.send(table);
            })
            .catch(err => {
                throw err;
            });
    }
}

function getSmileByColor(color){
    let s = {"green":":green_circle:","yellow":":yellow_circle:","red":":red_circle:","false":":x:","true":":white_check_mark:"};
    return s[color];
}