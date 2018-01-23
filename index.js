/**
 * Created by maiquel on 22/01/18.
 */

(function () {
	"use strict";

	let Twitter = require('twitter'),
		properties = require('./properties');

	let client = new Twitter({
		consumer_key: properties.TWITTER_KEY,
		consumer_secret: properties.TWITTER_SECRET,
		access_token_key: properties.TWITTER_TOKEN,
		access_token_secret: properties.TWITTER_TOKEN_SECRET
	});

	let params = {
		q: properties.HANGRY_WORDS.join(" OR "),
		tweet_mode: 'extended',
		count: 100,

	};

	let count = 0;

	getTweets(params);

	function getTweets(params, next_id) {
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
					console.log(tweet.full_text + "\n" + tweet.id + "\n ################################");
					count++;
				});

				try {
					let next_result = tweets.search_metadata.next_results.split("max_id=")[1].split("&")[0];
					console.log("\n\n\n\n" + count + "\n\n\n\n");
					getTweets(params, Number(next_result));
				}
				catch (ex) {
					console.log("\n\n\n\n\nTerminou com " + count + " Tweets encontrados.");

				}
			}
		})
	}

}());