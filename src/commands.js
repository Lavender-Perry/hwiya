import {SlashCommandBuilder, SlashCommandStringOption} from "@discordjs/builders";
import {sites, getPosts} from "./posts.js";
import filterToTags from "./tags.js";

async function post_random(posts, site, interaction) {
    const post_data = sites[site].getURLs(
        posts[Math.floor(Math.random() * posts.length)]
    );
    await interaction.reply({embeds: [{
        color: 0x9b75ed,
        title: "Here is your image!",
        url: post_data.post,
        image: {url: post_data.file}
    }]});
}

const tag_option = new SlashCommandStringOption()
    .setName("tags")
    .setDescription("The tags the image will have.")
    .setRequired(false)

const site_commands = Object.keys(sites).map((name) => ({
    data: new SlashCommandBuilder()
        .setName(name)
        .setDescription(`Finds a random image from ${name.replace(
            /\w/, (c) => c.toUpperCase()
        )}.`)
        .addStringOption(tag_option),
    async execute(interaction, posts) {
        const tag_str = interaction.options.getString("tags");
        let posts_to_use = filterToTags(posts, tag_str, name);
        if (posts_to_use.length === 0) {
            posts_to_use = await getPosts(name, tag_str);
            if (posts_to_use.length === 0) {
                await interaction.reply("No posts found with those tags.");
                return;
            }
        }
        post_random(posts_to_use, name, interaction);
    }
}));

export default site_commands.concat({
    data: new SlashCommandBuilder()
        .setName("all")
        .setDescription("Finds a random image from all sites.")
        .addStringOption(tag_option),
    async execute(interaction, posts) {
        const tag_str = interaction.options.getString("tags");
        let posts_to_use = {};
        for (let [key, value] of Object.entries(posts)) {
            const filtered_posts = filterToTags(value, tag_str, key);
            if (filtered_posts.length !== 0) {
                posts_to_use[key] = filtered_posts;
            }
        }
        if (posts_to_use === {}) {
            for (let key of Object.keys(sites)) {
                let filtered_posts = await getPosts(key, tag_str);
                if (filtered_posts.length !== 0) {
                    posts_to_use[key] = filtered_posts;
                }
            }
            if (posts_to_use === {}) {
                await interaction.reply("No posts found with those tags.");
                return;
            }
        }

        const sites_to_use = Object.keys(posts_to_use);
        const site = sites_to_use[Math.floor(Math.random() * sites_to_use.length)];
        await post_random(posts_to_use[site], site, interaction);
    }
});

