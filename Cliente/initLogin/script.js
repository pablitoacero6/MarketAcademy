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
            try { 
                if(elementTwo.hasAttribute('src') == true){
                    imgPop.setAttribute('src',elementFour.getAttribute('src'))
                }
            } catch (error) {
                
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


    cerrarPopup1.addEventListener('click', function() {
        overlay1.classList.remove('active');
        popup1.classList.remove('active');
    });
