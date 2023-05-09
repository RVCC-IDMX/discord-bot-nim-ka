const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption((option) => option
      .setName('input')
      .setDescription('The input to echo back')
      .setRequired(true)
      .setMaxLength(25)),

  async execute(int) {
    await int.reply(int.options.getString('input'));
  },
};
