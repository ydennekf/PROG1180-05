import { getEmployeeByUsername } from "../../Data/employeeData.js";
import {injectOrReturn} from "../utils/utils.js";
import { ModifyNcrView } from "./ModifyNcrView.js";
import { app } from "../../AppState.js";
import { qualityAssuranceForm } from "./QualityAssuranceForm.js";

export function DetailsNcrView(targetID, report){
    //app.storage.pushRecentReport(report)
    const html = `
        <button id="edit-report">Edit Report</button>
        ${QualityAssuranceNcrView(report)}
    `

    document.getElementById(targetID).innerHTML = html;
    document.getElementById('edit-report').addEventListener('click', ()=>GoToEdit(report))
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

function DetailsHeader(report, targetID=null){
    const html = `
        <div class="ncr-details-header">
            <h2>${report.title}</h2>
            <dl>
                <dt>Date</dt>
                <dd>${report.date}</dd>
                <dt>NCR Number</dt>
                <dd>${report.ncrNumber}</dd>
                <dt>Status</dt>
                <dd>${report.status}</dd>
                <dt>Started By</dt>
                <dd>${report.startedBy}</dd>
            </dl>
        </div>
    `

    return injectOrReturn(html, targetID)
}

function GoToEdit(report){

    app.history.push({component:"ModifyNcrView", data:['root', app.employee, report]})
    ModifyNcrView('root', app.employee, report)
}