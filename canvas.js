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

	canvas.addEventListener("mousedown", beginDraw);
	canvas.addEventListener("mouseup", stopDrawing);
	canvas.addEventListener("mouseout", stopDrawing);
	canvas.addEventListener("mousemove", updateDraw);
}

function beginDraw(e) {
	let canvas = e.target;
	let ctx = canvas.ctx;

	updateCoordinate(canvas, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

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

function updateDraw(e) {
	let canvas = e.target;
	let ctx = canvas.ctx;

	if (canvas.drawing !== true)
		return;
	updateCoordinate(canvas, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
	ctx.beginPath();
	ctx.moveTo(canvas.prevX, canvas.prevY);
	ctx.lineTo(canvas.currX, canvas.currY);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.closePath();
}
