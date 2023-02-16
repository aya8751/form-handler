// "use strict"
const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// handle error
const showError = function(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector(".err-msg");
    small.innerText = message;
}

// handle success
const showSuccess = function(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check email vaildation
const checkEmail = function(email){
    const filter =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(filter.test(email.value.trim())){
        showSuccess(email);
    }else{
        showError(email, "Email is not vaild");
    }
}

// make first litter UpperCase
const formatWord = function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}
// handle reqiured
const checkRequired = function(inputArr){
    let isRequired = false;
    inputArr.forEach(input => {
        if(input.value.trim() === ""){
            showError(input, `${formatWord(input.id)} is required`);
            isRequired = true;
        }
        else{
            showSuccess(input);
        }
    });
    return isRequired;
}
// check input length
const checkLength = function(input, min, max){
    if(input.value.length < min){
        showError(input, `${formatWord(input.id)} must be at least ${min} characters`);
    }
    else if(input.value.length > max){
        showError(input, `${formatWord(input.id)} must be less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}

// check password match
const checkPassMatch = function(pass1, pass2){
    if(pass1.value !== pass2.value){
        showError(pass2, `Passwords not match`);
    }
}

// event handler
form.addEventListener("submit", function(e){
    e.preventDefault();

    if(checkRequired([username, email, password, password2])){
        checkLength(username, 3, 50);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPassMatch(password, password2);
    }
})