/**
 * Created by maiquel on 26/01/18.
 */

//Runs with Mocha 5.0
(function () {
	"use strict";

	const preProcessorController = require('../controller/preProcessorController'),
		rawTweetModel = require('../model/rawTweetModel'),
		posTweetModel = require('../model/processedTweetModel'),
		mongoose = require('mongoose'),
		properties = require('../config/properties'),
		db = mongoose.connect(properties.MONGODB_CONFIG.mongoUrl),
		assert = require('assert');

	let posTweet;


	describe("#preprocessorController", function () {
		it('#pré processa tweet', (done) => {
			console.log("Testando Pré Processador de Tweets");

			let rawTweet = new rawTweetModel();
			rawTweet.id = 999;
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

			posTweet.save((err, newTweet) => {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Salvo tweet " + newTweet.id);
					posTweetModel.remove({id: newTweet.id}, (err, raw) => {
						if(err){
							console.log(err);
						}
						else {
							console.log("Excluido tweet: " + newTweet.id);
						}
					})
						.all(db.close());									//close mongose connection
				}
			});

			done();
		});
	});
}());