module.exports = {
    enabled: true,
    trigger: "ping",
    description: "With this command you can get the latency time from the bot host to the API Discord.",
    dontShowInHelp: false,
    example: "ping",
    callback: (message) => {
        return message.channel.send(`API Latency is ${Math.round(message.client.ws.ping)} ms.`);
    }
}