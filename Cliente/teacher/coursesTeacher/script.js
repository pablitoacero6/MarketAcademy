var sesionesTotales = document.getElementById('sesionesTotales')

var editCodClient = 000;

for (let index = 0; index < 100; index++) {
    var opcion = document.createElement('option')
    var contenidoOpcion = document.createTextNode(index)

    opcion.appendChild(contenidoOpcion)
    sesionesTotales.appendChild(opcion)        
}



function cambiarSesionesSemanalas() {
    const indice = sesionesTotales.selectedIndex;
    if(indice === -1) return; // Esto es cuando no hay elementos
    const opcionSeleccionada = sesionesTotales.options[indice].text;
    editCodClient = opcionSeleccionada
  };

document.getElementById('ClientList').addEventListener("change",
(evt) => {
    evt.preventDefault();
    opcionSeleccionadEditar();
})