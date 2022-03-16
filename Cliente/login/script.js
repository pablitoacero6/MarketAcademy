const loginButton = document.getElementById('initSession')
var tipoUsuarioLogin = ''
var var_cod_login = 0
const url = 'http://localhost:3000'

/* OBTENER TIPO USUARIO */

function obtenerTipoUsuario() {
    const indice = document.getElementById('tipoUsuarioLista').selectedIndex;
    tipoUsuarioLogin = document.getElementById('tipoUsuarioLista').options[indice].text;
  };

document.getElementById('tipoUsuarioLista').addEventListener("change",
(evt) => {
    evt.preventDefault();
    obtenerTipoUsuario();
})

/* CAMBIAR TIPO A COD DE USUARIO */

function cambiarCod(){
    if(tipoUsuarioLogin == 'Estudiante'){
        var_cod_login = 0
    }else if(tipoUsuarioLogin == 'Profesor'){
        var_cod_login = 1
    }else if(tipoUsuarioLogin == 'Administrador'){
        var_cod_login = 2
    }
}


/* LOGIN VERFICADO */

function cambiarInterfaz(code){
    if(code == 201){
        let targetURL = '../student/initLogin/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }else if(code == 202){
        let targetURL = '../teacher/initTeacher/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }else if(code == 203){
        let targetURL = '../initLogin/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }
}

function login(){
    fetch(url + "/login", {
        method: 'POST',
        body: JSON.stringify({
            USUARIO_LOGIN: document.getElementById('userInit').value ,
            CONTRASEÑA_LOGIN: document.getElementById('password').value,
            CODIGO_LOGIN: var_cod_login,
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error: ', error))
    .then(response => {
        return cambiarInterfaz(response)
    })
}

document.getElementById("initSession").addEventListener("click", 
(evt) => {
    evt.preventDefault();
    cambiarCod()
    login();
})


/*

function loginSinVerificacion(){
    if(tipoUsuarioLogin == 'Estudiante'){
        let targetURL = '../student/initLogin/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }else if(tipoUsuarioLogin == 'Profesor'){
        let targetURL = '../teacher/initTeacher/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }else if(tipoUsuarioLogin == 'Administrador'){
        let targetURL = '../initLogin/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }
} */