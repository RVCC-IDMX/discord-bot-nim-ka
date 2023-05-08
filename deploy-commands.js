const Discord = require('discord.js');

const commands = require('./commands');
const config = require('./config.json');

const rest = new Discord.REST().setToken(config.token);

async function deploy() {
  console.log(`Deploying ${commands.size} slash commands.`);

  const data = await rest.put(
    Discord.Routes.applicationGuildCommands(config.applicationId, config.guildId),
    {
      body: commands.map((command) => command.data.toJSON()),
    },
  );

  console.log(`Deployed ${data.length} slash commands.`);
}

deploy();
