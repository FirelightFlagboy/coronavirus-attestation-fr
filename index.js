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
//  * motif part
//  */
// let motifDetailText = document.getElementById("motif-detail");
// let motifSelector = document.getElementById('motif');

// motifSelector.addEventListener('change', (e) => {
// 	let value = e.target.value;
// 	motifDetailText.textContent = motif_detail[value];
// })

// /**
//  * check box part
//  */
// let checkSign = document.getElementById('include-signature');
// let signBox = document.getElementById('sign-box');
// let includeSignature = checkSign.checked;

// let checkDate = document.getElementById('include-date');
// let currentDateBox = document.getElementById('current-date-box');
// let includeCurrrentDate = checkDate.checked;

// /**
//  *
//  * @param {HTMLElement} element
//  * @param {boolean} display
//  */
// function updateElementDisplay(element, display) {
// 	if (display)
// 		element.style.display = "";
// 	else
// 		element.style.display = "none";
// }

// updateElementDisplay(signBox, includeSignature);
// updateElementDisplay(currentDateBox, includeCurrrentDate);

// checkSign.addEventListener('change', (e) => {
// 	includeSignature = e.target.checked;
// 	updateElementDisplay(signBox, includeSignature);
// });

// checkDate.addEventListener('change', (e) => {
// 	includeCurrrentDate = e.target.checked;
// 	updateElementDisplay(currentDateBox, includeCurrrentDate);
// });

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
	'created-when': undefined,
	signature: undefined,
};

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

document.getElementById('name').addEventListener('change', onChangeGenerator(data));
document.getElementById('born-when').addEventListener('change', onChangeGenerator(data, dateToTimestamp));
document.getElementById('born-where').addEventListener('change', onChangeGenerator(data));
document.getElementById('residing').addEventListener('change', onChangeGenerator(data));

reasonSelector.addEventListener('change', onChangeGenerator(data));

document.getElementById('created-where').addEventListener('change', onChangeGenerator(data));
document.getElementById('created-when').addEventListener('change', onChangeGenerator(data, dateToTimestamp));

for (let motif in motifs) {
	const short = motifs[motif].short;
	let opt = document.createElement('option')
	opt.value = motif;
	opt.textContent = short;
	reasonSelector.appendChild(opt);
}
