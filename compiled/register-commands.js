"use strict";
var REST = require("@discordjs/rest").REST;
var Routes = require("discord-api-types/v9").Routes;
var _a = require("./config.json"), clientId = _a.clientId, guildId = _a.guildId, token = _a.token;
var fs = require("fs");
var commands = [];
var commandFiles = fs
    .readdirSync("./commands")
    .filter(function (file) { return file.endsWith(".ts"); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var command = require("./commands/" + file);
    commands.push(command.data.toJSON());
}
var rest = new REST({ version: "9" }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(function () { return console.log("Successfully registered application commands."); })
    .catch(console.error);
