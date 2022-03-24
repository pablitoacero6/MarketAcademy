var sesionesTotales = document.getElementById('sesionesTotales')
var sesionesSemanales = document.getElementById('sesionesSemanales')
var numeroSesionesSemanales = 0
var url = 'http://localhost:4000'

for (let index = 0; index < 100; index++) {
    var opcion = document.createElement('option')
    var contenidoOpcion = document.createTextNode(index)

    opcion.appendChild(contenidoOpcion)
    sesionesTotales.appendChild(opcion)        
}

function rellenarSelect(n, listAdd, list){
    for (let index = 0; index < n; index++) {
        var opcion = document.createElement('option')
        var contenidoOpcion = document.createTextNode(listAdd[index])
    
        opcion.appendChild(contenidoOpcion)
        list.appendChild(opcion)        
    }
}


//_---------------------------------------------------------------

/* llenar categorias */

fetch(url + "/categories").then(function(res) {
    return res.json();
}).then(function (json) {
    const body = document.getElementById('categoriesCourse');
    var count = Object.keys(json).length
    for (let index = 0; index < count; index++) {
        var option = document.createElement('option')
        var textOption = document.createTextNode(json[index].id +"-" +  json[index].category)
        option.appendChild(textOption)
        body.appendChild(option)
    }
})

/* extraer categoria */
var obtenerCategoriacurso = 0

function obtenerCategoria() {
    const indice = document.getElementById('categoriesCourse').selectedIndex;
    obtenerCategoriacurso = (document.getElementById('categoriesCourse').options[indice].text).substr(0,1);
  };

document.getElementById('categoriesCourse').addEventListener("change",
(evt) => {
    evt.preventDefault();
    obtenerCategoria();
})


/* extraer nivel */
var nivelCurso = ''
var userInit = localStorage.getItem('userInit')

function obtenerNivelCurso() {
    const indice = document.getElementById('levelCourse').selectedIndex;
    nivelCurso = (document.getElementById('levelCourse').options[indice].text).substr(0,1);
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
    fetch(url + "/createCourse", {
        method: 'POST',
        body: JSON.stringify({
            TITLE: document.getElementById('nameCourse').value,
            PRICE: document.getElementById('priceCourse').value,
            LEVEL: nivelCurso,
            PROFESSOR: userInit,
            CATEGORY: obtenerCategoriacurso,
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

document.getElementById('btnGuardarCurso').addEventListener('click', (evt) => {
    evt.preventDefault();
   matricular();  
})
