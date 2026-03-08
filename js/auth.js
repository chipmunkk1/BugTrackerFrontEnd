async function logIn(event) {
    event.preventDefault(); //prevent the page from refreshing 

    const enteredEmail = document.getElementById('login-email').value;
    const enteredPassword = document.getElementById('login-password').value;

    if(enteredEmail.length == 0){
        alert("Enter an Email");
        return;
    }

    if(enteredEmail.length < 5){
        alert("Email is too short");
        return;
    }

    if(enteredPassword.length == 0){
        alert("Enter a Password");
        return;
    }

    if(enteredPassword.length < 6){
        alert("Password is weak");
        return;
    }


    const fetchUrl = `http://localhost:5138/api/Users/LogIn`;

    const LogInData = {
        Email : enteredEmail,
        Password : enteredPassword
    }

    try {
        //Send the fetch request
        const response = await fetch(fetchUrl, {
        method: "POST",
        
        headers: {
        "Content-Type": "application/json"
        },

        body:JSON.stringify(LogInData)

        });

        if (response.ok){
            console.log("Login successful!");
            window.location.href = "groups.html"; 
        } 
    
        else {
        const errorMessage = await response.text();
        alert("Login failed: " + errorMessage); 
        }

    } 
    
    catch (error) {
    console.error("Server connection error:", error);
    }   
}


function MoveToSignUpPage(event){
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const showSignupBtn = document.getElementById('show-signup'); 
    const showLoginBtn = document.getElementById('show-login');

    // When click "Sign Up"  Hide Login, Show Sign Up
    showSignupBtn.addEventListener('click', () => {
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
    });

    // When click "Log In" Hide Sign Up, Show Login
    showLoginBtn.addEventListener('click', () => {
       signupSection.classList.add('hidden');
       loginSection.classList.remove('hidden');
    });

}


async function SignUp(event) {
    event.preventDefault();

    const enteredEmail = document.getElementById('signup-email').value;
    const enteredPassword = document.getElementById('signup-password').value;

    if(enteredEmail.length < 8){
        alert("enter a valid email");
        return;
    }

    if(enteredPassword.length <= 7){
        alert("Password must be 7 charachter or more ")
    }
    
    const fetchUrl = `http://localhost:5138/api/Users/SignUp`;

    //pack the data inside a json object to send in fetch to the backend
    const SignUpData = {
        Email : enteredEmail,
        Password : enteredPassword
    }

    try{

        const response = await fetch(fetchUrl,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(SignUpData)
        });

        if ( response.ok){
            console.log("You have singed up successfully");
            window.location.href = "index.html" //go back to log in page
        }

        else{
            const errorMessage = await response.text();
            alert("Sign up failed: " + errorMessage); 
        }
    }
     catch (error) {
        console.error("Server connection error:", error);
    }   
}