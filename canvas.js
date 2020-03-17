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

	canvas.addEventListener("mousedown", mouseBeginDraw);
	canvas.addEventListener("mousemove", mouseUpdateDraw);
	canvas.addEventListener("mouseup", stopDrawing);
	canvas.addEventListener("mouseout", stopDrawing);

	canvas.addEventListener("touchstart", touchBeginDraw, false);
	canvas.addEventListener("touchmove", touchUpdateDraw, false);
	canvas.addEventListener("touchcancel", touchStopDraw, false);
	canvas.addEventListener("touchleave", touchStopDraw, false);
	canvas.addEventListener("touchend", touchStopDraw, false);
}

function mouseBeginDraw(e) {
	beginDraw(e.target, e.clientX, e.clientY);
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

function mouseUpdateDraw(e) {
	updateDraw(e.target, e.clientX, e.clientY);
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


function stopDrawing(e) {
	e.target.drawing = false;
}

function touchBeginDraw(e) {
	disableScroll();
	beginDraw(e.target, e.touches[0].pageX, e.touches[0].pageY);
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

function touchUpdateDraw(e) {
	updateDraw(e.target, e.touches[0].pageX, e.touches[0].pageY);
}

function touchStopDraw(e) {
	enableScroll();
	stopDrawing(e);
}

function enableScroll() {
	window.onscroll = () => { };
}
