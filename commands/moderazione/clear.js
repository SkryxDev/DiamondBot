const Discord = require("discord.js")

module.exports = {
    name: "clear",
    description: "Cancellare un numero di messaggi",
    options: [
        {
            name: "quantità",
            description: "La quantità di messaggi da eliminare",
            type: "NUMBER",
            required: true
        }
    ],
    onlyStaff: true,
    async execute(interaction) {
        const number = interaction.options.getNumber("quantità")
        if(number > 100) return interaction.reply({ content: "Non puoi cancellare più di 100 messaggi alla volta", ephemeral: true })

        await interaction.channel.bulkDelete(number, true)

        interaction.reply({ content: `${number} messaggi sono stati cancellati` })
    }
}