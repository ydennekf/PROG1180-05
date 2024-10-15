
// import related components
import { createLogin } from './Components/Login.js';
import { createModal } from './Components/Modal.js';
import { ReportList } from './Components/ReportList.js';

// import data
import { employees } from './Data/employeeData.js';
import { reportData } from './Data/new_reportData.js';

// import utility functions
import { resetForm } from './Components/utils/utils.js';
import { initApp } from './AppState.js';


let RedirectToIndex = (employee, reports) => {
    initApp(employee, ReportList, ['root', getEmployeeByUserName('btaylor'), reports])
   
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
            RedirectToIndex(employeeData, reportData)
            
            // fire methods to display the index view of the NCR reports.
        }
        else {
            //wrong pass
            console.log("wrong pass!");
            createModal("errorPanel", "Login Error", "Incorrect password", () => resetForm("loginForm"));
        }
    }
    else {
        // wrong username
        console.log("User not found");
        createModal("errorPanel", "Login Error", "Username not found", () => resetForm("loginForm"));
    }
}

window.onload = () => {
    
    createLogin("root", handleLogin);
    
}