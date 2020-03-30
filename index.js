let motif_detail = {
	"": "",
	"work": "Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle, lorsqu’ils sont indispensables à l’exercice d’activités ne pouvant être organisées sous forme de télétravail ou déplacements professionnels ne pouvant être différés.",
	"basic": "Déplacements pour effectuer des achats de fournitures nécessaires à l’activité professionnelle et des achats de première nécessité dans des établissements dont les activités demeurent autorisées (liste sur gouvernement.fr).",
	"health": "Consultations et soins ne pouvant être assurés à distance et ne pouvant être différés ; consultations et soins des patients atteints d'une affection de longue durée.",
	"family": "Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables ou la garde d’enfants.",
	"trip": "Déplacements brefs, dans la limite d'une heure quotidienne et dans un rayon maximal d'un kilomètre autour du domicile, liés soit à l'activité physique individuelle des personnes, à l'exclusion de toute pratique sportive collective et de toute proximité avec d'autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie.",
	"judicial": "Convocation judiciaire ou administrative.",
	"mig": "Participation à des missions d’intérêt général sur demande de l’autorité administrative.",
}

document.getElementById("current-date").value = new Date().toLocaleString('fr-FR')

/**
 * canvas part
 */
let canvas = document.getElementById("signature");
let clearSignCanvas = document.getElementById("clear-signature");

clearSignCanvas.addEventListener("click", (e) => {
	canvas.getContext("2d").clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
});

canvasAddEvents(canvas);

/**
 * motif part
 */
let motifDetailText = document.getElementById("motif-detail");
let motifSelector = document.getElementById('motif');

motifSelector.addEventListener('change', (e) => {
	let value = e.target.value;
	motifDetailText.textContent = motif_detail[value];
})

/**
 * check box part
 */
let checkSign = document.getElementById('include-signature');
let signBox = document.getElementById('sign-box');
let includeSignature = checkSign.checked;

let checkDate = document.getElementById('include-date');
let currentDateBox = document.getElementById('current-date-box');
let includeCurrrentDate = checkDate.checked;

/**
 *
 * @param {HTMLElement} element
 * @param {boolean} display
 */
function updateElementDisplay(element, display) {
	if (display)
		element.style.display = "";
	else
		element.style.display = "none";
}

updateElementDisplay(signBox, includeSignature);
updateElementDisplay(currentDateBox, includeCurrrentDate);

checkSign.addEventListener('change', (e) => {
	includeSignature = e.target.checked;
	updateElementDisplay(signBox, includeSignature);
});

checkDate.addEventListener('change', (e) => {
	includeCurrrentDate = e.target.checked;
	updateElementDisplay(currentDateBox, includeCurrrentDate);
});

/**
 * submit part
 */
document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault();
	let name = document.getElementById('name').value;
	let born_date = document.getElementById('born_date').value;
	let address = document.getElementById('address').value;
	let reason = motifSelector.value;
	let make_at_town = document.getElementById('town').value;
	let at = includeCurrrentDate && document.getElementById('current-date').value;
	let signature_uri = includeSignature && canvas.toDataURL();

	let data = { name, born_date, address, reason, make_at_town, at, signature_uri };
	let bdata = btoa(JSON.stringify(data));
	let newURL = 'print.html?data=' + bdata;

	window.location.replace(newURL);
});
