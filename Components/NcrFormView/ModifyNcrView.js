import {trapFocus} from "../utils/utils.js";
import {createQAReport, validateQualityAssuranceForm} from "./utils.js";
import {qualityAssuranceForm} from "./QualityAssuranceForm.js";
import {getReport, reportData, updateReport} from "../../Data/new_reportData.js";
import { ReportList } from "../ReportList.js";
import { app } from "../../AppState.js";
import { redirectHome } from "../../redirection/redirect.js";


export function ModifyNcrView(targetID, employee, report=null){ // HANDLES BOTH EDITING AND CREATING NEW
    /*
        Just a general plan I have in my head:
        Each piece of the form will be its own component ( QA portion, engineering portion etc.)
        based on the user-groups the employee is a part of we will reveal all the report portions they're eligible...
        to fill out.
     */

        if(report){
            app.storage.pushRecentReport(report.ncrNumber)
            app.storage.print()
        }
    // If a report is passed an additional toolbar should be added with functionality like closing the report etc.
    function validateForm() {
        console.log(report)
        const formData = validateQualityAssuranceForm(report !== null, report); // if there is a report given we're not updating the report
       // For now it's just the QA portion being validated
        if(formData.get().length === 0){
            console.log("QA Form is valid.")
            if(!report) { // create new TODO auto-increment ncr-number?
                const newReport = createQAReport(app.employee)
                reportData.push(newReport)
                // redirect with a success message 
                ReportList('root', app.employee, reportData)
                app.history.flush()
            } else{ // edit existing
                const newReport = createQAReport(app.employee)
                updateReport(report.ncrNumber, newReport)
                // TODO redirect with a success message 
                ReportList('root', app.employee, reportData)
                app.history.flush()
            }



        }
        else{console.log("QA Form is invalid!");formData.expose()}
    }



    const html = `
        <form id="ncr-create-form">
            ${qualityAssuranceForm(null,  report)}
        </form>
    `


    document.getElementById('create-report-btn').style.display = 'none';
    document.getElementById('report-search').style.display = 'none';
    document.getElementById('lbl-search').style.display = "none";
    document.getElementById(targetID).innerHTML = html;
    
    document.getElementById('ncr-create-form').addEventListener('submit', (e)=>{e.preventDefault()});
    document.getElementById('btn-submit-ncr').addEventListener('click', (e)=>{validateForm(e)})
    document.getElementById('btn-cancel').addEventListener('click', redirectHome)

    trapFocus(document.getElementById(targetID));

}


function cancelEdit(){
    ReportList('root', app.employee, reportData)
    app.history.flush()
    console.log("Cancelling and redirecting to home page.")
}

