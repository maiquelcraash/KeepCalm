document.addEventListener('DOMContentLoaded', function () {
		let imageResult = document.getElementById('image-result');
		let img = document.createElement("img");
		img.setAttribute("src", "http://lorempixel.com/400/400/cats/");
		// Explicitly set the width/height to minimize the number of reflows. For
		// a single image, this does not matter, but if you're going to embed
		// multiple external images in your page, then the absence of width/height
		// attributes causes the popup to resize multiple times.
		imageResult.appendChild(img);
});
