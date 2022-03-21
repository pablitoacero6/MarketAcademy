var sesionesTotales = document.getElementById('sesionesTotales')
var sesionesSemanales = document.getElementById('sesionesSemanales')
var numeroSesionesSemanales = 0

for (let index = 0; index < 100; index++) {
    var opcion = document.createElement('option')
    var contenidoOpcion = document.createTextNode(index)

    opcion.appendChild(contenidoOpcion)
    sesionesTotales.appendChild(opcion)        
}

for (let index = 0; index < 21; index++) {
    var opcion = document.createElement('option')
    var contenidoOpcion = document.createTextNode(index)

    opcion.appendChild(contenidoOpcion)
    sesionesSemanales.appendChild(opcion)        
}

function cambiarSesionesSemanalas() {
    const indice = sesionesSemanales.selectedIndex;
    if(indice === -1) return; // Esto es cuando no hay elementos
    const opcionSeleccionada = sesionesSemanales.options[indice].text;
    numeroSesionesSemanales = opcionSeleccionada
    console.log(numeroSesionesSemanales)
  };

function limpiarSeccion(){
    document.getElementById('numeroSesiones').innerHTML = '';
}

sesionesSemanales.addEventListener("change",
(evt) => {
    evt.preventDefault();
    limpiarSeccion();
    cambiarSesionesSemanalas();
    crearSeccion();
})

function rellenarSelect(n, listAdd, list){
    for (let index = 0; index < n; index++) {
        var opcion = document.createElement('option')
        var contenidoOpcion = document.createTextNode(listAdd[index])
    
        opcion.appendChild(contenidoOpcion)
        list.appendChild(opcion)        
    }
}

function crearSeccion(){

    var seccion = document.createElement('section')
    for (let index = 0; index < numeroSesionesSemanales; index++) {
        var titulo = document.createElement('h3')
        var contenidoTitulo = document.createTextNode('Sesion No. ' + (index+1))
        titulo.appendChild(contenidoTitulo)
    
        var division = document.createElement('div')

        var dia = document.createElement('p')
        var contenidoDia = document.createTextNode('Dia: ')
        dia.appendChild(contenidoDia)

        var diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
        var seleccionDia = document.createElement('select')
        rellenarSelect(7, diasSemana, seleccionDia)

        var hora = document.createElement('p')
        var contenidoHora = document.createTextNode('Hora: ')
        hora.appendChild(contenidoHora)

        var horas = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
        var seleccionHora = document.createElement('select')
        rellenarSelect(11,horas,seleccionHora)

        division.appendChild(dia)
        division.appendChild(seleccionDia)
        division.appendChild(hora)
        division.appendChild(seleccionHora)
        seccion.appendChild(titulo)
        seccion.appendChild(division)
        document.getElementById('numeroSesiones').appendChild(seccion)
    }
}
