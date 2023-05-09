const Discord = require('discord.js');

const commands = require('./commands');
const config = require('./config.json');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    /*
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    */
  ],
});

client.once(Discord.Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Discord.Events.InteractionCreate, async (int) => {
  if (int.isChatInputCommand()) {
    const command = commands.get(int.commandName);

    if (command) {
      try {
        await command.execute(int);
      } catch (err) {
        console.error(err);
      }
    }
  }
});

client.login(config.token);
