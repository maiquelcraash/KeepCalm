/**
 * Created by maiquel on 22/01/18.
 */

(function () {
	"use strict";

	let Twitter = require('twitter'),
		rawTweetModel = require('./model/rawTweetDBModel'),
		mongoose = require('mongoose'),
		properties = require('./config/properties'),
		db = mongoose.connect(properties.MONGODB_CONFIG.mongoUrl);

	let client = new Twitter({
		consumer_key: properties.TWITTER_KEY,
		consumer_secret: properties.TWITTER_SECRET,
		access_token_key: properties.TWITTER_TOKEN,
		access_token_secret: properties.TWITTER_TOKEN_SECRET
	});


	//save hangry tweets
	let hangryParams = {
		q: properties.HANGRY_WORDS.join(" OR "),
		tweet_mode: 'extended',
		count: 100,
	};
	getTweets(hangryParams, "Agressivo");

	//save normal tweets
	let normalParams = {
		tweet_mode: 'extended',
		geocode:'-23.5505199,-46.6333094,400km',
		count: 100,
	};
	getTweets(normalParams, "Não Agressivo");

	function getTweets(params, classification, next_id) {
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
						if (err){
							console.log(err);
						}
						else {
							console.log("Salvo tweet " + newTweet.id);
						}
					})
				});

				try {
					let next_result = tweets.search_metadata.next_results.split("max_id=")[1].split("&")[0];
					getTweets(params, classification, Number(next_result));
				}
				catch (ex) {
					console.log(ex);
				}
			}
		})
	}
}());