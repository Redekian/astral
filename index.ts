import Discord, { Client, Intents, Collection } from "discord.js";
import { token } from "./config.json";
import fs from "fs";

const client: Client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

declare module "discord.js" {
    interface Client {
        commands: any;
    }
}

client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Command ${file} loaded.`);
}

client.once("ready", () => {
    console.log("Bot is ready");
    client.user?.setActivity("the stars", { type: "WATCHING" });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
        console.log(
            // @ts-expect-error
            `${interaction.member?.user.username} used ${interaction.commandName} in #${interaction.channel.name}`
        );
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        });
    }
});

client.login(token);
