/**
 * Created by maiquel on 07/03/18.
 */

(function () {
	"use strict";

	const activityLogModel = require("../model/activityLogModel"),
		properties = require('../config/properties');

	let activityLogController = () => {

		let createActivity = (classificationResult, callback) => {

			let activity = new activityLogModel();
			activity.text = classificationResult.text;
			activity.result = classificationResult;
			activity.datetime = new Date();

			activity.save((err, newActivity) => {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Atividade salva com id: " + newActivity._id);
					callback(newActivity)
				}
			});
		};

		let updateActivity = (activityID, feedback, callback) => {
			activityLogModel.findByIdAndUpdate(activityID, {feedback: feedback}, callback);
		};

		let getFeedbackActivities = ((callback) => {
			const query = activityLogModel.find({ $or:[ {feedback:true}, {feedback:false}]}, (err, activities) => {
					if (err) {
						console.log(err)
					}
					else {
						callback(activities);
					}
			});

			if (properties.QUERY_LIMIT > 0) {
				query.limit(properties.QUERY_LIMIT);
			}
			query.exec();
		});


		return {
			createActivity: createActivity,
			updateActivity: updateActivity,
			getFeedbackActivities: getFeedbackActivities
		}

	};

	module.exports = activityLogController();
}());