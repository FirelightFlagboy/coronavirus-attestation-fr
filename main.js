document.getElementById("current-date").value = new Date().toISOString().substring(0, 10);

let signCanvas = document.getElementById("signature");

canvasAddEvents(signCanvas);
