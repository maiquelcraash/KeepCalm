/**
 * Created by maiquel on 15/02/18.
 */

(function () {
	"use strict";
	let serverHost = "http://localhost:8082/classify";

	let inputFields = document.querySelectorAll("input, textarea");

	inputFields.forEach((inputField) => {
		inputField.addEventListener("input", _.debounce(getClassification, 3000));
	});

	function getClassification(target) {
		console.log("Obtendo classificação...");

		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", serverHost, true); // false for synchronous request
		xmlHttp.setRequestHeader('Content-Type', 'application/json');

		xmlHttp.onload = function (data) {
			let results = JSON.parse(xmlHttp.responseText);
			console.log(results);
			console.log(data);
		};

		xmlHttp.send(JSON.stringify({"target": "Teste de frase linda"}));
	}

}());