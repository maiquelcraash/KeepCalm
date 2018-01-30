/**
 * Created by maiquel on 24/01/18.
 */

(function () {
	"use strict";

	let mongoose = require("mongoose"),
		Schema = mongoose.Schema;

	let posTweetSchema = new Schema({
		id: {
			type: Number,
			required: true,
			unique: true,
			dropDups: true
		},
		original_text: {
			type: String,
			required: true
		},
		pos_text: {
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
		},
		processed: {
			type: Boolean,
			required: true,
			default: false
		}
	});

	module.exports = mongoose.model('PosTweet', posTweetSchema);

}());