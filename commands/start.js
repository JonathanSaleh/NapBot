const messaging = require('../utils/messaging');

module.exports = {
	name: 'start',
	description: 'Start your nap. Enjoy!',
	execute(msg, args, NapManager) {
		const userId = msg.author.id;
		const arg = args[0];
		const minutes = arg && Number(arg);
		NapManager.startNap(userId);
		if (minutes) {
			const miliseconds = minutes * 60000;
			setTimeout(() => {
				const minutesNapped = NapManager.endNap(userId);
				const hoursAndMinutes = messaging.minutesToTime(minutesNapped);
				if (minutesNapped) {
					msg.reply(`Time to wake up! Your nap is over. You slept for ${hoursAndMinutes}.`);
				}
			}, miliseconds);
			msg.reply(`Nap started. You will get a notification in ${minutes} minutes, or end the nap early with \`/nap end\``);
		} else {
			msg.reply('Nap started. Use `/nap end` when you\'re finished  Enjoy!');
		}
	},
};