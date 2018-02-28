/**
 * Created by maiquel on 15/02/18.
 */

(function () {
	"use strict";
	let serverHost = "http://localhost:8082/classify";

	let inputFields = document.querySelectorAll("input, textarea");

	inputFields.forEach((inputField) => {
		inputField.addEventListener("input", debounce(getClassification, 2000));
	});

	let style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.keepcalm-agressive { border-color: red; border-width: 3px; border-radius: 3px; }';
	document.getElementsByTagName('head')[0].appendChild(style);


	/**
	 * Makes a request to server to obtain classification for the text inputed on target element and event
	 */
	function getClassification() {
		console.log("Obtendo classificação...");

		let targetField = this;
		let targetText = this.value;

		if (targetText) {
			let xmlHttp = new XMLHttpRequest();
			xmlHttp.open("POST", serverHost, true); // false for synchronous request
			xmlHttp.setRequestHeader('Content-Type', 'application/json');

			xmlHttp.onload = function (data) {
				let results = JSON.parse(xmlHttp.responseText);
				console.log(results);
				let iconColor = "green";

				if (results.effectiveResult === "Agressivo") {
					iconColor = "red";
					targetField.classList.add("keepcalm-agressive");
				}
				else {
					iconColor = "green";
					targetField.classList.remove("keepcalm-agressive");
				}

				//sends a message to the background script
				chrome.runtime.sendMessage({color: iconColor}, function (response) {
					console.log(response.status);
				});
			};

			xmlHttp.send(JSON.stringify({"target": targetText}));
		}
		else {
			targetField.classList.remove("keepcalm-agressive");
		}
	}

	/**
	 * REF: https://davidwalsh.name/javascript-debounce-function
	 * @param func funtion to be execute
	 * @param wait delay time em milis
	 * @param immediate boolean
	 * @returns {Function}
	 */
	function debounce(func, wait, immediate) {
		let timeout;
		return function () {
			let context = this;
			let args = arguments;
			let later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

}());