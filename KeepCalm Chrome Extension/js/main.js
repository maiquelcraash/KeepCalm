document.addEventListener('DOMContentLoaded', function () {
	//gets the atual results of classifications
	chrome.runtime.sendMessage({'method': 'getResults'}, function (response) {
		console.log(response);

		let keepcalmSection = document.getElementById("keepcalm-content"),
			statusIcon = keepcalmSection.querySelector(".thermometer i"),
			infoContainer = keepcalmSection.querySelector(".info");

		console.log(infoContainer);

		if (response) {
			let titleElement = document.createElement('div');
			titleElement.innerHTML = `O texto <b> "${response.text}"</b> foi classificado como:"`;
			let resultComponent = document.createElement('h3');
			resultComponent.innerText = response.effectiveResult;

			if (response.effectiveResult === "Agressivo") {
				clearClassList(statusIcon);
				statusIcon.classList.add("fas", "fa-thermometer-full", "red");
			}
			else if (response.effectiveResult === "Não Agressivo") {
				clearClassList(statusIcon);
				statusIcon.classList.add("fas", "fa-thermometer-empty", "green");
			}

			infoContainer.innerHTML = "";
			infoContainer.appendChild(titleElement);
			infoContainer.appendChild(resultComponent);

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
