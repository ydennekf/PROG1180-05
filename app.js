
// import related components
import { createLogin } from './Components/Login.js';
import { createModal } from './Components/Modal.js';
import { ReportList } from './Components/ReportList.js';

// import data
import { employees } from './Data/employeeData.js';
import { reportData } from './Data/new_reportData.js';

// import utility functions
import { append, insert, resetForm } from './Components/utils/utils.js';
import { initApp } from './AppState.js';
import { ModifyNcrView } from './Components/NcrFormView/ModifyNcrView.js';
import { app } from './AppState.js';
import { AccessibilityPanel } from './Components/AccesibilityPanel.js';
import { NavBar } from './Components/NavBar.js';
import Index from './Components/Views/Index.js';


let RedirectToIndex = (employee, reports) => {
    // initApp(employee, ReportList, ['root', employee, reports, 1])
    initApp(employee, Index, [])
   
}

let getEmployeeByUserName = (username) => {
    const e= employees.find(e => e.username == username);
    console.log(e)
    return e;
}



export let handleLogin = (event) => {
    event.preventDefault(); // prevents the login from submitting

    
    let nameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;

    let employeeData = getEmployeeByUserName(nameInput);
    
    
    if (employeeData != null) {
        if (employeeData.password == passwordInput) {
            // success
            document.getElementById('footer').classList.remove('abs-btm') // another bandage fix for the footer :(
            RedirectToIndex(employeeData, reportData)
            document.getElementById("emp-info").innerHTML = `
            <span id="user-info">

                    <span id="user-name-label">Logged in as: <strong id="user-name">${app.employee.username}</strong></span>
                    <span id="user-department">- ${app.employee.department}</span>
 
                </span>`
           
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
    NavBar();
    createLogin("root", handleLogin);
    AccessibilityPanel()
}