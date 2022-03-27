var view = document.getElementsByClassName("view"),
    imgPop = document.getElementById("imgBoxCreate"),
    overlay1 =document.getElementById("overlay1"),
    popup1 = document.getElementById("popup1"),
    cerrarPopup1 = document.getElementById("cerrarPopup1"),
    h1Box = document.getElementById('h1BoxCreate'),
    h3Box = document.getElementById('h3BoxCreate'),
    pBox = document.getElementById('pBoxCreate'),
    btnMtricula = document.getElementById('btnRegister'),
    url = 'http://localhost:4000',
    idStudentRegister = localStorage.getItem('userInit'),
    idCourseRegister = 0;


    /* PINTAR POPUP */

    function printElem(element){
        var views = element.childNodes;
        for (let index = 0; index < views.length; index++) {
            const elementTwo = views[index]
            try { 
                if(elementTwo.hasAttribute('src') == true){
                    imgPop.setAttribute('src',elementTwo.getAttribute('src'))
                }                
                
                if(elementTwo.hasAttribute('class') == true){
                    fetch(url + "/courses").then(function(res) {
                        return res.json();
                    }).then(function (json) {
                        const body = document.getElementById('popUpCurso');
                        body.innerHTML = ''
                        var count = Object.keys(json).length
                        for (let index = 0; index < count; index++) {
                            if(elementTwo.innerHTML == json[index].title){
                                idCourseRegister = json[index].id

                                var title = document.createElement('h1')
                                title.setAttribute('id', 'h1BoxCreate')
                                var textTitle  = document.createTextNode(json[index].title)
                                title.appendChild(textTitle)

                                var subtitle = document.createElement('h3')
                                subtitle.setAttribute('id', 'h3BoxCreate')
                                var textSubtitle  = document.createTextNode("Profesor: " + json[index].id_professor)
                                subtitle.appendChild(textSubtitle)

                                var par = document.createElement('p')
                                par.setAttribute('id','pBoxCreate')
                                var textPar  = document.createTextNode(json[index].description + 
                                    ".Costo: "+ json[index].price + " Calificacion: " + json[index].calification)
                                par.appendChild(textPar)

                                var textBtn = document.createTextNode('Adquirir')
                                btnMtricula.appendChild(textBtn)

                                body.appendChild(title)
                                body.appendChild(subtitle)
                                body.appendChild(par)
                                body.appendChild(btnMtricula)
                            }
                        }
                    })
                }
            } catch (error) {  
            }
        }
    }

    function activateClick(){
        for (let index = 0; index < view.length; index++) {        
            view[index].addEventListener('click', function() {
                overlay1.classList.add('active');
                popup1.classList.add('active');
                console.log(h1Box.value)
                printElem(view[index]); 
            });  
        }

        cerrarPopup1.addEventListener('click', function() {
            overlay1.classList.remove('active');
            popup1.classList.remove('active');
        });
    }   


    

    /* PONER CURSOS EN EL INICIO */


fetch(url + "/recommended" , {
    method: 'POST',
    body: JSON.stringify({
        userId: localStorage.getItem('userInit')
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then(function(res) {
    return res.json();
}).then(function (json) {
    const body = document.getElementById('center');
    var count = Object.keys(json).length
    for (let index = 0; index < count; index++) {
        var div = document.createElement('div')
        var link = document.createElement('a')
        link.setAttribute('class', 'view')
        link.setAttribute('href','#')

        var img = document.createElement('img')
        console.log(json[index].img)
            if(json[index].img == null){
                img.setAttribute('src','../../img/img1.png')
            }else{
                console.log(json[index].img)
                img.setAttribute('src',json[index].img)
            }
        
        var subtitle = document.createElement('h3')
        subtitle.setAttribute('class', '')
        var textSubtitle  = document.createTextNode(json[index].title)
        subtitle.appendChild(textSubtitle)

        var par = document.createElement('p')
        var textPar  = document.createTextNode(json[index].description)
        par.appendChild(textPar)

        link.appendChild(img)
        link.appendChild(subtitle)
        link.appendChild(par)
        div.appendChild(link);
        body.appendChild(div);
    }

    activateClick();
})


/* crear matricula */

function matricular(){
    fetch(url + "/register", {
        method: 'POST',
        body: JSON.stringify({
            ID_STUDENT: idStudentRegister,
            ID_COURSE: idCourseRegister
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

document.getElementById('linkSearch').addEventListener('click', (evt) => {
    evt.preventDefault();
    localStorage.setItem('wordSearch',document.getElementById('searchInput').value)
    location.href="../search/index.html"
})
    