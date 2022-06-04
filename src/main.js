import {Client, Intents} from "discord.js";
import commands from "./commands.js";
import {sites, getPosts} from "./posts.js";

let posts = {};

for (let key in sites) {
    posts[key] = await getPosts(key);
    setInterval(() => posts[key] = getPosts(key), 3600000); // Repeat every hour
}

const client = new Client({
    presence: {
        activities: [{
            name: "images",
            type: "WATCHING",
            url: "https://gitdab.com/elle/hwiya"
        }]
    },
    intents: [Intents.FLAGS.GUILDS]
});

client.once("ready", () => console.log("Connected."));

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand) {
        return;
    }

    const command = commands.find((cmd) => cmd.data.name === interaction.commandName);
    if (!command) {
        return;
    }
    try {
        await command.execute(interaction, posts[interaction.commandName]);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: error.toString(), ephemeral: true});
    }
});

client.login(process.env.DISCORD_TOKEN);

