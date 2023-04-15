const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wen")
        .setDescription("Give times X hours/minutes from now")
        .addIntegerOption(option =>
            option.setName('hours')
                .setDescription("How many hours from now")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription("How many minutes from now")
                .setRequired(false)
        ),
    async execute(interaction, client) {
        console.log("Sending datetime!");

        const hh = interaction.options.get('hours').value;
        const mm = interaction.options.get('minutes')?.value;

        const date = new Date()

        console.log(hh);
        console.log(mm);

        date.setTime(date.getTime() + hh * 60 * 60 * 1000);

        if (mm) {
            date.setTime(date.getTime() + mm * 60 * 1000);
        }
        console.log(date);
        await interaction.reply(`<t:${(date.getTime() - date.getMilliseconds()) / 1000}>`)
    },
};
