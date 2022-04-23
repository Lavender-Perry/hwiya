import {SlashCommandBuilder} from "@discordjs/builders";

const commands = [
    {
        data: new SlashCommandBuilder().setName("safebooru")
            .setDescription("Finds a random image from Safebooru."),
        async execute(interaction) {
            // TODO: actually finish this
            await interaction.reply("Not done yet, sorry.");
        }
    }
];
export default commands;

