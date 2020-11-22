const fs = require('fs');

module.exports = {
    enabled: true,
    trigger: "reload modules",
    description: 'Reloads modules cache',
    regexp: 'reload modules',
    dontShowInHelp: true,
    callback: (message, _, hear) => {
        if (JSON.parse(fs.readFileSync('./owners.json')).indexOf(message.author.id) == -1) return message.channel.send("Insufficient permissions.");
        hear.reloadModules();
        return message.channel.send(`Reload successful!`);
    }
}