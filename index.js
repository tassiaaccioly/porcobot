import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';

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

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('interactionCreate', async (interaction) => {
    console.log(interaction);
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

bot.login(token);
