//database connections

let mongoose = require('mongoose'),
	properties = require('./properties');

module.exports = callback => {
	let db = mongoose.connect(properties.MONGODB_CONFIG.mongoUrl);
	callback(db)																//calls the callback passing the new connection
};