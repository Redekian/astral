import Discord, { Intents } from "discord.js";
import { token } from "./config.json";

const client: Discord.Client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("Bot is ready");
});

client.on("messageCreate", (message) => {
  if (message.content == "!ping") {
    message.reply({
      content: "Pong!",
    });
  }
});

client.login(token);
