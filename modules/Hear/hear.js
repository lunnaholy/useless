const fs = require("fs");
const {
    MessageEmbed,
    Permissions
} = require("discord.js");

const permString = JSON.parse(fs.readFileSync("./modules/Hear/permissions.json"));

let cooldownStorage = {};

module.exports = class HearManager {
    constructor() {
        let {
            commands,
            cache,
            unloadQuery
        } = this.loadCommands();
        this.commands = commands;
        this.cache = cache;
        this.unloadQuery = unloadQuery;
    }

    count() {
        return this.commands.length;
    }

    reload() {
        this.unloadQuery.forEach(e => {
            let solvedName = require.resolve(e),
                nodeModule = require.cache[solvedName];
            if (nodeModule) {
                delete require.cache[solvedName];
            }
        });
        let {
            commands,
            cache,
            unloadQuery
        } = this.loadCommands();
        this.commands = commands;
        this.cache = cache;
        this.unloadQuery = unloadQuery;

        console.log(`Reload successful! Now ${this.count()} commands loaded`)
    }

    checkForPermissions(member, permissions) {
        if (member != null) {
            return member.hasPermission(permissions);
        }
    }

    getPermissionString(permission) {
        if (typeof permission.forEach == "function") {
            let perms = [];
            permission.forEach(flag => {
                perms.push(permString[permission]);
            });
            return perms;
        } else {
            return [permString[permission]];
        }
    }

    reloadModules() {
        fs.readdirSync("./modules").map(e1 => {
            const dirStat = fs.lstatSync("./modules/" + e1);
            if (dirStat.isDirectory()) {
                fs.readdirSync("./modules/" + e1).map(e2 => {
                    let solvedName = require.resolve("../../modules/" + e1 + "/" + e2),
                        nodeModule = require.cache[solvedName];
                    if (nodeModule) {
                        delete require.cache[solvedName];
                    }
                });
            } else {
                let solvedName = require.resolve("../../modules/" + e1),
                    nodeModule = require.cache[solvedName];
                if (nodeModule) {
                    delete require.cache[solvedName];
                }
            }
        });
    }

    hear(msg) {
        let hear = msg.content || "";
        if (hear.startsWith(this.getPrefixForGuild(msg))) {
            hear = hear.replace(this.getPrefixForGuild(msg), "");
            let cmd = this.commands.find((e) => {
                let regexp;
                if (e.regexp) {
                    regexp = new RegExp("^" + e.regexp + '$', 'i');
                } else {
                    regexp = new RegExp("^" + e.trigger + '$', 'i');
                }
                if (regexp.exec(hear)) return true;
                //if (hear.startsWith(e.trigger)) return true;
            });
            if (typeof cmd != "undefined") {
                if (cmd.cooldown) {
                    if (checkForCooldown(msg, cmd.trigger, cmd.cooldown)) {
                        return msg.channel.send("Not so fast!");
                    }
                }
                if (cmd.permissions) {
                    if (!this.checkForPermissions(msg.member, cmd.permissions)) {
                        return msg.channel.send("Insufficient permissions.");
                    }
                }
                let args = [];
                if (cmd.regexp) {
                    args = hear.match(cmd.regexp) || [];
                }
                try {
                    return cmd.callback(msg, args, this);
                } catch (e) {
                    const embed = new MessageEmbed()
                        .setColor("RED")
                        .setTitle("Critical Error!")
                        .addField("**Execution error:**", [
                            '```' + e + '```'
                        ]);

                    return msg.channel.send(embed);
                }
            }
        }
    }

    getPrefixForGuild(guildId) {
        if (guildId.guild === null) {
            return "";
        }
        guildId = guildId.guild.id;
        if (fs.existsSync("./temp/prefixes.json")) {
            const prefixes = JSON.parse(fs.readFileSync("./temp/prefixes.json"));
            if (prefixes[guildId]) {
                return prefixes[guildId];
            } else {
                return "u!";
            }
        } else {
            return "u!";
        }
    }

    loadCommands() {
        let commands = [];
        let cache = {};
        let unloadQuery = [];
        cache["Uncategorized"] = [];
        fs.readdirSync("./commands").map(e1 => {
            if (e1.endsWith(".js")) {
                let cmd = require("../../commands/" + e1);
                if (cmd.enabled) {
                    commands.push(cmd);
                    if (cmd.dontShowInHelp) return;
                    let cached = {
                        name: cmd.trigger,
                        description: cmd.description || "No description provided",
                        usage: cmd.example
                    };
                    if(cmd.permissions) {
                        cached.permissions = this.getPermissionString(cmd.permissions);
                    }
                    cache["Uncategorized"].push(cached);
                    unloadQuery.push("../../commands/" + e1);
                    return;
                }
            } else {
                const dirStat = fs.lstatSync("./commands/" + e1);
                if (dirStat.isDirectory()) {
                    if (!fs.existsSync("./commands/" + e1 + "/secret")) cache[e1] = [];
                    fs.readdirSync("./commands/" + e1).map(e2 => {
                        if (e2.endsWith(".js")) {
                            let cmd = require("../../commands/" + e1 + "/" + e2);
                            if (cmd.enabled) {
                                commands.push(cmd);
                                if (cmd.dontShowInHelp || fs.existsSync("./commands/" + e1 + "/secret")) return;
                                let cached = {
                                    name: cmd.trigger,
                                    description: cmd.description || "No description provided",
                                    usage: cmd.example
                                };
                                if(cmd.permissions) {
                                    cached.permissions = this.getPermissionString(cmd.permissions);
                                }
                                cache[e1].push(cached);
                                unloadQuery.push("../../commands/" + e1 + "/" + e2);
                                return;
                            }
                        }
                    });
                }
            }
        });
        return {
            commands,
            cache,
            unloadQuery
        };
    }
}

function checkForCooldown(msg, trigger, cooldown) {
    if (msg.member.hasPermission("ADMINISTRATOR")) return false;
    if (cooldownStorage[msg.author.id]) {
        if (cooldownStorage[msg.author.id][trigger]) {
            if (Date.now() - cooldownStorage[msg.author.id][trigger] < cooldown) {
                return true;
            } else {
                cooldownStorage[msg.author.id][trigger] = Date.now();
                return false;
            }
        } else {
            cooldownStorage[msg.author.id] = {};
            cooldownStorage[msg.author.id][trigger] = Date.now();
            return false;
        }
    } else {
        cooldownStorage[msg.author.id] = {};
        cooldownStorage[msg.author.id][trigger] = Date.now();
        return false;
    }
}