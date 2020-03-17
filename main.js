document.getElementById("current-date").value = new Date().toISOString().substring(0, 10);

let canvas = document.getElementById("signature");
let clearSignCanvas = document.getElementById("clear-signature");

document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	window.print();
});

clearSignCanvas.addEventListener("click", (e) => {
	canvas.getContext("2d").clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
});

canvasAddEvents(canvas);
