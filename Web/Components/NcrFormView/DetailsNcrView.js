import { getEmployeeByUsername } from "../../Data/employeeData.js";
import {injectOrReturn} from "../utils/utils.js";

export function DetailsNcrView(targetID, report){

    const html = `
        ${DetailsHeader(report)}
        ${QualityAssuranceNcrView(report)}
    `

    document.getElementById(targetID).innerHTML = html;
}

function QualityAssuranceNcrView(report, targetID=null){
    const html = `<dl>
                <dt>Supplier Name</dt>
                <dd>${report.supplierName}</dd>

                <dt>Supplier or Rec-Insp</dt>
                <dd>${report.supplierOrRec ? "Yes":"No"}</dd>

                <dt>Production Order</dt>
                <dd>${report.productionOrder ? "Yes":"No"}</dd>

                <dt>Item Name</dt>
                <dd>${report.itemName}</dd>

                <dt>SAP Number</dt>
                <dd>${report.sapNumber}</dd>

                <dt>Item Description</dt>
                <dd>${report.itemDescription}</dd>

                <dt>Sales Number</dt>
                <dd>${report.salesNumber}</dd>

                <dt>Prod Number</dt>
                <dd>${report.prodNumber}</dd>

                <dt>Quantity Received</dt>
                <dd>${report.qtyReceived}</dd>

                <dt>Quantity Defective</dt>
                <dd>${report.qtyDefective}</dd>

                <dt>Description of Defect</dt>
                <dd>${report.defectDescription}</dd>

                <dt>Item Non-Conforming?</dt>
                <dd>${report.nonConforming ? 'Yes' : "No"}</dd>

            </dl>
    `

    return injectOrReturn(html, targetID)
}

function DetailsHeader(report, targetID=null){
    const html = `
        <div>
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