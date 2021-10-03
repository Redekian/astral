import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    async execute(interaction: any) {
        const embed1 = new MessageEmbed()
            .setTitle("Pong!")
            .setDescription("Calculating ping...")
            .setThumbnail(
                "https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
            )
            .setColor("#4c175a");
        const embed2 = new MessageEmbed()
            .setTitle("Pong!")
            .setDescription(`Client ping is ${interaction.client.ws.ping}ms`)
            .setColor("#4c175a")
            .setFooter(
                "Bot developed by Redekian",
                "https://i.imgur.com/Gjz3F7P.jpg"
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed1] }).then(() => {
            interaction.editReply({ embeds: [embed2] });
        });
    },
};
