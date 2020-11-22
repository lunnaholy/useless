module.exports = {
    enabled: true,
    trigger: "invite",
    description: 'Gives you my invite link for an invitation to the Guild.',
    regexp: 'invite',
    dontShowInHelp: false,
    callback: (message) => {
        const clientId = message.client.user.id;
        const scopes = 470285431;
        return message.channel.send("Took that: " + `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${scopes}&scope=bot`);
    }
}