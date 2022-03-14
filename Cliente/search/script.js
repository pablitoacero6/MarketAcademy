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
