var body = document.getElementById('center')
var view = document.getElementsByClassName("view")
var btnEnd = document.getElementById('btnRegister')
var imgPop = document.getElementById('imgBoxCreate')
var inputB = document.getElementById('inputBoxCreate')
var idCourseRegister = 0

var btnEndCourse = ''
var url = 'http://localhost:4000'

fetch(url + "/coursesStudent" , {
    method: 'POST',
    body: JSON.stringify({
        ID_STUDENT: localStorage.getItem('userInit')
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then(function(res) {
    return res.json();
}).then(function (json) {
    console.log(localStorage.getItem('userInit') + json)
    var count = Object.keys(json).length
    for (let index = 0; index < count; index++) {
        var ul = document.createElement('ul')
        var link = document.createElement('a')
        link.setAttribute('class', 'view')
        link.setAttribute('href','#')
        var li = document.createElement('li')
        var div = document.createElement('div')
        div.setAttribute('id','divHistory')

        var img = document.createElement('img')
            if(json[index].img == null){
                img.setAttribute('src','../../img/img1.png')
            }else{
                console.log(json[index].img)
                img.setAttribute('src',"../" + json[index].img)
            }
    
        var title = document.createElement('h1')
        title.setAttribute('id', 'h1History')
        title.setAttribute('class','')
        var textTitle  = document.createTextNode(json[index].title)
        title.appendChild(textTitle)
    
        var subtitle = document.createElement('h3')
        subtitle.setAttribute('id', 'h3History')
        var textSubtitle  = document.createTextNode("Costo: "+json[index].price)
        subtitle.appendChild(textSubtitle)

        var par = document.createElement('p')
        par.setAttribute('id','pHistory')
        var textPar  = document.createTextNode(json[index].description + 
            "Calificacion: " + json[index].calification)
        par.appendChild(textPar)

        btnEndCourse = document.createElement('button')
        btnEndCourse.setAttribute('id','btnRegister')
        var btnText = document.createTextNode('Finalizar')
        btnEndCourse.appendChild(btnText)
        
        li.appendChild(img)
        div.appendChild(title)
        div.appendChild(subtitle)
        div.appendChild(par)
        div.appendChild(btnEndCourse)
        li.appendChild(div)
        link.appendChild(li)
        ul.appendChild(link);
        body.appendChild(ul);
    }
    activateClick()
})

function activateClick(){
    for (let index = 0; index < view.length; index++) {        
        view[index].addEventListener('click', function() {
            overlay1.classList.add('active');
            popup1.classList.add('active');
            printElem(view[index]); 
        });  
    }

    cerrarPopup1.addEventListener('click', function() {
        overlay1.classList.remove('active');
        popup1.classList.remove('active');
    });
}   

function finalizarCurso(){
    fetch(url + "/endCourse", {
        method: 'POST',
        body: JSON.stringify({
            ID_STUDENT:localStorage.getItem('userInit'),
            ID_COURSE:idCourseRegister,
            CALIFICATION: document.getElementById('inputBoxCreate').value
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

document.getElementById('btnRegister').addEventListener('click', (evt) => {
    evt.preventDefault();
   finalizarCurso();  
})


   /* PINTAR POPUP */

   function printElem(element){
    var views = element.childNodes;
    for (let index = 0; index < views.length; index++) {
        const elementTwo = views[index]
        var ele = elementTwo.childNodes
        for (let i = 0; i < ele.length; i++) {
            const elementThree = ele[i];
            
            try {
                if(elementThree.hasAttribute('src') == true){
                    console.log(elementThree)
                    imgPop.setAttribute('src',elementThree.getAttribute('src'))
                } 
            } catch (error) {
                
            }
            var elementFour = elementThree.childNodes
            for (let j = 0; j < elementFour.length; j++) {
                const element = elementFour[j];
                console.log(element)

                try { 
                                   
                    if(element.hasAttribute('class') == true){
                        fetch(url + "/courses").then(function(res) {
                            return res.json();
                        }).then(function (json) {
                            const body = document.getElementById('popUpCurso');
                            body.innerHTML = ''
                            var count = Object.keys(json).length
                            for (let index = 0; index < count; index++) {
                                if(element.innerHTML == json[index].title){
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

                                    
                                    var textBtn = document.createTextNode('Terminar curso')
                                    btnEnd.appendChild(textBtn)
        
                                    body.appendChild(title)
                                    body.appendChild(subtitle)
                                    body.appendChild(par)
                                    body.appendChild(inputB)
                                    body.appendChild(btnEnd)
                                }
                            }
                        })
                    }
                } catch (error) {  
                }
                
            }
        }        
    }
}