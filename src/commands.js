import {SlashCommandBuilder, SlashCommandStringOption} from "@discordjs/builders";
import {sites, getPosts} from "./posts.js";
import {tagStrToTags, filterToTags} from "./tags.js";

export default Object.keys(sites).map((name) => ({
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
    async execute(interaction, posts) {
        const tag_str = interaction.options.getString("tags");
        let posts_to_use = filterToTags(
            posts,
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
        const post_data = sites[name].getURLs(
            posts_to_use[Math.floor(Math.random() * posts_to_use.length)]
        );
        await interaction.reply({embeds: [{
            color: 0x9b75ed,
            title: "Here is your image!",
            url: post_data.post,
            image: {
                    url: post_data.file,
            }
        }]});
    }
}));

