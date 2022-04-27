import {SlashCommandBuilder} from "@discordjs/builders";
import posts from "./posts.js";

const commands = [
    {
        data: new SlashCommandBuilder().setName("safebooru")
            .setDescription("Finds a random image from Safebooru."),
        async execute(interaction) {
            const post = posts.safebooru[
                Math.floor(Math.random() * posts.safebooru.length)
            ];
            // TODO: actual embed
            await interaction.reply(
                `https://safebooru.org/images/${post.directory}/${post.image}
                \n(from https://safebooru.org/index.php?page=post&s=view&id=${post.id}` 
            );
        }
    }
];
export default commands;

