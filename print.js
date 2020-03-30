import { motifs } from './util/motif.js'

const dateTimeOptions = {
	weekday: 'long',
	month: 'long',
	year: 'numeric',
	day: 'numeric'
};


const params = new URLSearchParams(location.search)
const edata = params.get('data');
const sdata = atob(edata);
const data = JSON.parse(sdata);

let nameField = document.getElementById('name');
let bornDataField = document.getElementById('born-date');
let addressField = document.getElementById('address');
let motifField = document.getElementById('motif');
let whereField = document.getElementById('where');
let whenField = document.getElementById('when');
let signField = document.getElementById('signature');

nameField.textContent = data.name;
bornDataField.textContent = new Intl.DateTimeFormat('fr-FR', dateTimeOptions)
	.format(new Date(data.born_date));
addressField.textContent = data.address
motifField.textContent = motifs[data.reason].long;
whereField.textContent = data.where;

if (data.when)
	whenField.textContent = data.when;

if (data.signature)
	signField.src = data.signature;
