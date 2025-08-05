function signup() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const email = document.querySelector('.js-login-bar').value; // Capture the email input value
    // Capture the password
    
    // Validate the email input using the regex
    if (!emailPattern.test(email)) {
        document.querySelector('.js-email-error').innerHTML = "Inavlid email";
    }
   else{
    document.querySelector('.js-email-correct').innerHTML = "email entered correctly";

   }
}

   function password(){
    
        const email = document.querySelector('.js-login-bar').value;
        const password = document.querySelector('.js-password-button').value;
        
        if (email === "") {
            document.querySelector('.js-email-error').innerHTML = "Please enter your email";
        } else {
            document.querySelector('.js-email-error').innerHTML = ""; // Clear the error if the email is entered
        }
    
        if (password === "") {
            document.querySelector('.logged-in').innerHTML = "Please enter your password";
        } else {
            document.querySelector('.logged-in').innerHTML = ""; // Clear the error if the password is entered
        }
    
        if (email !== "" && password !== "") {
            // If both fields are filled, proceed to the next page
            document.querySelector('.logged-in').innerHTML = 'Logged in successfully';
            window.location.href = 'notescopy.html';
        }

        // Send the email and password to the server
fetch('http://localhost:3000/login', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({
    email: email,
    password: password
})
})
.then(response => response.text())
.then(data => {
console.log(data);
document.querySelector('.logged-in').innerHTML = 'Logged in successfully!';
window.location.href = 'notescopy.html';
})
.catch((error) => {
console.error('Error:', error);
document.querySelector('.logged-in').innerHTML = 'Login failed!';
});
    }

   
function keypress(event) {
    if (event.key === 'Enter') {
        signup();
    }
}


