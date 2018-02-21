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

	let imageData = ctx.getImageData(0, 0, 19, 19);
	return imageData;
}