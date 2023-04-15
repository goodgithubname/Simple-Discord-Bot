const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                if ('data' in command && 'execute' in command) {
                    commands.set(command.data.name, command);
                    commandArray.push(command.data.toJSON());
                    console.log(commandArray);
                    console.log(
                        `Command: ${command.data.name} has been passed through the handler`
                    );
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }

        //const guildId = '225175071277187073';
        const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
        try {
            console.log("Started refreshing application (/) commands.");
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: client.commandArray
            });
            console.log("sucessfully reloaded application (/) commands.");
        } catch (error) {
            console.error(error);
        }
    }
}