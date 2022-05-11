import {SlashCommandBuilder, SlashCommandStringOption} from "@discordjs/builders";
import posts, {getPosts} from "./posts.js";
import {tagStrToTags, filterToTags} from "./tags.js";

function newSiteCmd(name, post_data_fn) {
    return {
        data: new SlashCommandBuilder()
            .setName(name)
            .setDescription(`Finds a random image from ${name.replace(
                /\w/, (c) => c.toUpperCase()
            )}.`)
            .addStringOption(new SlashCommandStringOption()
                .setName("tags")
                .setDescription("The tags the image will have.")
                .setRequired(false)
            ),
        async execute(interaction) {
            const tag_str = interaction.options.getString("tags");
            let posts_to_use = filterToTags(
                posts[name],
                tagStrToTags(tag_str),
                name
            );
            if (posts_to_use.length === 0) {
                posts_to_use = await getPosts(name, tag_str);
                if (posts_to_use.length === 0) {
                    await interaction.reply("No posts found with those tags.");
                    return;
                }
            }
            const post_data = post_data_fn(
                posts_to_use[Math.floor(Math.random() * posts_to_use.length)]
            );
            await interaction.reply({embeds: [{
                color: 0x9b75ed,
                title: "Here is your image!",
                url: post_data[0],
                image: {
                    url: post_data[1],
                }
            }]});
        }
    };
}

const commands = [
    newSiteCmd("e926", (post) => [
        `https://e926.net/posts/${post.id}`,
        post.file.url
    ]),
    newSiteCmd("safebooru", (post) => [
        `https://safebooru.org/index.php?page=post&s=view&id=${post.id}`,
        `https://safebooru.org/images/${post.directory}/${post.image}`
    ])
];
export default commands;

