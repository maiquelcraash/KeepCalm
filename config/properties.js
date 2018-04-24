/**
 * Created by maiquel on 24/03/17.
 */

(function () {
		"use strict";

		/* Server Settings */
		exports.BODY_LIMIT = "100kb";
		exports.QUERY_LIMIT = -1;					//-1 = no limit

		if (process.env.NODE_ENV === "development") {
			exports.CLASSIFIER_SERVER_PORT = 8082;
			exports.CLASSIFIER_HOST = "localhost";
			exports.WEB_SERVER_PORT = 8083;
			exports.WEB_SERVER_HOST = "localhost";

			exports.MONGODB_CONFIG = {
				"mongoUrl": "mongodb://localhost:27017/KeepCalm_Jelastic_180418",
			};
		}

		else if (process.env.NODE_ENV === "production") {
			exports.CLASSIFIER_SERVER_PORT = 8082;
			exports.CLASSIFIER_HOST = "node161773-env-0316101.jelasticlw.com.br";
			exports.WEB_SERVER_PORT = 8083;
			exports.WEB_SERVER_HOST = "node161774-env-4978347.jelasticlw.com.br";

			exports.MONGODB_CONFIG = {
				"mongoUrl": "mongodb://admin:KKEtsd96234@191.252.81.56:27017/KeepCalm",
			};

		}

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


		/* Pre-processor Config */
		exports.EXCLUDE_RULES = ['PREP', 'CONJCOORD', 'CONJSUB', 'PPS', 'ART', 'PREP+ART', 'PPOA', 'PPOA', 'PR'];
		exports.TRASH_WORDS = ['d', 'q', 'p', 'jah', 'tbm', 'soh', 'msm', 'qm'];
		exports.TRASH_SYMBOLS = ['@', 'kk', 'hehe', 'shua', 'ahh', 'ahua', 'http', 'haha', '#', 'R$', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

		/* Classifier Config */
		exports.EFFECTIVE_PERCENTUAL = 75;
	}
	()
);