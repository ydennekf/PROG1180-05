
// import related components
import { createLogin } from './Components/Login.js';
import { createModal } from './Components/Modal.js';

// import data
import { employees } from './Data/employeeData.js';




let getEmployeeByUserName = (username) => {
    return employees.find(e => e.username == username);
}

let handleLogin = (event) => {
    event.preventDefault(); // prevents the login from submitting

    
    let nameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;

    let employeeData = getEmployeeByUserName(nameInput);
    alert(`${nameInput} ${passwordInput} ${getEmployeeByUserName(nameInput)}`)
    
    if (employeeData != null) {
        if (employeeData.password == passwordInput) {
            // success
            console.log("you logged in!");
            createModal("root", `Welcome back ${employeeData.firstName}!`, `Logged in as ${employeeData.department}`);
            // fire methods to display the index view of the NCR reports.
        }
        else {
            //wrong pass
            console.log("wrong pass!");
            createModal("alert", "Login Error", "Incorrect password");
        }
    }
    else {
        // wrong username
        console.log("User not found");
        createModal("alert", "Login Error", "Username not found");
    }
}


window.onload = () => {
    createLogin("root", handleLogin);
}