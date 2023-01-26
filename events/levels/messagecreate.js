const Discord = require("discord.js")
const db = require("../../models/userstats.model")
const channels = require("../../json/channels.json")

module.exports = {
    name: "messageCreate",
    async execute(message) {
        const data = await db.findOne({ userId: message.author.id })
        if(message.author.bot) return
        if(message.channel.type == "dm") return
        if(!data) {
            const newUser = new db({
                userId: message.author.id,
                xp: 0,
                level: 0,
                cooldownXp: 0
            })
            newUser.save()
        }
        if(data.cooldownXp <= 0) {
            db.updateOne({ userId: message.author.id }, {$set: { cooldownXp: 60 }}).catch(function(error) {console.log(error)})
            var xp = Math.floor(Math.random() * (40 - 15 + 1)) + 15;
            db.updateOne({ userId: message.author.id }, {$set: { xp: data.xp + xp}}).catch(function(error) {console.log(error)})
            
            if (data.xp >= calcoloXpNecessario(data.level + 1)) {
                db.updateOne({ userId: message.author.id }, {$set: { level: data.level + 1 }}).catch(function(error) {console.log(error)})

                client.channels.cache.get(channels.main.livelli).send(`${message.author.toString()} hai raggiunto il livello ${data.level + 1}`)
            }
        }
    }   
}
function calcoloXpNecessario(level) {
    let xp = 0
    for (let i = 0; i <= level; i++) {
        xp += 50 * i
        if (i > 15)
            xp += 40 * (i - 15)
    }
    return xp
}