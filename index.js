const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
const roll = require('./commands/roll');

const app = express();

const PORT = process.env.PORT || 3000;
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APP_ID;

app.listen(PORT, () => {
    console.log(`Project running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'roll',
        description: 'Rolls a die',
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    console.log(interaction);
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName.match(/roll[0-9]+/)) {
        const dice =
            interaction.commandName.match(/roll(<dice>[0-9]+/).groups.dice;
        const reply = roll(dice);
        await interaction.reply(reply);
    }
});

client.login(token);
