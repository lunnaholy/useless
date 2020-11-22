const fs = require('fs');

module.exports = {
    enabled: true,
    trigger: "reload commands",
    description: 'Reloads commands cache',
    dontShowInHelp: true,
    callback: (message, _, hear) => {
        if (JSON.parse(fs.readFileSync('./owners.json')).indexOf(message.author.id) == -1) return message.channel.send("Insufficient permissions.");
        hear.reload();
        return message.channel.send(`Reload successful! Now ${hear.count()} commands loaded`);
    }
}