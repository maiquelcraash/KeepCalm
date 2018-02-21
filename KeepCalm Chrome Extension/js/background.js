/**
 *
 * @param iconImageData ImageData file to be set as icon
 * @param tab	the tab of the brawser to set the icon
 */
function alterIcon(iconImageData, tab) {
	//need to re-parse the ImageData because the message mecanism has persed it to JSON and the primitive values had lost
	let id = new ImageData(new Uint8ClampedArray(Object.values(iconImageData.data)), 19, 19);

	chrome.browserAction.setIcon(
		{
			imageData: id,
			tabId: tab.id
		}
	);
}


chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");

		sendResponse({status: "OK"});
		let iconImageData = request.iconImageData;
		alterIcon(iconImageData, sender.tab);
	});