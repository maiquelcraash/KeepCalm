/**
 * Created by maiquel on 22/01/18.
 */

(function () {
	"use strict";

	const twitterController = require('../controller/twitterController'),
		db = require('../config/db'),
		properties = require("../config/properties");

	db.getConnection();

	//save hangry tweets
	let hangryParams = {
		q: properties.HANGRY_WORDS.join(" OR "),
		tweet_mode: 'extended',
		count: 100,
		lang: "pt"
	};


	let q = properties.HANGRY_WORDS.map((word) => {
		return "-" + word;
	});

	//save normal tweets
	let normalParams = {
		q: q.join(" "),
		tweet_mode: 'extended',
		count: 100,
		lang: "pt",
	};

	twitterController.getTweetsFromTwitter(hangryParams, "Agressivo");
	// twitterController.getTweetsFromTwitter(normalParams, "Não Agressivo");

}());