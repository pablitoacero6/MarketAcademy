var registerStudent = document.getElementById("registerStudent"),
    overlay1 =document.getElementById("overlay1"),
    popup1 = document.getElementById("popup1"),
    cerrarPopup1 = document.getElementById("cerrarPopup1");

    /* POPUP */

    registerStudent.addEventListener('click', function() {
        overlay1.classList.add('active');
        popup1.classList.add('active');
    });

    cerrarPopup1.addEventListener('click', function() {
        overlay1.classList.remove('active');
        popup1.classList.remove('active');
    });


    //------------------------------------

    /* seleccionar estudiante o profesor */
    var seleccionUsuario = 0 

    function seleccion() {
        const indice = document.getElementById('selectionOption').selectedIndex;
        if(indice === -1) return; // Esto es cuando no hay elementos
        const opcionSeleccionada = document.getElementById('selectionOption').options[indice].text;
        if(opcionSeleccionada == 'Estudiante'){
            seleccionUsuario = 0
        }else if(opcionSeleccionada == 'Profesor'){
            seleccionUsuario = 1
        }
      };
    
    document.getElementById('selectionOption').addEventListener("change",
    (evt) => {
        evt.preventDefault();
        seleccion();
    })

    /* Asignar peticion respecto a seleccion de estudiante o profesor */
    
    document.getElementById("saveCreateClient").addEventListener("click", 
    (evt) => {
        evt.preventDefault();
        if(seleccionUsuario == 0){
            crearEstudiante()
        }else if(seleccionUsuario == 1){
            crearProfesor()
        }
    })

    /* peticion Crear estudiante */

    function crearEstudiante(){
        fetch(url + "/createStudent", {
            method: 'POST',
            body: JSON.stringify({
                ID_STUDENT: document.getElementById('noDocumento'),
                NAME_STUDENT: document.getElementById('nombresRegistro'),
                MAIL_STUDENT: document.getElementById('correoRegistro'),
                PASSWORD_STUDENT: document.getElementById('contraseñaRegistro')
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

    /* peticion crear profesor */
    
    function crearProfesor(){
        fetch(url + "/createTeacher", {
            method: 'POST',
            body: JSON.stringify({
                ID_TEACHER: document.getElementById('noDocumento'),
                NAME_TEACHER: document.getElementById('nombresRegistro'),
                MAIL_TEACHER: document.getElementById('correoRegistro'),
                PASSWORD_TEACHER: document.getElementById('contraseñaRegistro')
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
