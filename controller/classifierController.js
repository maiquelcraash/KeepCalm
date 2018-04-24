/**
 * Created by maiquel on 05/02/18.
 */

(function () {
	"use strict";

	const natural = require('natural'),
		twitterController = require('./twitterController'),
		POSTaggerController = require('./POSTaggerController'),
		activityLogController = require('./activityLogController'),
		preProcessorController = require('./preProcessorController'),
		properties = require('../config/properties');

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

		let getClassification = (target, callback) => {
			let result = classifier.classify(target);
			let details = classifier.getClassifications(target);
			let percentuals = {};

			let tt = details.reduce((sum, feature) => {
				return sum + feature.value;
			}, 0);

			details.forEach((feature) => {
				let number = Intl.NumberFormat('pt-PT', {maximumFractionDigits: 2}).format(feature.value / tt * 100);
				percentuals[feature.label] = number;
			});

			let effectiveResult = "Não Agressivo";
			if (percentuals["Agressivo"] >= properties.EFFECTIVE_PERCENTUAL) {
				effectiveResult = "Agressivo";
			}

			let results = {
				text: target,
				result: result,
				details: details,
				percentuals: percentuals,
				effectiveResult: effectiveResult,
				pos_tag: POSTaggerController.getPOSTags(target)
			};

			activityLogController.createActivity(results, (newActivity) => {
				results.activityID = newActivity._id;
				callback(results);
			});
		};

		function train(callback) {
			console.log("Adding documents...\n");

			let params = {
				query: {
					// processed: false
				},
				options: {
					limit: properties.QUERY_LIMIT
				}
			};

			twitterController.getPosTweetsFromDatabase(params, (posTweets) => {

				posTweets.forEach((tweet) => {
					console.log("Adding to train group - tweet id: " + tweet.id);
					classifier.addDocument(tweet.pos_text, tweet.classification);
				});

				console.log("\n");

				activityLogController.getFeedbackActivities((activities) => {
					activities.forEach((activity) => {
						console.log("Adding to train group - activity id: " + activity.id);

						let trainText = preProcessorController.preProcessText(activity.text);
						let trainClassification;
						let classification = activity.result.effectiveResult;

						if (activity.feedback === true) {
							trainClassification = classification;
						}
						else {
							if (classification === "Agressivo") {
								trainClassification = "Não Agressivo";
							}
							else {
								trainClassification = "Agressivo";
							}
						}

						classifier.addDocument(trainText, trainClassification);
					})

					console.log("\nTraining algorithm...");
					classifier.train();
					console.log("\nReady!");
					callback();
				});
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