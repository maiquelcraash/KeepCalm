/**
 * Created by maiquel on 25/01/18.
 */

(function () {
	"use strict";

	const preProcessorController = require('../controller/preProcessorController'),
		twitterController = require('../controller/twitterController'),
		db = require('../config/db');

	db.getConnection();

	//process only not processed items
	let params = {
		processed: false
	};

	twitterController.getRawTweetsFromDatabase(params, (rawTweets) => {
		console.log("Getting tweets from database...");
		rawTweets.forEach((tweet) => {
			let posTweet = preProcessorController.preProcess(tweet);
			preProcessorController.savePosTweetOnDatabase(posTweet);
			tweet.processed = true;
			twitterController.updateRawTweet(tweet);
		});
	})
}());