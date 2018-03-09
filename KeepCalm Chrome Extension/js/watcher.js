/*
* This script checks the user input and send data do server
* */

(function () {
	"use strict";
	let serverHost = "http://localhost:8083/classify";

	//get all input fields and apply listener
	let inputFields = document.querySelectorAll("input, textarea");
	inputFields.forEach((inputField) => {
		inputField.addEventListener("input", debounce(getClassification, 2000));
	});

	//inject CSS style on page
	let style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.keepcalm-agressive { border-color: red; border-width: 3px; border-radius: 3px; }';
	document.getElementsByTagName('head')[0].appendChild(style);


	/**
	 * Makes a request to server to obtain classification for the text inputed on target element and event, then call the browser to update the icon and popup
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
				let iconColor = "gray";

				if (results) {
					if (results.effectiveResult === "Agressivo") {
						iconColor = "red";
						targetField.classList.add("keepcalm-agressive");
					}
					else {
						iconColor = "green";
						targetField.classList.remove("keepcalm-agressive");
					}
				}

				setIconOnTab(iconColor);
				setResultsOnPopup(results)
			};
			xmlHttp.send(JSON.stringify({"target": targetText}));
		}
		else {
			targetField.classList.remove("keepcalm-agressive");
			setIconOnTab("gray");
			setResultsOnPopup(null);
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

	/**
	 * Sends a message to the background script whith the icon color
	 * @param color the be set on browser tab
	 */
	function setIconOnTab(color) {
		chrome.runtime.sendMessage({method: 'setIcon', color: color}, function (response) {
			console.log(response.status);
		});
	}

	/**
	 * Sends a message to the popup with the server results
	 * @param results
	 */
	function setResultsOnPopup(results) {
		chrome.runtime.sendMessage({method: 'setResults', 'results': results});
	}

}());