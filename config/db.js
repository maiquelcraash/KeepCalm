/**
 * Created by maiquel on 26/01/18.
 */

(function () {
	"use strict";

	const mongoose = require('mongoose'),
		properties = require('../config/properties');

	let connection = null;

	let db = () => {

		let getConnection = () => {
			connection = mongoose.connect(properties.MONGODB_CONFIG.mongoUrl);
			return connection;
		};

		let closeConnection = () => {
			if (connection) {
				connection.close();
				connection = null;
			}
		};

		return {
			getConnection: getConnection,
			closeConnection: closeConnection
		}
	};

	module.exports = db();

}());