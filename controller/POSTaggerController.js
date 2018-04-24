/**
 * Created by maiquel on 12/02/18.
 */

(function () {
	"use strict";

	let natural = require("natural");

	let rulesFilename = __dirname + "/../res/PosTagger/pt_br-ruleset.txt",
		lexiconFilename = __dirname + "/../res/PosTagger/pt_br-lexicon.json",
		defaultCategory = 'NN';

	let lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
	let rules = new natural.RuleSet(rulesFilename);
	let tagger = new natural.BrillPOSTagger(lexicon, rules);


	let POSTaggerController = () => {

		let getPOSTags = (str) => {
			let sentence = str.split(' ');
			sentence = sentence.filter((word) => {
				return (word !== "" && word !== " ");
			});

			if (sentence.length === 0) {
				return [];
			}
			return tagger.tag(sentence);
		};

		return {
			getPOSTags: getPOSTags
		}
	};

	module.exports = POSTaggerController();

}());