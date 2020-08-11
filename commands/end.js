const messaging = require('../utils/messaging');

module.exports = {
	name: 'end',
	description: 'End your nap',
	async execute(msg, _args, NapManager) {
		const userId = msg.author.id;

		try {
			const nap = await NapManager.endNap(userId);
			const minutesNapped = nap.getLength();
			if (minutesNapped) {
				const hoursAndMinutes = messaging.minutesToTime(minutesNapped);

				const lastWeekNaps = await NapManager.getNapsForUser(userId, 7);
				const totalNapped = lastWeekNaps.reduce((total, nap) => total + (nap.getLength() || 0), 0);
				const totalHoursAndMinutes = messaging.minutesToTime(totalNapped);
				msg.reply(`Your nap is over! You slept for ${hoursAndMinutes} for a total of ${totalHoursAndMinutes} in the last 7 days.`);
			}
		} catch (error) {
			msg.reply(error.message)
		}
	},
};