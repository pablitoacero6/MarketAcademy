const loginButton = document.getElementById('initSession')
var tipoUsuarioLogin = ''
var var_cod_login = 0



/* HACER LOGIN 

function login(){
    if(tipoUsuarioLogin == 'Estudiante'){
        let targetURL = '../initLogin/index.html';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    }else if(tipoUsuarioLogin == 'Profesor'){
        location.href("../initLogin/index.html")
    }else if(tipoUsuarioLogin == 'Administrador'){
        location.href('../initLogin/index.html')
    }
}

loginButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    login()
})

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
        return console.log('Success: ', response);
    })
}

document.getElementById("initSession").addEventListener("click", 
(evt) => {
    evt.preventDefault();
    cambiarCod()
    login();
})