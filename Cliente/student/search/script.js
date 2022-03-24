var view = document.getElementsByClassName("view"),
    imgPop = document.getElementById("imgBoxCreate"),
    overlay1 =document.getElementById("overlay1"),
    popup1 = document.getElementById("popup1"),
    cerrarPopup1 = document.getElementById("cerrarPopup1"),
    h1Box = document.getElementById('h1BoxCreate'),
    h3Box = document.getElementById('h3BoxCreate'),
    pBox = document.getElementById('pBoxCreate');


    /* PINTAR POPUP */

    function printElem(element){
        var views = element.childNodes;
        for (let index = 0; index < views.length; index++) {
            const elementTwo = views[index]
            if((elementTwo.childNodes).length >0){
                const elementThree = elementTwo.childNodes
                for (let index = 0; index < elementThree.length; index++) {
                    const elementFour = elementThree[index]; 
                    try { 
                        if(elementFour.hasAttribute('src') == true){
                            imgPop.setAttribute('src',elementFour.getAttribute('src'))
                        }else if(elementFour.getAttribute('id') == 'divHistory'){
                            const elementFive = elementFour.childNodes
                            for (let index = 0; index < elementFive.length; index++) {
                                const elementSix = elementFive[index];
                                console.log(elementSix)
                                /*if(elementSix.getAttribute('id') == 'h1History'){
                                    
                                }else if(elementSix.getAttribute('id') == 'h3History'){

                                }else if(elementSix.getAttribute('pHistory') == 'pHistory'){

                                }*/
                            }
                        }
                    } catch (error) {
                        
                    }
                }
            }
        }
    }

    for (let index = 0; index < view.length; index++) {        
        view[index].addEventListener('click', function() {
            overlay1.classList.add('active');
            popup1.classList.add('active');
            printElem(view[index]); 
        });  
    }


    /* POPUP 

    view.addEventListener('click', function() {
        overlay1.classList.add('active');
        popup1.classList.add('active');
        printElem();
    }); */

    cerrarPopup1.addEventListener('click', function() {
        overlay1.classList.remove('active');
        popup1.classList.remove('active');
    });

    /* realizar busqueda */
var url = 'http://localhost:4000'
const body = document.getElementById('history');

console.log(localStorage.getItem('wordSearch'))
fetch(url + "/search", {    
    method: 'POST',
    body: JSON.stringify({
        SEARCH: localStorage.getItem('wordSearch')
    }),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}).then(res => res.json())
.catch(error => console.error('Error: ', error))
.then(function(json) {
    body.innerHTML = ''
    var count = Object.keys(json).length
    for (let index = 0; index < count; index++) {
            idCourseRegister = json[index].id

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
                    img.setAttribute('src',json[index].img)
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
            
            li.appendChild(img)
            div.appendChild(title)
            div.appendChild(subtitle)
            div.appendChild(par)
            li.appendChild(div)
            link.appendChild(li)
            ul.appendChild(link);
            body.appendChild(ul);
    }
})

