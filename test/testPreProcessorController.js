/**
 * Created by maiquel on 26/01/18.
 */

//Runs with Mocha 5.0
(function () {
	"use strict";

	const preProcessorController = require('../controller/preProcessorController'),
		rawTweetModel = require('../model/rawTweetModel'),
		db = require('../config/db'),
		assert = require('assert');

	let posTweet;

	db.getConnection();

	describe("#preprocessorController", function () {
		it('#pré processa tweet', (done) => {
			console.log("Testando Pré Processador de Tweets");

			let rawTweet = new rawTweetModel();
			rawTweet.id = 998;
			rawTweet.text = "Teste NorMAL #Podre com\noutras palavras que ouvimos @viagem kkkkkkk ahuahauhaa. Que loucura!";
			rawTweet.classification = "Agressivo";
			rawTweet.datetime = new Date();

			posTweet = preProcessorController.preProcess(rawTweet);
			assert.equal(posTweet.pos_text, "test normal outr palavr ouv loucur");
			assert.equal(posTweet.original_text, rawTweet.text);
			assert.equal(posTweet.classification, rawTweet.classification);
			assert.equal(posTweet.datetime, rawTweet.datetime);
			assert.equal(posTweet.id, rawTweet.id);

			done();
		});

		it('#salva tweet no banco', (done) => {
			console.log("Testando salvar tweet no banco");
			preProcessorController.savePosTweetOnDatabase(posTweet, done);
		});

		after((done) => {
			db.closeConnection();
			done();
		})
	});
}());