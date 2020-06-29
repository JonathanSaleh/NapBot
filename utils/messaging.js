const minutesToTime = totalMinutes => {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const moreThanHour = hours && hours > 0;

	let msg = `${minutes} minute(s)`;
	if (moreThanHour) {
		msg = `${hours} hours and `
	}
	return msg;
};


module.exports = {
	minutesToTime,
};