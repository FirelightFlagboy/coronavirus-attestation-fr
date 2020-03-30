import { canvasAddEvents } from './util/canvas.js'
import { motifs } from './util/motif.js'

const date = new Date();
document.getElementById("created-when-date").value = date.toISOString('fr-FR').slice(0, 10)
document.getElementById("created-when-time").value = date.toLocaleTimeString('fr-FR')

/**
 * canvas part
 */
let canvas = document.getElementById("signature");
let clearSignCanvas = document.getElementById("clear-signature");

clearSignCanvas.addEventListener("click", (e) => {
	canvas.getContext("2d").clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
});

canvasAddEvents(canvas);

// /**
//  * submit part
//  */
// document.getElementById("form").addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	let name = document.getElementById('name').value;
// 	let born_date = document.getElementById('born_date').value;
// 	let address = document.getElementById('address').value;
// 	let reason = motifSelector.value;
// 	let make_at_town = document.getElementById('town').value;
// 	let at = includeCurrrentDate && document.getElementById('current-date').value;
// 	let signature_uri = includeSignature && canvas.toDataURL();

// 	let data = { name, born_date, address, reason, make_at_town, at, signature_uri };
// 	let bdata = btoa(JSON.stringify(data));
// 	let newURL = 'print.html?data=' + bdata;

// 	window.location.replace(newURL);
// });

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

function dateToTimestamp(date) {
	return new Date(date).getTime();
}

let reasonSelector = document.getElementById('reason');

let includeDateToggler = document.getElementById('include-date');
let includeTimeToggler = document.getElementById('include-time');
let includeSignToggler = document.getElementById('include-signature');

let toggleCreationDate = toggleDisplayGenerator(document.getElementById('created-date-box'));
let toggleCreationTime = toggleDisplayGenerator(document.getElementById('created-time-box'));
let toggleSignature = toggleDisplayGenerator(document.getElementById('sign-box'));

toggleCreationDate(includeDateToggler.checked);
toggleCreationTime(includeTimeToggler.checked);
toggleSignature(includeSignToggler.checked);

document.getElementById('name').addEventListener('change', onChangeGenerator(data));
document.getElementById('born-when').addEventListener('change', onChangeGenerator(data, dateToTimestamp));
document.getElementById('born-where').addEventListener('change', onChangeGenerator(data));
document.getElementById('residing').addEventListener('change', onChangeGenerator(data));

reasonSelector.addEventListener('change', onChangeGenerator(data));

document.getElementById('created-where').addEventListener('change', onChangeGenerator(data));
document.getElementById('created-when-date').addEventListener('change', onChangeGenerator(data, dateToTimestamp));
document.getElementById('created-when-time').addEventListener('change', onChangeGenerator(data, dateToTimestamp));

includeDateToggler.addEventListener('change', onChangeTogglerGenerator(toggleCreationDate));
includeTimeToggler.addEventListener('change', onChangeTogglerGenerator(toggleCreationTime));
includeSignToggler.addEventListener('change', onChangeTogglerGenerator(toggleSignature));

for (let motif in motifs) {
	const short = motifs[motif].short;
	let opt = document.createElement('option')
	opt.value = motif;
	opt.textContent = short;
	reasonSelector.appendChild(opt);
}
