import { getEmployeeByUsername } from "../../Data/employeeData.js";
import {injectOrReturn} from "../utils/utils.js";

import { app } from "../../AppState.js";
import { qualityAssuranceForm } from "./QualityAssuranceForm.js";
import { redirectHome } from "../../redirection/redirect.js";

export function DetailsNcrView(targetID, report){
    //app.storage.pushRecentReport(report)
    const html = `
       
        ${QualityAssuranceNcrView(report)}
    `

    document.getElementById(targetID).innerHTML = html;
    document.getElementById('edit-report').addEventListener('click', ()=>GoToEdit(report))
    document.getElementById('btn-cancel').addEventListener('click', redirectHome)
}

function QualityAssuranceNcrView(report, targetID=null){
    // const html = `<dl class="ncr-details">
    //             <dt>Supplier Name</dt>
    //             <dd>${report.supplierName}</dd>

    //             <dt>Supplier or Rec-Insp</dt>
    //             <dd>${report.supplierOrRec ? "Yes":"No"}</dd>

    //             <dt>Production Order</dt>
    //             <dd>${report.productionOrder ? "Yes":"No"}</dd>

    //             <dt>Item Name</dt>
    //             <dd>${report.itemName}</dd>

    //             <dt>SAP Number</dt>
    //             <dd>${report.sapNumber}</dd>

    //             <dt>Item Description</dt>
    //             <dd>${report.itemDescription}</dd>

    //             <dt>Sales Number</dt>
    //             <dd>${report.salesNumber}</dd>

    //             <dt>Prod Number</dt>
    //             <dd>${report.prodNumber}</dd>

    //             <dt>Quantity Received</dt>
    //             <dd>${report.qtyReceived}</dd>

    //             <dt>Quantity Defective</dt>
    //             <dd>${report.qtyDefective}</dd>

    //             <dt>Description of Defect</dt>
    //             <dd>${report.defectDescription}</dd>

    //             <dt>Item Non-Conforming?</dt>
    //             <dd>${report.nonConforming ? 'Yes' : "No"}</dd>

    //         </dl>
    // `

    //qualityAssuranceForm(null, report, false)

    return injectOrReturn(qualityAssuranceForm(null, report, false, true), targetID)
}



function GoToEdit(report){

    app.history.push({component:"ModifyNcrView", data:['root', app.employee, report]})

}