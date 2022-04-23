import {SlashCommandBuilder} from "@discordjs/builders";
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";

if (process.argv.length < 3) {
    throw "Please make your first argument the client ID.";
}

const commands = [
    new SlashCommandBuilder().setName("safebooru")
        .setDescription("Finds a random image from Safebooru."),
    // TODO: add more of these, filtering by tags, etc
].map(command => command.toJSON());

const rest = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);
const route = process.argv.length >= 4 ?
    Routes.applicationGuildCommands(process.argv[2], process.argv[3]) :
    Routes.applicationCommands(process.argv[2]);

rest.put(route, {body: commands});

