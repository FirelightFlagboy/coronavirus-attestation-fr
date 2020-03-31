/**
 * @param {HTMLCanvasElement} canvas
 */
export function canvasAddEvents(canvas) {
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
	beginDraw(e.target, e.pageX, e.pageY);
}

function beginDraw(canvas, x, y) {
	let ctx = canvas.getContext('2d');
	canvas.ctx = ctx;

	updateCoordinate(canvas, x - canvas.offsetLeft, y - canvas.offsetTop);

	canvas.drawing = true;

	ctx.beginPath();
	ctx.moveTo(canvas.currX, canvas.currY, 2, 2);
}

function updateCoordinate(canvas, x, y) {
	canvas.prevX = canvas.currX;
	canvas.prevY = canvas.currY;
	canvas.currX = x;
	canvas.currY = y;
}

function mouseUpdateDraw(e) {
	updateDraw(e.target, e.pageX, e.pageY);
}

function updateDraw(canvas, x, y) {
	let ctx = canvas.ctx;

	if (canvas.drawing !== true)
		return;
	updateCoordinate(canvas, x - canvas.offsetLeft, y - canvas.offsetTop);
	ctx.lineTo(canvas.currX, canvas.currY);
	ctx.stroke();
}


function stopDrawing(e) {
	const raiseEvent = e.target.drawing === true;

	e.target.ctx.closePath();
	e.target.drawing = false;
	if (raiseEvent) {
		let ne = document.createEvent("HTMLEvents");
		ne.initEvent('change', true, true);
		ne.eventName = 'change';
		e.target.dispatchEvent(ne);
	}
}

function touchBeginDraw(e) {
	e.preventDefault();
	beginDraw(e.target, e.touches[0].pageX, e.touches[0].pageY);
}

function touchUpdateDraw(e) {
	e.preventDefault();
	updateDraw(e.target, e.touches[0].pageX, e.touches[0].pageY);
}

function touchStopDraw(e) {
	stopDrawing(e);
}
