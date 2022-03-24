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
    crearSeccionSesionesSemanales();
})

function rellenarSelect(n, listAdd, list){
    for (let index = 0; index < n; index++) {
        var opcion = document.createElement('option')
        var contenidoOpcion = document.createTextNode(listAdd[index])
    
        opcion.appendChild(contenidoOpcion)
        list.appendChild(opcion)        
    }
}

function crearSeccionSesionesSemanales(){

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


//palabras claves

var bodyCount = document.getElementById('noPalabras')
var numeroPalabrasClaves = 0

for (let i = 0; i < 15; i++) {
    var opcion = document.createElement('option')
    var contenidoOpcion = document.createTextNode(i)

    opcion.appendChild(contenidoOpcion)
    bodyCount.appendChild(opcion)     
}

function cambiarCantidadPalabrasClaves() {
    const indice = bodyCount.selectedIndex;
    if(indice === -1) return; // Esto es cuando no hay elementos
    const opcionSeleccionada = bodyCount.options[indice].text;
    numeroPalabrasClaves = opcionSeleccionada
  };

function limpiarSeccionPalabrasClave(){
    document.getElementById('sectionPalabrasClave').innerHTML = '';
}

bodyCount.addEventListener("change",
(evt) => {
    evt.preventDefault();
    limpiarSeccionPalabrasClave();
    cambiarCantidadPalabrasClaves();
    crearSeccionPalabrasClaves();
})

function crearSeccionPalabrasClaves(){

    var seccion = document.createElement('section')
    for (let index = 0; index < numeroPalabrasClaves; index++) {
        var titulo = document.createElement('h3')
        var contenidoTitulo = document.createTextNode('Palabra clave No. ' + (index+1))
        titulo.appendChild(contenidoTitulo)
    
        var division = document.createElement('div')

        var dia = document.createElement('p')
        var contenidoDia = document.createTextNode('Palabra: ')
        dia.appendChild(contenidoDia)

        var diasSemana = document.createElement('input')


        division.appendChild(dia)
        division.appendChild(diasSemana)
        seccion.appendChild(titulo)
        seccion.appendChild(division)
        document.getElementById('sectionPalabrasClave').appendChild(seccion)
    }
}

//_---------------------------------------------------------------

/* extraer nivel */
var nivelCurso = ''
var userInit = localStorage.getItem('userInit')

function obtenerNivelCurso() {
    const indice = document.getElementById('levelCourse').selectedIndex;
    nivelCurso = document.getElementById('levelCourse').options[indice].text;
  };

document.getElementById('levelCourse').addEventListener("change",
(evt) => {
    evt.preventDefault();
    obtenerNivelCurso();
})

/* extraer duracion */
var duracionCurso = ''

function obtenerDuracionCurso() {
    const indice = document.getElementById('sesionesTotales').selectedIndex;
    duracionCurso = document.getElementById('sesionesTotales').options[indice].text;
  };

document.getElementById('sesionesTotales').addEventListener("change",
(evt) => {
    evt.preventDefault();
    obtenerDuracionCurso();
})


/* realizar registro curso */


function matricular(){
    fetch(url + "/register", {
        method: 'POST',
        body: JSON.stringify({
            TITLE: document.getElementById('nameCourse').value,
            PRICE: document.getElementById('priceCourse').value,
            LEVEL: nivelCurso,
            PROFESSOR: userInit,
            CATEGORY: null,
            IMG: null,
            DURATION: duracionCurso,
            DESCRIPTION: document.getElementById('descriptionCourse').value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
        return console.log('Success: ', response);
    })
}

btnMtricula.addEventListener('click', (evt) => {
    evt.preventDefault();
   matricular();  
})
