/**
 * Created by maiquel on 24/03/17.
 */

(function () {
	"use strict";

	/* Server Settings */
	exports.SERVER_PORT = 8082;
	exports.BODY_LIMIT = "100kb";

	/* Twitter Authentication */
	exports.TWITTER_KEY = 'BxiQLE4OPPmmRvgw5aC9yKqST';
	exports.TWITTER_SECRET = 'LJSKJESeB7NV9SxBbe7QmYVl9bqMpQIIiZKnHDSltQYsUDlliI';
	exports.TWITTER_TOKEN = '1539136728-7L8QdVnN0y2BKJ4nJjRtuxwONRBsIHiSXyjHFgM';
	exports.TWITTER_TOKEN_SECRET = 'mOauAa9SJEOjmF2JQWiYVqn8ijwMHbsFsEK3kRYRVEJNs';

	/* Miner Config */
	exports.HANGRY_WORDS = [
		'fdp',
		'caralho',
		'merda',
		'bosta',
		'porra',
		'puta',
		'foder'
	];

	exports.MONGODB_CONFIG = {
		"mongoUrl": "mongodb://localhost:27017/KeepCalm",
	};

	/* Pre-processor Config */
	exports.EXCLUDE_RULES = ['PREP', 'CONJCOORD', 'CONJSUB', 'ADV', 'PPS', 'ART', 'PTRA', 'PREP+ART', 'PPOA', 'PPOA', 'PR'];
	exports.TRASH_WORDS = ['d', 'q', 'p', 'jah', 'tbm', 'soh', 'msm', 'qm', 'vc'];
	exports.TRASH_SYMBOLS = ['@', 'kk', 'hehe', 'shua', 'ahh', 'ahua', 'http', 'haha', '#', 'R$', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

	/* Classifier Config */
	exports.EFFECTIVE_PERCENTUAL = 70;
}());