import { app } from "../../AppState.js";
import { mapComponents } from "../utils/utils.js";
import { previewBindings, reportPreview } from "../ReportPreview.js";
import { injectOrReturn } from "../utils/utils.js";
import { redirectNewReport, redirectViewAllReports } from "../../redirection/redirect.js";

export default function Index(){


    const html = `
        ${RoleIndexButtons()}
        ${RecentReports()}
    `
    // Shows most recent and some buttons based on the logged in users role

    document.getElementById('root').innerHTML = html;
    previewBindings()
    indexButtonBindings()
    
}

function RoleIndexButtons(){
    if(!app){
        return ""
    }

    switch(app.employee.department){
        default: // This will be for QA I just need to figure out whaat each ones buttons will be
            return `
        <div>
            <button id="create-report-btn">Create NCR</button>
            <button id="view-reports">View NCRs</button>
        </div>`
    }

    
}

function indexButtonBindings(){
    document.getElementById('view-reports').addEventListener('click', redirectViewAllReports)
    document.getElementById('create-report-btn').addEventListener('click', redirectNewReport)
}

export function RecentReports(targetID = null){
    const recent = app.storage.getRecentReports()
    const html = `
    <table>
    ${UnsortedHeader()}
        <tbody>
        <tr><h2>Recent Reports</h2></tr>
        ${mapComponents(recent, reportPreview)}
        </tbody>
    </table>
    `

    return injectOrReturn(html, targetID)
}

function UnsortedHeader(){ 
    if (window.innerWidth <= 768) {
        return `
        <thead>
        <tr>
            <th data-column="ncrNumber" tabindex="4">Report</th>
            <th data-column="sapNum" tabindex="4">SAP</th>
            <th data-column="status" tabindex="4">Status</th>
            <th data-column="itemName" tabindex="4">Item Name</th>
            <th data-column="date" tabindex="4">Date</th>
            <th data-column="supplierName" tabindex="4">Supplier</th>
            <th data-column="startedBy" tabindex="4">Started</th>
         
            <th></th>
        </tr>
        </thead>
    `;
    } else {
        return `
        <thead>
        <tr>
            <th data-column="ncrNumber" tabindex="4">Report</th>
            <th data-column="sapNum" tabindex="4">SAP</th>
            <th data-column="status" tabindex="4">Status</th>
            <th data-column="itemName" tabindex="4">Item Name</th>
            <th data-column="date" tabindex="4">Date</th>
            <th data-column="supplierName" tabindex="4">Supplier</th>
            <th data-column="startedBy" tabindex="4">Started</th>
            <th data-column="description" tabindex="4">Description</th>
            <th></th>
        </tr>
        </thead>
    `;
    }
   

    

    
}