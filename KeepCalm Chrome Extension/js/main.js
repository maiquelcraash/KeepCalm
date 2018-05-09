/*
* This script loads the popup content and listners. It also manages the users feedback
* */

document.addEventListener('DOMContentLoaded', function () {

	//gets the atual results of classifications
	chrome.runtime.sendMessage({'method': 'getResults'}, function (response) {
		console.log(response);

		const keepcalmSection = document.getElementById("keepcalm-content"),
			statusIcon = keepcalmSection.querySelector(".thermometer i"),
			infoContainer = keepcalmSection.querySelector(".info");

		console.log(infoContainer);

		if (response) {
			const activityID = response.activityID;

			//creates results components
			const titleElement = document.createElement('div');
			titleElement.innerHTML = `O texto <b> "${response.text}"</b> foi classificado como:`;
			const resultElement = document.createElement('h3');
			resultElement.innerText = response.effectiveResult;

			const percentual = document.createElement('p');
			percentual.innerText = "(Percentual de agressividade: " + response.percentuals["Agressivo"] + "%)";


			if (response.effectiveResult === "Agressivo") {
				clearClassList(statusIcon);
				statusIcon.classList.add("fas", "fa-thermometer-full", "red");
			}
			else if (response.effectiveResult === "Não Agressivo") {
				clearClassList(statusIcon);
				statusIcon.classList.add("fas", "fa-thermometer-empty", "green");
			}

			//creates feedback buttons
			let feedbackDiv = document.createElement("div");
			let div = document.createElement("div");

			div.classList.add("center");
			div.appendChild(createFeedbackButton("AGREE", activityID));
			div.appendChild(createFeedbackButton("DISAGREE", activityID));

			feedbackDiv.classList.add("feedback");
			feedbackDiv.append(div);

			//puts all together
			infoContainer.innerHTML = "";
			infoContainer.appendChild(titleElement);
			infoContainer.appendChild(resultElement);
			infoContainer.appendChild(percentual);
			infoContainer.appendChild(feedbackDiv);
		}
		else {
			clearClassList(statusIcon);
			statusIcon.classList.add("fas", "fa-thermometer-empty", "gray");

			let titleElement = document.createElement('h4');
			titleElement.innerText = "KeepCalm é um detector de conteúdo agressivo que monitora o que você digita na internet.";

			infoContainer.innerHTML = "";
			infoContainer.appendChild(titleElement)

		}
	});
});

/**
 * Clear all classes of a Html Element
 * @param element to be cleared
 */
function clearClassList(element) {
	element.className = "";
}

/**
 *
 /**
 * Creates and return a feedback button with a listener to the respective feedback activity
 * @param type AGREE or DESAGREE
 * @param activityID the id for the activity classification
 * @returns {Element} the feedback button
 */
function createFeedbackButton(type, activityID) {
	const serverHost = "https://keepcalm.acml.com.br/feedback";
	let feedback;

	const feedbackBtn = document.createElement("button");
	feedbackBtn.setAttribute("type", "button");
	feedbackBtn.classList.add("feedback-btn");

	if (type === "AGREE") {
		feedbackBtn.classList.add("green");
		feedbackBtn.innerText = "Concordo";
		feedback = true;
	}
	else if (type === "DISAGREE") {
		feedbackBtn.classList.add("red");
		feedbackBtn.innerText = "Não concordo";
		feedback = false;
	}

	feedbackBtn.addEventListener("click", () => {
		console.log("Cliquei...");

		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open("POST", serverHost, true); // false for synchronous request
		xmlHttp.setRequestHeader('Content-Type', 'application/json');

		xmlHttp.onload = function (data) {
			let results = JSON.parse(xmlHttp.responseText);
			sayThanks();
			console.log(results);
		};
		xmlHttp.send(JSON.stringify({
			"activityID": activityID,
			"feedback": feedback
		}));
	});

	return feedbackBtn;
}

function sayThanks() {
	const keepcalmSection = document.getElementById("keepcalm-content"),
		infoContainer = keepcalmSection.querySelector(".info");

	let titleElement = document.createElement('h4');
	titleElement.innerText = "Obrigado pelo seu feedback. O KeepCalm levará a sua opinião em consideração para aprender.";

	infoContainer.innerHTML = "";
	infoContainer.appendChild(titleElement);
}

