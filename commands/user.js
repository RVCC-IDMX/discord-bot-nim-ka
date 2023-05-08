const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),

  async execute(int) {
    await int.reply(`This command was run by ${int.user.username}, who joined on ${int.member.joinedAt}.`);
  },
};
