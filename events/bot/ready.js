const Discord = require("discord.js")
const mongoose = require("mongoose")
const db = require("../../models/guild.model")
const img = require("../../json/img.json")

module.exports = {
    name: "ready",
    async execute() {
        mongoose.set("strictQuery", true)
        await mongoose.connect(process.env.MONGODB).then(() => {console.log("Database Connected")})
        console.log(`${client.user?.tag} è online`)
        client.guilds.cache.forEach(guild => {
            client.commands.forEach(command => {
                guild.commands.create(command)
            })
        })
        client.user.setStatus('dnd')
        client.user.setActivity('💎 | MoodDiamond ™', { type: 'WATCHING' })
    }
}