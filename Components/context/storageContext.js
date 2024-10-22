// store employee preferences in local storage and pull out their preferences on login.

import { employees } from "../../Data/employeeData.js"
import { getReport } from "../../Data/new_reportData.js"


export default function _StorageContext(employee){ // stored as {employeeUsername:preferencesObj}
    
    // if the employee data hasn't been stored yet store it
    let empPreferences = localStorage.getItem("preferences")
    if(empPreferences === null){ // initialize local storage if it hasnt been
        const c = {}
        employees.forEach(e => c[e.username] = e.accessibilityPreferences)
        localStorage.setItem("preferences", JSON.stringify(c))
        empPreferences = JSON.parse(localStorage.getItem('preferences'))
    }else{
        empPreferences = JSON.parse(empPreferences)
    }

    function getPreferences(){ // Get current employees preferences 
        return empPreferences;
    }


    function toggleDarkMode(){
        empPreferences[employee.username].accessibilityPreferences.darkMode =
         !empPreferences.accessibilityPreferences.darkMode;
        
    }

    function pushRecentReport(reportNumber){
        const reports =empPreferences[employee.username].recentReports
       const curTotal = reports.length
       reports.unshift(getReport(reportNumber))
       if(curTotal === 5){
           reports.pop()
       }
    }


    return {
        getPreferences,
        toggleDarkMode,
        pushRecentReport
    }
    
}

/*
 {
        "username": "asmith",
        "firstName": "Alice",
        "lastName": "Smith",
        "department": "engineering",
        "password": "eningeer123",
        "accessibilityPreferences": {
            "darkMode": true,
            "preferredLanguage": "es"
        }
    },
*/