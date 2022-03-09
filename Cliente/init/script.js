var registerStudent = document.getElementById("registerStudent"),
    registerTeacher = document.getElementById("registerTeacher"),
    overlay1 =document.getElementById("overlay1"),
    overlay2 =document.getElementById("overlay2"),
    popup1 = document.getElementById("popup1"),
    popup2 = document.getElementById("popup2"),
    cerrarPopup1 = document.getElementById("cerrarPopup1"),
    cerrarPopup2 = document.getElementById("cerrarPopup2");

    registerStudent.addEventListener('click', function() {
        overlay1.classList.add('active');
        popup1.classList.add('active');
    });

    registerTeacher.addEventListener('click', function(){
        overlay2.classList.add('active');
        popup2.classList.add('active');
    });

    cerrarPopup1.addEventListener('click', function() {
        overlay1.classList.remove('active');
        popup1.classList.remove('active');
    });

    cerrarPopup2.addEventListener('click', function() {
        overlay2.classList.remove('active');
        popup2.classList.remove('active');
    });