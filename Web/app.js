
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
import { ModifyNcrView } from './Components/NcrFormView/ModifyNcrView.js';
import { app } from './AppState.js';


let RedirectToIndex = (employee, reports) => {
    initApp(employee, ReportList, ['root', employee, reports])
   
}

let getEmployeeByUserName = (username) => {
    const e= employees.find(e => e.username == username);
    console.log(e)
    return e;
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
            createModal("errorPanel", "Success!", employeeData.lastName + ", " + employeeData.firstName + "logged in.")
            // fire methods to display the index view of the NCR reports.
        }
        else {
            //wrong pass
            console.log("wrong pass!");
            createModal("errorPanel", "Login Error", "Incorrect password",5000);
        }
    }
    else {
        // wrong username
        console.log("User not found");
        createModal("errorPanel", "Login Error", "Username not found", 5000);
    }
}

window.onload = () => {
    
    createLogin("root", handleLogin);

}