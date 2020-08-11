const { Sequelize } = require('sequelize');

// Database Connection for Production

let config = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
}

if (process.env.INSTANCE_CONNECTION_NAME) {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// Database Connection for Development

const sequelize = new Sequelize(config.database, config.user, config.password, {
	host: config.socketPath,
	dialect: 'mysql',
	dialectOptions: {
		socketPath: config.socketPath,
	},
  });


module.exports = sequelize;

