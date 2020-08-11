
const db = require('../database');
const { Op, Model, DataTypes } = require('sequelize');
const moment = require('moment');

class NapError extends Error {}

class Nap extends Model {
	getLength() {
		const startAt = this.startAt;
		const endAt = this.endAt;

		if (!endAt) {
			return;
		}

		const endAtMoment = moment(endAt);
		const startAtMoment= moment(startAt);

		return moment.duration(endAtMoment.diff(startAtMoment)).asMinutes();
	}
}

Nap.init({
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.STRING,
	},
	startAt: {
		type: DataTypes.DATE,
	},
	endAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
  }, {
	sequelize: db, 
	modelName: 'Nap',
});

const getOngoingNapsQueryConfig = userId => ({
	where: {
		userId,
		endAt: {
			[Op.is]: null
		}
	},
});


const getOngoingNaps = async (userId) => {
	if (!userId) {
		throw new NapError('User id not provided');
	}
	await db.sync();
	return await Nap.findAll(getOngoingNapsQueryConfig(userId));
};

const getNapsForUser = async (userId, lastXDays) => {
	if (!userId) {
		throw new NapError('User id not provided');
	}
	await db.sync();

	return await Nap.findAll({
		where: {
			userId,
			startAt: {
				[Op.gte]: moment().subtract(7,'d').format('YYYY-MM-DD HH:mm:ss'),
			}
		}
	})
};

const startNap = async userId => {
	const ongoingNaps = await getOngoingNaps(userId);
	if (ongoingNaps.length > 0) {
		throw new NapError('You already have an active nap');
	}

	const newNap = await Nap.create({
		userId,
		startAt: moment().format('YYYY-MM-DD HH:mm:ss')
	});

	if (newNap) {
		return newNap;
	} else {
		throw new NapError('Failed to start map');
	}
};

const endNap = async userId => {
	const ongoingNaps = await getOngoingNaps(userId);

	if (ongoingNaps.length <= 0) {
		throw new NapError('You don\'t have an active nap! Start one with \`/nap start\`');
	}

	const nap = ongoingNaps[0];

	const endedAt = moment().format('YYYY-MM-DD HH:mm:ss');
	nap.endAt = endedAt;
	return await nap.save();
};

const NapManager = {
	startNap,
	endNap,
	getOngoingNaps,
	getNapsForUser,
};

module.exports = NapManager;