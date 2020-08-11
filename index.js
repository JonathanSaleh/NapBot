require('dotenv').config();

const Discord = require('discord.js');
const NapManager = require('./NapManager');
const botCommands = require('./commands');

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.commands = new Discord.Collection();

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});


bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
	const args = msg.content.split(/ +/);
	if (args[0] !== '/nap') {
		return;
	}  else {
		args.shift(); // Pop /nap off the top, and use the first arg as the command
	}

	const command = args.shift();
  
	if (!bot.commands.has(command)) {
		return;
	}

	try {
		bot.commands.get(command).execute(msg, args, NapManager);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

bot.login(TOKEN);
