import {Client, Intents} from "discord.js";
import commands from "./commands.js";

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.once("ready", () => {
    console.log("Connected.");
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand) {
        return;
    }

    const command = commands.find(command => {
        command.data.name === interaction.commandName
    });
    if (!command) {
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: error.toString(), ephemeral: true});
    }
});

client.login(process.env.DISCORD_TOKEN);

