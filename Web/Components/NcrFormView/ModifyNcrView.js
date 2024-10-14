import {trapFocus} from "../utils/utils.js";
import {createQAReport, validateQualityAssuranceForm} from "./utils.js";
import {qualityAssuranceForm} from "./QualityAssuranceForm.js";
import {getReport, reportData, updateReport} from "../../Data/reportData.js";
import { _history } from "../../globals.js";


export function ModifyNcrView(targetID, employee, report=null, push=true){ // HANDLES BOTH EDITING AND CREATING NEW
    push && _history.push({component:"ModifyNcrView", data:[targetID, employee, report]})
    /*
        Just a general plan I have in my head:
        Each piece of the form will be its own component ( QA portion, engineering portion etc.)
        based on the user-groups the employee is a part of we will reveal all the report portions they're eligible...
        to fill out.
     */

    // If a report is passed an additional toolbar should be added with functionality like closing the report etc.
    function validateForm(e) {
        e.preventDefault();
        const formData = validateQualityAssuranceForm(); // bool
       // For now it's just the QA portion being validated
        if(formData){
            console.log("QA Form is valid.")
            if(!report) { // create new TODO auto-increment ncr-number?
                const newReport = createQAReport(employee)
                reportData.push(newReport)
            } else{ // edit existing
                const newReport = createQAReport(employee)
                updateReport(report.ncrNumber, newReport)

            }



        }
        else{console.log("QA Form is invalid!")}
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


