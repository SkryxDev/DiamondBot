global.Discord = require("discord.js")
global.mongoose = require("mongoose")
global.dotenv = require("dotenv")
global.fs = require("fs")
global.roles = require("./json/roles.json")
global.channels = require("./json/channels.json")
global.client = new Discord.Client({
    intents: 32767,
    partials: ["CHANNEL", "MESSAGE", "REACTION"]
})
require('events').EventEmitter.prototype._maxListeners = 100;

try{
    require("dotenv").config()
} catch {

}

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
global.distube = new DisTube(client, {
    youtubeDL: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnStop: true
})
const fs = require("fs")

client.commands = new Discord.Collection()

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventsFolder = fs.readdirSync("./events")
for (const folder of eventsFolder) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of eventsFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.on(event.name, (...args) => event.execute(...args))
    }
}
client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    if (command.onlyStaff) {
        if (!interaction.member.roles.cache.has(roles.staff.staff)) {
            interaction.reply({ content: "Non hai il permesso di eseguire questo comando!", ephemeral: true })
            return
        }
    }
    if (command.onlyOwner) {
        if (!interaction.member.permissions.cache.has("ADMINISTRATOR")) {
            interaction.reply({ content: "Non hai il permesso di eseguire questo comando!", ephemeral: true })
            return
        }
    }
    command.execute(interaction)
})

setInterval(async function () {
    const db = require("./models/userstats.model")
    const data = await db.find()
    data.forEach(user => {
        if(user.cooldownXp > 0) {
            db.updateOne({ userId: user.userId }, {$set: { cooldownXp: user.cooldownXp - 5 }}).catch(function(error) {console.log(error)})
        }
    })

    
}, 5000)
setInterval(async function () {
    const db = require("./models/moderation.model")
    const data = await db.find()
    data.forEach(async user => {
        if(user.time > 0) {
            db.updateOne({ userId: user.userId }, {$set: { time: user.time - 5 }}).catch(function(error) {console.log(error)})
        }
        if(user.time <= 0) {
            let server = client.guilds.cache.get("1047562290528002119")
                await server.members.unban(user.userId).catch(function(error) {console.log(error)})
            db.deleteOne({ userId: user.userId })
        }
    })

    
}, 5000)

process.on("uncaughtException", err => {
    console.log(err)
})

process.on("unhandledRejection", err => {
    console.log(err)
})

client.login(process.env.TOKEN)