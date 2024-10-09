
// import related components
import { createLogin } from './Components/Login.js';
import { createModal } from './Components/Modal.js';
import { ReportList } from './Components/ReportList.js';

// import data
import { employees } from './Data/employeeData.js';
import { reportData } from './Data/reportData.js';


let RedirectToIndex = (employee, reports) => {
    
    ReportList('root', employee, reports);
}

let getEmployeeByUserName = (username) => {
    return employees.find(e => e.username == username);
}

let handleLogin = (event) => {
    event.preventDefault(); // prevents the login from submitting

    
    let nameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;

    let employeeData = getEmployeeByUserName(nameInput);
    
    
    if (employeeData != null) {
        if (employeeData.password == passwordInput) {
            // success
            
            createModal("root", `Welcome back ${employeeData.firstName}!`, `Logged in as ${employeeData.department}`, 400000 , () => RedirectToIndex(employeeData, reportData));
            // fire methods to display the index view of the NCR reports.
        }
        else {
            //wrong pass
            console.log("wrong pass!");
            createModal("errorPanel", "Login Error", "Incorrect password", () => createLogin("root", handleLogin));
        }
    }
    else {
        // wrong username
        console.log("User not found");
        createModal("errorPanel", "Login Error", "Username not found", () => createLogin("root", handleLogin));
    }
}

// set keyboard shortcuts here.


window.onload = () => {
    
    createLogin("root", handleLogin);
}