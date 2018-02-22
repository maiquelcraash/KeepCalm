/**
 *
 * @param color to paint the icon
 * @param tab	the tab of the brawser to set the icon
 */
function alterIcon(color, tab) {
	chrome.browserAction.setIcon(
		{
			imageData: createIconImageData(color),
			tabId: tab.id
		}
	);
}

function createIconImageData(color) {
	let canvas = document.createElement("canvas");
	canvas.width = 19;
	canvas.height = 19;

	let ctx = canvas.getContext("2d");
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.ellipse(9.5, 9.5, 9.5, 9.5, 0, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

	return ctx.getImageData(0, 0, 19, 19);
}


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");

		sendResponse({status: "OK"});
		let color = request.color;
		alterIcon(color, sender.tab);
	});