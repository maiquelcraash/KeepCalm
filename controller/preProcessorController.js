/**
 * Created by maiquel on 25/01/18.
 */

(function () {
	"use strict";

	const natural = require('natural'),
		processedTweetModel = require('../model/processedTweetModel'),
		db = require('../config/db'),
		properties = require('../config/properties');

	let preProcessorControler = () => {

		let preProcess = (rawTweet) => {

			let processedText = rawTweet.text.toLowerCase();

			//removes trash
			processedText = removeTrashWords(processedText);

			//removes symbols
			processedText = removeSymbols(processedText);

			//remove the stopwords
			processedText = removeStopWords(processedText);

			//stemmer
			processedText = steemer(processedText);


			let posTweet = new processedTweetModel();
			posTweet.id = rawTweet.id;
			posTweet.original_text = rawTweet.text;
			posTweet.pos_text = processedText;
			posTweet.classification = rawTweet.classification;
			posTweet.datetime = rawTweet.datetime;

			return posTweet;

			/* Removes any word that contains trash symbols */
			function removeTrashWords(str) {
				let trashSymbols = properties.TRASH_SYMBOLS;

				let words = str.split(' ');

				words = words.filter((word) => {
					let noTrash = true;
					trashSymbols.forEach((symbol) => {
						if (word.indexOf(symbol) >= 0) {
							noTrash = false;
						}
					});
					return noTrash;
				});
				return words.join(' ');
			}

			/* Removes remaining symbols */
			function removeSymbols(str) {

				let words = str.split(' ').map((word) => {
					word = word.replace(/[\n\r]/g, ' ');

					['.', '..', '...', '....', ',', ';', '!', '!!', '?', '??', '???', ':', '"', "\\", "-", '“', "'", '\'', ''].forEach((symbol) => {
						word = word.replace(symbol, '');
					});

					return word;
				});

				return words.join(' ');
			}

			function removeStopWords(str) {
				let stopwords = properties.STOPWORDS;
				let words = str.split(' ');
				words = words.filter((word) => {
					return !stopwords.includes(word)
				});
				return words.join(' ');
			}

			function steemer(str) {
				let words = str.split(' ');
				words = words.map((word) => {
					return natural.PorterStemmerPt.stem(word);
				});

				return words.join(' ')
			}
		};

		let savePosTweetOnDatabase = (posTweet, callback) => {
			posTweet.save((err, newTweet) => {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Salvo tweet processado " + posTweet.id);
				}
				if (callback) callback();

			});
		};


		return {
			preProcess: preProcess,
			savePosTweetOnDatabase: savePosTweetOnDatabase
		}
	};

	module.exports = preProcessorControler();

}());