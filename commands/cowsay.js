const Discord = require('discord.js');
const cowsay = require('cowsay');

let cowNames;

cowsay.list((err, names) => {
  cowNames = names;
});

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Moooooooooooo')
    .addStringOption((option) => option
      .setName('input')
      .setDescription('The text to moo')
      .setRequired(true)
      .setMaxLength(64))
    .addStringOption((option) => option
      .setName('cow')
      .setDescription('The name of the animal to summon')
      .setRequired(true)
      .setMaxLength(64)),

  async execute(int) {
    const input = int.options.getString('input');
    const cowName = int.options.getString('cow');

    if (!cowNames.includes(cowName)) {
      await int.reply({
        content: `No cow named ${cowName} found.`,
        ephemeral: true,
      });
      return;
    }

    const content = `\`\`\`\n${cowsay.say({
      text: input,
      f: cowName,
    }).replaceAll('`', '`\u200b')}\`\`\``;

    if (content.length > 2000) {
      await int.reply({
        content: 'Maximum message length exceeded.',
        ephemeral: true,
      });
      return;
    }

    await int.reply(content);
  },
};
