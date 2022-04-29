import {SlashCommandBuilder} from "@discordjs/builders";
import {REST} from "@discordjs/rest";
import {Routes} from "discord-api-types/v9";
import commands from "../src/commands.js";

if (process.argv.length < 3) {
    throw "Please make your first argument the client ID.";
}

const rest = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);
const route = process.argv.length >= 4 ?
    Routes.applicationGuildCommands(process.argv[2], process.argv[3]) :
    Routes.applicationCommands(process.argv[2]);

rest.put(route, {body: "{}"})
    .then(() => console.log("Successfully cleared commands."))
    .catch(console.error);
rest.put(route, {body: commands.map(command => command.data.toJSON())})
    .then(() => console.log("Successfully registered commands."))
    .catch(console.error);

