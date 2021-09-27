import Discord, { Intents } from "discord.js";
import { token } from "./config.json";

const client: Discord.Client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.once("ready", () => {
  console.log("Bot is ready to rumble");
});

client.login(token);
