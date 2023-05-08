const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('secretping')
    .setDescription('Replies with Pong! (secretly)'),

  async execute(int) {
    await int.reply({
      content: 'Secret Pong!',
      ephemeral: true,
    });
  },
};
