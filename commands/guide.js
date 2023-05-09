const Discord = require('discord.js');

async function sendChoices(int, content, buttons) {
  const row = new Discord.ActionRowBuilder()
    .addComponents(...buttons.map((e) => (e.id ? e.button.setCustomId(e.id) : e.button)));

  const resp = await int.reply({
    content,
    components: [row],
  });

  for (const { id, callback } of buttons) {
    if (callback) {
      resp.awaitMessageComponent({
        filter: (int2) => int.user.id === int2.user.id
          && int2.component.customId === id,
        time: 60000,
      }).then(callback);
    }
  }
}

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('guide')
    .setDescription('Guide the user through a series of choices'),

  async execute(int) {
    const linkBtn = new Discord.ButtonBuilder()
      .setLabel('GitHub')
      .setURL('https://github.com/RVCC-IDMX/discord-bot-nim-ka')
      .setStyle(Discord.ButtonStyle.Link);

    const fail = (int2) => int2.reply('Oops! You chose the wrong one. Better luck next time.');

    sendChoices(int, 'Choose the first button...', [
      {
        id: 'btn1',
        button: new Discord.ButtonBuilder()
          .setLabel('First')
          .setStyle(Discord.ButtonStyle.Primary),
        callback: (int2) => {
          sendChoices(int2, 'Now choose the third button...', [
            {
              id: 'btn3',
              button: new Discord.ButtonBuilder()
                .setLabel('A')
                .setStyle(Discord.ButtonStyle.Secondary),
              callback: fail,
            },
            {
              id: 'btn4',
              button: new Discord.ButtonBuilder()
                .setLabel('B')
                .setStyle(Discord.ButtonStyle.Secondary),
              callback: fail,
            },
            {
              id: 'btn5',
              button: new Discord.ButtonBuilder()
                .setLabel('C')
                .setStyle(Discord.ButtonStyle.Primary),
              callback: (int3) => {
                sendChoices(int3, 'And finally the last button!', [
                  {
                    id: 'btn7',
                    button: new Discord.ButtonBuilder()
                      .setLabel('Last')
                      .setStyle(Discord.ButtonStyle.Primary),
                    callback: fail,
                  },
                  {
                    id: 'btn8',
                    button: new Discord.ButtonBuilder()
                      .setLabel('Penultimate')
                      .setStyle(Discord.ButtonStyle.Primary),
                    callback: fail,
                  },
                  {
                    id: 'btn9',
                    button: new Discord.ButtonBuilder()
                      .setLabel('Antepenultimate')
                      .setStyle(Discord.ButtonStyle.Primary),
                    callback: (int4) => int4.reply('You win!'),
                  },
                  { button: linkBtn },
                ]);
              },
            },
            {
              id: 'btn6',
              button: new Discord.ButtonBuilder()
                .setLabel('D')
                .setStyle(Discord.ButtonStyle.Secondary),
              callback: fail,
            },
            { button: linkBtn },
          ]);
        },
      },
      {
        id: 'btn2',
        button: new Discord.ButtonBuilder()
          .setLabel('Second')
          .setStyle(Discord.ButtonStyle.Secondary),
        callback: fail,
      },
      { button: linkBtn },
    ]);
  },
};
