import {trapFocus} from "../utils/utils.js";
import {createQAReport, validateQualityAssuranceForm} from "./utils.js";
import {qualityAssuranceForm} from "./QualityAssuranceForm.js";
import {getReport, reportData, updateReport} from "../../Data/new_reportData.js";
import { ReportList } from "../ReportList.js";
import { app } from "../../AppState.js";


export function ModifyNcrView(targetID, employee, report=null){ // HANDLES BOTH EDITING AND CREATING NEW
    /*
        Just a general plan I have in my head:
        Each piece of the form will be its own component ( QA portion, engineering portion etc.)
        based on the user-groups the employee is a part of we will reveal all the report portions they're eligible...
        to fill out.
     */

    // If a report is passed an additional toolbar should be added with functionality like closing the report etc.
    function validateForm(e) {
        e.preventDefault();
        const formData = validateQualityAssuranceForm(report !== null); // if there is a report given we're not updating the report
       // For now it's just the QA portion being validated
        if(formData.get().length === 0){
            console.log("QA Form is valid.")
            if(!report) { // create new TODO auto-increment ncr-number?
                const newReport = createQAReport(employee)
                reportData.push(newReport)
                // redirect with a success message 
                ReportList('root', app.employee, reportData)
                app.history.flush()
            } else{ // edit existing
                const newReport = createQAReport(employee)
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



    document.getElementById(targetID).innerHTML = html;
    document.getElementById('ncr-create-form').addEventListener('submit', (e)=>validateForm(e));
    trapFocus(document.getElementById(targetID));

}


