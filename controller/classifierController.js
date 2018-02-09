/**
 * Created by maiquel on 05/02/18.
 */

(function () {
	"use strict";

	const natural = require('natural'),
		twitterController = require('./twitterController');

	let classifier;

	let classifierController = () => {

		let trainBayesClassifier = (callback) => {
			classifier = new natural.BayesClassifier(natural.PorterStemmerPt);

			train(callback);
		};

		let trainLogisticRegressionClassifier = (callback) => {
			classifier = new natural.LogisticRegressionClassifier(natural.PorterStemmerPt);

			train(callback);
		};

		let getClassification = (target) => {
			let result = classifier.classify(target);
			let details = classifier.getClassifications(target);
			return {
				result: result,
				details: details
			}
		};

		function train(callback) {
			console.log("Adding documents...\n");

			let params = {
				processed: false
			};
			twitterController.getPosTweetsFromDatabase(params, (posTweets) => {
				posTweets.forEach((tweet) => {
					console.log(tweet.id);
					classifier.addDocument(tweet.pos_text, tweet.classification);
				});

				console.log("\nTraining algorithm...");
				classifier.train();
				console.log("\nReady!");
				callback();
			});


		}

		return {
			trainBayesClassifier: trainBayesClassifier,
			trainLogisticRegressionClassifier: trainLogisticRegressionClassifier,
			getClassification: getClassification,
		}
	};

	module.exports = classifierController();
}());