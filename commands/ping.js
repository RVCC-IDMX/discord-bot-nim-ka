const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  async execute(int) {
    await int.reply('Pong!');
  },
};
