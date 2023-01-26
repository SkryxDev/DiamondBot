module.exports = {
    name: "play",
    description: "Aggiungere alla queue una musica",
    options: [
        {
            name: "canzone",
            description: "Canzone da aggiungere",
            type: "STRING",
            required: true
        }
    ],
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({content: "Devi essere in un canale vocale", ephemeral: true})
        }

        const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return interaction.reply({content: "Qualun'altro sta già ascoltando della musica", ephemeral: true})
        }

        let query = interaction.options.getString("canzone")

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: interaction.member,
            textChannel: interaction.channel
        })
        interaction.reply({ content: "Loading...", ephemeral: true })
    }
}

distube.on("addSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Canzone aggiunta")
        .addField("Canzone", song.name)
        .setColor("BLURPLE")

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("playSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Riproducendo...")
        .addField("Canzone", song.name)
        .addField("Richiesta da", song.user.toString())
        .setColor("BLURPLE")

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("searchNoResult", (message, query) => {
    message.channel.send({content: "Canzone non trovata"})
})