/**
 * Created by maiquel on 07/03/18.
 */

(function () {
	"use strict";

	const activityLogModel = require("../model/activityLogModel");

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

		return {
			createActivity: createActivity,
			updateActivity: updateActivity
		}

	};

	module.exports = activityLogController();
}());