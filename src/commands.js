import {SlashCommandBuilder} from "@discordjs/builders";
import posts from "./posts.js";

function newSiteCmd(name, post_data_fn) {
    return {
        data: new SlashCommandBuilder()
            .setName(name)
            .setDescription(`Finds a random image from ${name.replace(
                /\w/, c => c.toUpperCase()
            )}.`),
        async execute(interaction) {
            const post_data = post_data_fn(
                posts[name][Math.floor(Math.random() * posts[name].length)]
            );
            await interaction.reply(`${post_data[0]}\n(from ${post_data[1]})`);
        }
    };
}

const commands = [
    newSiteCmd("safebooru", post => [
        `https://safebooru.org/images/${post.directory}/${post.image}`,
        `https://safebooru.org/index.php?page=post&s=view&id=${post.id}`
    ])
];
export default commands;

