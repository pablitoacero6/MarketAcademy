var url = "http://localhost:3000";

/* LOGIN */

var data = {
    username: document.getElementById("userInit").value,
    password: document.getElementById("password").value
};

function verifyInit(){
    fetch(url + "/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error in login', error))
    .then(response => console.log('Success in login', response));
}

document.getElementById("initSession").addEventListener("click", 
(evt) => {
    evt.preventDefault();
    verifyInit();
})

