/**
 * Created by maiquel on 22/01/18.
 */

(function () {
	"use strict";

	const twitterController = require('../controller/twitterController'),
		properties = require("../config/properties");

	//save hangry tweets
	let hangryParams = {
		q: properties.HANGRY_WORDS.join(" OR "),
		tweet_mode: 'extended',
		count: 100,
	};

	//save normal tweets
	let normalParams = {
		tweet_mode: 'extended',
		geocode: '-23.5505199,-46.6333094,50km',
		count: 100,
	};

	twitterController.getTweets(hangryParams, "Agressivo");
	twitterController.getTweets(normalParams, "Não Agressivo");

}());