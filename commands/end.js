const messaging = require('../utils/messaging');

module.exports = {
	name: 'end',
	description: 'End your nap',
	execute(msg, args, NapManager) {
		const userId = msg.author.id;
		const minutesNapped = NapManager.endNap(userId);
		if (typeof minutesNapped === "number") {
			const hoursAndMinutes = messaging.minutesToTime(minutesNapped);
			msg.reply(`Your nap is over! You slept for ${hoursAndMinutes}.`);
		} else {
			msg.reply('You don\'t have an active nap.');
		}
	},
};