import {SlashCommandBuilder} from "@discordjs/builders";
import posts from "./posts.js";

const commands = [
    {
        data: new SlashCommandBuilder().setName("safebooru")
            .setDescription("Finds a random image from Safebooru."),
        async execute(interaction) {
            // TODO: actually finish this
            console.log(posts["safebooru"]); // DEBUG
            await interaction.reply("Not done yet, sorry.");
        }
    }
];
export default commands;

