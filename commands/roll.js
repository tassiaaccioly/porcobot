const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice'),
    async execute(interaction) {
        const roll = (dice) => {
            return Math.floor(Math.random() * Number(dice)) + 1;
        };
        await interaction.reply(roll);
    },
};

// Math.floor(Math.random() * (max - min + 1) + min)
