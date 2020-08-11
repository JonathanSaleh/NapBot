const messaging = require('../utils/messaging');

module.exports = {
	name: 'start',
	description: 'Start your nap. Enjoy!',
	async execute(msg, args, NapManager) {
		const userId = msg.author.id;
		const arg = args[0];
		const minutes = arg && Number(arg);
		
		try {
			await NapManager.startNap(userId);
			if (minutes) {
				const miliseconds = minutes * 60000;
				setTimeout(async () => {
					const nap = await NapManager.endNap(userId);
					const minutesNapped = nap.getLength();
					if (minutesNapped) {
						const hoursAndMinutes = messaging.minutesToTime(nap.getLength());
						msg.reply(`Time to wake up! Your nap is over. You slept for ${hoursAndMinutes}.`);
					}
				}, miliseconds);
				msg.reply(`Nap started. You will get a notification in ${minutes} minutes, or end the nap early with \`/nap end\``);
			} else {
				msg.reply('Nap started. Use `/nap end` when you\'re finished  Enjoy!');
			}
		} catch (err) {
			msg.reply(err.message);
		}
	},
};