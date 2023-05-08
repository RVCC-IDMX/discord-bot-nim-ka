const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.'),

  async execute(int) {
    await int.reply(`This server is ${int.guild.name} and has ${int.guild.memberCount} members.`);
  },
};
