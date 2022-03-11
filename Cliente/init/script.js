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

