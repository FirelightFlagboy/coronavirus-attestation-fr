import { canvasAddEvents } from './util/canvas.js'
import { motifs } from './util/motif.js'

/**
 * canvas part
 */
let canvas = document.getElementById("signature");
let clearSignCanvas = document.getElementById("clear-signature");

clearSignCanvas.addEventListener("click", (e) => {
	canvas.getContext("2d").clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
});

canvasAddEvents(canvas);

let data = {
	name: undefined,
	residing: undefined,
	reason: undefined,
	'born-where': undefined,
	'born-when': undefined,
	'created-where': undefined,
	'created-when-date': undefined,
	'created-when-time': undefined,
	signature: undefined,
};

/**
 *
 * @param {HTMLElement} element
 */
function toggleDisplayGenerator(element) {
	return (display) => {
		element.style.display = display ? "" : "none";
	}
}

/**
 *
 * @param {Function} callback
 */
function onChangeTogglerGenerator(callback) {
	return (e) => {
		callback(e.target.checked);
	}
}

/**
 *
 * @param {Object} data
 * @param {Function} format
 */
function onChangeGenerator(data, format = undefined) {
	if (format) {
		return (e) => {
			const { name, value } = e.target;

			data[name] = format(value);
			console.log(data);
		}
	}
	else {
		return (e) => {
			const { name, value } = e.target;

			data[name] = value;
			console.log(data);
		}
	}
}

/**
 *
 * @param {*} date an object that can be used by Date
 */
function dateToTimestamp(date) {
	const [year, month, day] = date.split('-');

	date = new Date(0);
	date.setFullYear(parseInt(year), parseInt(month) - 1, parseInt(day));
	return date.getTime();
}

/**
 *
 * @param {String} time
 */
function timeToTimestamp(time) {
	const [hours, minutes] = time.split(':');

	time = new Date(0)
	time.setHours(parseInt(hours));
	time.setMinutes(parseInt(minutes));
	return time.getTime();
}

let reasonSelector = document.getElementById('reason');

let includeDateToggler = document.getElementById('include-date');
let includeTimeToggler = document.getElementById('include-time');
let includeSignToggler = document.getElementById('include-signature');

let toggleCreationDate = toggleDisplayGenerator(document.getElementById('created-date-box'));
let toggleCreationTime = toggleDisplayGenerator(document.getElementById('created-time-box'));
let toggleSignature = toggleDisplayGenerator(document.getElementById('sign-box'));

let reasonText = document.getElementById('motif-detail');

const createdDateSelector = document.getElementById('created-when-date');
const createdTimeSelector = document.getElementById('created-when-time');

toggleCreationDate(includeDateToggler.checked);
toggleCreationTime(includeTimeToggler.checked);
toggleSignature(includeSignToggler.checked);

document.getElementById('name').addEventListener('change', onChangeGenerator(data));
document.getElementById('born-when').addEventListener('change', onChangeGenerator(data, dateToTimestamp));
document.getElementById('born-where').addEventListener('change', onChangeGenerator(data));
document.getElementById('residing').addEventListener('change', onChangeGenerator(data));

reasonSelector.addEventListener('change', onChangeGenerator(data, (reason) => {
	reasonText.textContent = motifs[reason].long;
	return reason;
}));

document.getElementById('created-where').addEventListener('change', onChangeGenerator(data));
createdDateSelector.addEventListener('change', onChangeGenerator(data, dateToTimestamp));
createdTimeSelector.addEventListener('change', onChangeGenerator(data, timeToTimestamp));

includeDateToggler.addEventListener('change', onChangeTogglerGenerator(toggleCreationDate));
includeTimeToggler.addEventListener('change', onChangeTogglerGenerator(toggleCreationTime));
includeSignToggler.addEventListener('change', onChangeTogglerGenerator(toggleSignature));

canvas.addEventListener('change', (e) => {
	data.signature = canvas.toDataURL();
	console.log(canvas.toDataURL());
})

for (let motif in motifs) {
	const short = motifs[motif].short;
	let opt = document.createElement('option')
	opt.value = motif;
	opt.textContent = short;
	reasonSelector.appendChild(opt);
}

document.getElementById('form').addEventListener('submit', (e) => {
	e.preventDefault();
	data["created-when-time"] = includeTimeToggler.checked && data["created-when-time"];
	data["created-when-date"] = includeDateToggler.checked && data["created-when-date"];
	data.signature = includeSignToggler.checked && data.signature;

	let bdata = btoa(JSON.stringify(data));
	let newURL = 'print.html?data=' + bdata;

	window.location.replace(newURL);
})

const date = new Date();

createdDateSelector.value = date.toISOString('fr-FR').slice(0, 10);
createdTimeSelector.value = date.toTimeString().slice(0, 5);

data["created-when-date"] = dateToTimestamp(createdDateSelector.value);
data["created-when-time"] = timeToTimestamp(createdTimeSelector.value);
