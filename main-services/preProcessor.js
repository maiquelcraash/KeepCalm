/**
 * Created by maiquel on 25/01/18.
 */

(function () {
	"use strict";

	const preProcessorController = require('../controller/preProcessorController'),
		twitterController = require('../controller/twitterController'),
		propertires = require('../config/properties'),
		db = require('../config/db');

	db.getConnection();

	//process only not processed items
	let params = {
		query : {
			processed: true
		},
		options: {
			limit: propertires.QUERY_LIMIT
		}
	};

	twitterController.getRawTweetsFromDatabase(params, (rawTweets) => {
		console.log("Getting tweets from database...");
		rawTweets.forEach((tweet) => {
			let posTweet = preProcessorController.preProcessTweet(tweet);
			preProcessorController.savePosTweetOnDatabase(posTweet);
			tweet.processed = true;
			twitterController.updateRawTweet(tweet);
		});
	})
}());