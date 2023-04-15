require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits,
    TextChannel,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
client.commandArray = [];

const functionfolders = fs.readdirSync("./functions");
for (const folder of functionfolders) {
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.login(process.env.BOT_TOKEN);

