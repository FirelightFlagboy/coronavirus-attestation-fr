/**
 * @param {HTMLCanvasElement} canvas
 */
function canvasAddEvents(canvas) {
	canvas.ctx = canvas.getContext("2d");
	canvas.prevX = 0;
	canvas.currX = 0;
	canvas.prevY = 0;
	canvas.currY = 0;
	canvas.drawing = false;

	canvas.addEventListener("mousedown", (e) => beginDraw(e.target, e.clientX, e.clientY));
	canvas.addEventListener("mouseup", stopDrawing);
	canvas.addEventListener("mouseout", stopDrawing);
	canvas.addEventListener("mousemove", (e) => updateDraw(e.target, e.clientX, e.clientY));

	canvas.addEventListener("touchstart", (e) => {
		disableScroll();
		beginDraw(e.target, e.touches[0].pageX, e.touches[0].pageY);
	}, false);
	canvas.addEventListener("touchmove", (e) => updateDraw(e.target, e.touches[0].pageX, e.touches[0].pageY), false);
	canvas.addEventListener("touchcancel", (e) => {
		enableScroll();
		stopDrawing(e);
	}, false);
	canvas.addEventListener("touchleave", (e) => {
		enableScroll();
		stopDrawing(e);
	}, false);
	canvas.addEventListener("touchend", (e) => {
		enableScroll();
		stopDrawing(e);
	}, false);
}

function disableScroll() {
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	window.onscroll = function (e) {
		e.preventDefault()
		e.stopPropagation();
		window.scrollTo(scrollLeft, scrollTop);
	}
}

function enableScroll() {
	window.onscroll = () => { };
}

function beginDraw(canvas, x, y) {
	let ctx = canvas.ctx;

	updateCoordinate(canvas, x - canvas.offsetLeft, y - canvas.offsetTop);

	canvas.drawing = true;

	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.fillRect(canvas.currX, canvas.currY, 2, 2);
	ctx.closePath();
}

function updateCoordinate(canvas, x, y) {
	canvas.prevX = canvas.currX;
	canvas.prevY = canvas.currY;
	canvas.currX = x;
	canvas.currY = y;
}

function stopDrawing(e) {
	e.target.drawing = false;
}

function updateDraw(canvas, x, y) {
	let ctx = canvas.ctx;

	if (canvas.drawing !== true)
		return;
	updateCoordinate(canvas, x - canvas.offsetLeft, y - canvas.offsetTop);
	ctx.beginPath();
	ctx.moveTo(canvas.prevX, canvas.prevY);
	ctx.lineTo(canvas.currX, canvas.currY);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();
}
