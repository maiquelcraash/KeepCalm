const btn = document.getElementById("clear");
const textarea = document.getElementById("text");

btn.addEventListener("click", () => {
	textarea.value = "";
	textarea.focus();
});
