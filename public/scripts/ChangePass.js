let myInput = document.getElementById("psw");
let myInput2 = document.getElementById("confpsw");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

myInput.onfocus = function() {
document.getElementById("message").style.display = "block";
}

myInput.onblur = function() {
document.getElementById("message").style.display = "none";
}

myInput.onkeyup = function() {
var lowerCaseLetters = /[a-z]/g;
if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
} else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

var upperCaseLetters = /[A-Z]/g;
if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
} else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
}

var numbers = /[0-9]/g;
if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
} else {
    number.classList.remove("valid");
    number.classList.add("invalid");
}

if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
} else {
    length.classList.remove("valid");
    length.classList.add("invalid");
}
}

let ptb = document.querySelectorAll(".pass_toggle_btn");
let ptbi = document.querySelectorAll(".ptb_icon");

ptb[0].addEventListener("click", function(){
    const type = myInput.getAttribute('type');
    if(type=='password'){
        myInput.setAttribute('type', 'text');
        ptbi[0].classList.remove('fa-eye');
        ptbi[0].classList.add('fa-eye-slash');
    }
    else{
        myInput.setAttribute('type', 'password');
        ptbi[0].classList.add('fa-eye');
        ptbi[0].classList.remove('fa-eye-slash');
    }
});

ptb[1].addEventListener("click", function(){
    const type = myInput2.getAttribute('type');
    if(type=='password'){
        myInput2.setAttribute('type', 'text');
        ptbi[1].classList.remove('fa-eye');
        ptbi[1].classList.add('fa-eye-slash');
    }
    else{
        myInput2.setAttribute('type', 'password');
        ptbi[1].classList.add('fa-eye');
        ptbi[1].classList.remove('fa-eye-slash');
    }
});

let op = document.querySelector("#oldpsw");
let opdb = document.querySelector("#oldpass").innerText;

function validatePassword(){
    if(myInput.value != myInput2.value) {  
        alert("New Password is not same as Confirm Password!")  
        return false;  
    } 

    if(op.value!=opdb){
        alert("Old password doesn't match the database password");
        return false; 
    }
}