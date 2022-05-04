import {SlashCommandBuilder, SlashCommandStringOption} from "@discordjs/builders";
import posts from "./posts.js";
import {tagStrToTags, filterToTags} from "./tags.js";

function newSiteCmd(name, post_data_fn) {
    return {
        data: new SlashCommandBuilder()
            .setName(name)
            .setDescription(`Finds a random image from ${name.replace(
                /\w/, c => c.toUpperCase()
            )}.`)
            .addStringOption(new SlashCommandStringOption()
                .setName("tags")
                .setDescription("The tags the image will have.")
                .setRequired(false)
            ),
        async execute(interaction) {
            const posts_to_use = filterToTags(
                posts[name],
                tagStrToTags(interaction.options.getString("tags")),
                name
            );
            if (posts_to_use.length === 0) {
                await interaction.reply("No posts found with those tags.");
                return;
            }
            const post_data = post_data_fn(
                posts_to_use[Math.floor(Math.random() * posts_to_use.length)]
            );
            await interaction.reply(`${post_data[0]}\n(from ${post_data[1]})`);
        }
    };
}

const commands = [
    newSiteCmd("e926", post => [
        post.file.url,
        `https://e926.net/posts/${post.id}`
    ]),
    newSiteCmd("safebooru", post => [
        `https://safebooru.org/images/${post.directory}/${post.image}`,
        `https://safebooru.org/index.php?page=post&s=view&id=${post.id}`
    ])
];
export default commands;

