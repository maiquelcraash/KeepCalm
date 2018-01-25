/**
 * Created by maiquel on 24/01/18.
 */

(function () {
	"use strict";

	let mongoose = require("mongoose"),
		Schema = mongoose.Schema;

	let rawTweetSchema = new Schema({
		id: {
			type: Number,
			required: true,
			unique: true,
			dropDups: true
		},
		text: {
			type: String,
			required: true
		},
		classification: {
			type: String,
			required: true
		},
		datetime: {
			type: Date,
			required: true
		}
	});

	module.exports = mongoose.model('RawTweet', rawTweetSchema);

}());