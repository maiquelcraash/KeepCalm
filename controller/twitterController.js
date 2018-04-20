/**
 * Created by maiquel on 25/01/18.
 */

(function () {
	"use strict";

	const Twitter = require('twitter'),
		rawTweetModel = require('../model/rawTweetModel'),
		posTweetModel = require('../model/processedTweetModel'),
		properties = require('../config/properties');


	let client = new Twitter({
		consumer_key: properties.TWITTER_KEY,
		consumer_secret: properties.TWITTER_SECRET,
		access_token_key: properties.TWITTER_TOKEN,
		access_token_secret: properties.TWITTER_TOKEN_SECRET
	});

	let twitterController = () => {

		let getTweetsFromTwitter = (params, classification, next_id) => {
			params.max_id = next_id;
			client.get('search/tweets', params, (err, tweets, response) => {
				if (err) {
					console.log(err);
				}
				else {
					// remove retweets
					let curTweets = tweets.statuses.filter(function (tweet) {
						return !tweet.full_text.includes("RT @");
					});

					curTweets.forEach((tweet) => {

						let rawTweet = new rawTweetModel();
						rawTweet.id = tweet.id;
						rawTweet.text = tweet.full_text;
						rawTweet.classification = classification;
						rawTweet.datetime = new Date(tweet.created_at);

						rawTweet.save((err, newTweet) => {
							if (err) {
								console.log(err);
							}
							else {
								console.log("Salvo tweet " + newTweet.id);
							}
						});
					});

					try {
						let next_result = tweets.search_metadata.next_results.split("max_id=")[1].split("&")[0];
						getTweetsFromTwitter(params, classification, Number(next_result));
					}
					catch (ex) {
						console.log(ex);
					}
				}
			})
		};

		let getRawTweetsFromDatabase = (params, callback) => {
			rawTweetModel.find(params, (err, tweets) => {
				if (err) {
					console.log(err)
				}
				else {
					callback(tweets);
				}
			})
		};

		let getPosTweetsFromDatabase = (params, callback) => {
			const query = posTweetModel.find(params, (err, tweets) => {
				if (err) {
					console.log(err)
				}
				else {
					callback(tweets);
				}
			});

			if (properties.QUERY_LIMIT > 0) {
				query.limit(properties.QUERY_LIMIT);
			}
			query.exec();
		};

		let updateRawTweet = (rawTweet) => {
			rawTweet.save((err) => {
				if (err) {
					console.log(err);
				}
			})
		};


		return {
			getTweetsFromTwitter: getTweetsFromTwitter,
			getRawTweetsFromDatabase: getRawTweetsFromDatabase,
			getPosTweetsFromDatabase: getPosTweetsFromDatabase,
			updateRawTweet: updateRawTweet
		}
	};

	module.exports = twitterController();

}());