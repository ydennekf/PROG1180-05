// store employee preferences in local storage and pull out their preferences on login.

import { employees } from "../../Data/employeeData.js"
import { getReport } from "../../Data/new_reportData.js"
import { safeTruthy } from "../utils/utils.js"
import {generateNcrNumber} from "../NcrFormView/utils.js";


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
        empPreferences[employee.username].darkMode =
         !empPreferences.darkMode;
        localStorage.setItem("preferences", empPreferences)
    }

    function setLangPreference(lang){
        const e = empPreferences[employee.username]
        const cur = e.preferredLanguage
        if(cur === lang){return;}
        empPreferences[employee.username].preferredLanguage = lang;
        save()

    }

    function pushRecentReport(reportNumber){
        let reports =empPreferences[employee.username].recentReports
       const curTotal = reports.length
       const idx = reports.findIndex((c) => c.ncrNumber === reportNumber)
       console.log(idx + "Index")
       if(idx >= 0){ // if the reports already in recent it removes the report and then pushes it to the front
        console.log("working")
        reports = reports.filter(r => r.ncrNumber !== reportNumber)
       }
       
       reports.unshift(getReport(reportNumber)) // add to front
       if(curTotal === 5){
           reports.pop()
       }
       empPreferences[employee.username].recentReports = reports;
       save()

    }

    function pushNewReport(reportNumber, department){

        for(let emp in employees){
            if(emp.department === department){
                let reports = empPreferences[emp.username].newReports
                reports.unshift(getReport(reportNumber))
                reports = reports.filter(item => item.status !== employee.department)
                empPreferences[emp.username].newReports = reports;
            }
        }

        save()

    }

    function save(){
        localStorage.setItem('preferences', JSON.stringify(empPreferences))
    }

  


    return {
        getPreferences,
        toggleDarkMode,
        setLangPreference,
        pushRecentReport,
        print:() => console.log(empPreferences),
        getRecentReports:() => empPreferences[employee.username].recentReports,
        getLangPreference:() => empPreferences[employee.username].preferredLanguage,
        getNewReports:() => empPreferences[employee.username].newReports,
        pushNewReport
    }
    
}

