module.exports = {
	name: 'end',
	description: 'End your nap',
	execute(msg, args, NapManager) {
		const userId = msg.author.id;
		const minutesNapped = NapManager.endNap(userId);
		if (typeof minutesNapped === "number") {
			msg.reply(`Your nap is over! You slept for ${minutesNapped} minutes.`);
		} else {
			msg.reply('You don\'t have an active nap.');
		}
	},
};