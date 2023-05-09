const Discord = require('discord.js');

const commands = new Discord.Collection();

function loadCommand(filename) {
  delete require.cache[require.resolve(filename)];

  const command = require(filename);
  commands.set(command.data.name, command);
}

loadCommand('./commands/ping.js');
loadCommand('./commands/secretping.js');
loadCommand('./commands/echo.js');
loadCommand('./commands/user.js');
loadCommand('./commands/server.js');

module.exports = commands;
