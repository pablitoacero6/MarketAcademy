const loginButton = document.getElementById('initSession')
var tipoUsuarioLogin = ''

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

/* HACER LOGIN */

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