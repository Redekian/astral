import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Tells you some info about the server"),

    async execute(interaction: any) {
        const getBoostLevel = () => {
            const level = interaction.guild.premiumTier;
            if (level == "NONE") {
                return 0;
            }
            return level;
        };

        const getRoles = (): string[] => {
            const allRoles: string[] = [];
            interaction.guild.roles.cache.map((role: any) => {
                allRoles.push(role.name);
            });
            return allRoles;
        };

        const embed = new MessageEmbed()
            .setColor("#4c175a")
            .setTitle("Server Info:")
            .setThumbnail(interaction.guild.iconURL())
            .setFooter(
                "Bot developed by Redekian",
                "https://i.imgur.com/Gjz3F7P.jpg"
            )
            .setTimestamp()
            .addFields(
                {
                    name: "Server Owner:",
                    value: `<:owner:892760489615056906> <@${interaction.guild.ownerId}>`,
                    inline: true,
                },
                {
                    name: "Member Count:",
                    value: `${interaction.guild.memberCount}`,
                    inline: true,
                },
                {
                    name: "Boost Count:",
                    value: `<:boost:892762763166883860>${
                        interaction.guild.premiumSubscriptionCount
                    } (Level ${getBoostLevel()})`,
                    inline: true,
                },
                {
                    name: "Role Count:",
                    value: `${getRoles().length - 1}`,
                    inline: true,
                },
                {
                    name: "Server ID:",
                    value: `${interaction.guild.id}`,
                    inline: true,
                }
            );

        interaction.reply({
            embeds: [embed],
        });
    },
};
