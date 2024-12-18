// store employee preferences in local storage and pull out their preferences on login.

import { employees } from "../../Data/employeeData.js"
import { getReport } from "../../Data/new_reportData.js"
import { safeTruthy } from "../utils/utils.js"
import {generateNcrNumber} from "../NcrFormView/utils.js";
import { app } from "../../AppState.js";


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
        console.log(reports, reportNumber)
       const curTotal = reports.length
       const idx = reports.findIndex((c) => c === reportNumber)
       console.log(idx + "Index")
       if(idx >= 0){ // if the reports already in recent it removes the report and then pushes it to the front

        reports = reports.filter(r => r !== reportNumber)
       }
       
       reports.unshift(reportNumber) // add to front
       if(curTotal === 5){
           reports.pop()
       }
       empPreferences[employee.username].recentReports = reports;
       save()

    }

    function pushNewReport(reportNumber, status){
        console.log(reportNumber + " " + status);
        for(let e in employees){
            console.log("Checking! --" + employees[e].department + "-- " + status)
            if(employees[e].department === status){

                let reports = empPreferences[employees[e].username].newReports


                   const idx = reports.findIndex((c) => c.ncrNumber === reportNumber)

                   if(idx >= 0){ // if the reports already in notifications it removes the report and then pushes it to the front

                    reports = reports.filter(r => r.ncrNumber !== reportNumber)
                   }
                   console.log(reportNumber)
                reports.unshift(getReport(reportNumber))
                console.log(reports)
                // reports = reports.filter(item => item.status === e.department)
                console.log(reports)
                empPreferences[employees[e].username].newReports = reports;
                console.log("Well we made it this far");
               sendEmailToDepartment(employees[e], getReport(reportNumber), "Operations Manager") //
                save()
            }
        }
    }

    function removeNewReport(reportNumber){
        let reports = empPreferences[app.employee.username].newReports
        console.log(reportNumber)
        reports = reports.filter(c => c.ncrNumber !== reportNumber)
        console.log(reports)
        
        empPreferences[app.employee.username].newReports = reports;
        save()
    }

    function sendEmailToDepartment(employee, report, fromDept){
            emailjs.init({
                publicKey: 'WlGCHQ8tggwCZYvBQ'
            })



            var templateParams = {
                    reply_to:"ydennekrf@gmail.com",
                    to_name:employee.name,
                    from_name:fromDept,
                    message:`There is a new report for the ${employee.department} department.`
            }

            // emailjs.send('service_z1gy9ta', 'template_57gd15a', templateParams)
            //     .then((response) => {
            //         console.log("SUCCESS", response.status, response.text);
            //     },
            //         (error) => {
            //         console.log("FAILED....", error);
            //         });
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
        pushNewReport,
        removeNewReport
    }
    
}

