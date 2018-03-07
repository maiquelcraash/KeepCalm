/**
 * Created by maiquel on 07/03/18.
 */

(function () {
	"use strict";


	let mongoose = require("mongoose"),
		Schema = mongoose.Schema;

	let activityLogSchema = new Schema({
		text: {
			type: String,
			required: true
		},
		result: {
			type: Object,
			required: true
		},
		datetime: {
			type: Date,
			required: true
		},
		feedback: {
			type: Boolean,
		}
	});

	module.exports = mongoose.model('ActivityLog', activityLogSchema);

}());