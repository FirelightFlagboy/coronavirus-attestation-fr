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
let bornWhenField = document.getElementById('born-when');
let bornWhereField = document.getElementById('born-where');
let residingField = document.getElementById('residing');
let motifField = document.getElementById('motif');
let whereField = document.getElementById('where');
let whenDateField = document.getElementById('when-date');
let whenTimeField = document.getElementById('when-time');
let signField = document.getElementById('signature');

nameField.textContent = data.name;
bornWhenField.textContent = new Date(data['born-when']).toLocaleDateString();
bornWhereField.textContent = data['born-where']
residingField.textContent = data.residing
motifField.textContent = motifs[data.reason].long;
whereField.textContent = data['created-where'];

if (data['created-when-date']) {
	whenDateField.textContent = new Date(data['created-when-date']).toLocaleDateString();
}

if (data['created-when-time']) {
	whenTimeField.textContent = new Date(data['created-when-time']).toLocaleTimeString();
}

if (data.signature)
	signField.src = data.signature;

window.onload = () => {
	window.print();
}
