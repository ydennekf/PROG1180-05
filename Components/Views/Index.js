import { app } from "../../AppState.js";
import { createSVG, viewSVG, eyeSVG, documentSVG } from "../svgs.js";
import { mapComponents } from "../utils/utils.js";
import { previewBindings, reportPreview } from "../ReportPreview.js";
import { injectOrReturn } from "../utils/utils.js";
import { redirectNewReport, redirectViewAllReports } from "../../redirection/redirect.js";
import {reportData } from "../../Data/new_reportData.js";

export default function Index(){
    setNotifications()
    document.getElementById("root").classList.add("ncr-view")

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

        case "engineering":
            return `
            <div>
                <button id="uploa">
                    ${createSVG()}
                    Create NCR
                </button>
                <button id="view-reports">
                    ${eyeSVG()}
                    View NCRs
                </button>
                <button>
                    ${documentSVG()}
                    Reports
                </button>
            </div>`
            
        default: // This will be for QA I just need to figure out whaat each ones buttons will be
            return `
        <div>
            <button id="create-report-btn">
                ${createSVG()}
                Create NCR
            </button>
            <button id="view-reports">
                ${eyeSVG()}
                View NCRs
            </button>
            <button>
                ${documentSVG()}
                Reports
            </button>
        </div>`
    }

    
}

function indexButtonBindings(){
    document.getElementById('view-reports').addEventListener('click', redirectViewAllReports)
    if(app.employee.department !== "engineering"){
        document.getElementById('create-report-btn').addEventListener('click',redirectNewReport)
    }
}

export function RecentReports(targetID = null){
    const recent = app.storage.getRecentReports()
    const notifications = app.storage.getNewReports()
    const html = `

    
    <table>
    ${UnsortedHeader()}
     <tbody>
          
        ${recent.length > 0 ? mapComponents(recent, reportPreview) : "<tr><td>You haven't viewed any reports recently!</td></tr>"} 
        </tbody>
    </table>
    <table>
        <thead><tr><th colspan="5">Notifications</th> </tr></thead>
        <tbody>
        ${mapComponents(notifications, reportPreview)}</tbody>
    </table>
  
    `

    return injectOrReturn(html, targetID)
}

function UnsortedHeader(){

        return `
        
        <thead>
        <tr><th colspan="5" scope="colgroup" id="RecentReports">Recent Reports</th></tr>
        <tr>
            <th data-column="ncrNumber" tabindex="4">NCR no.</th>
            <th data-column="date" tabindex="4" >Date</th>
            <th data-column="supplierName" tabindex="4">Supplier</th>
            <th data-column="status" tabindex="4">Status</th>

            <th></th>
        </tr>
        
        </thead>
    `;






}

function setNotifications() {

    for(let r = 0; reportData.length > r ; r++){

        if(reportData[r].status === app.employee.department){

            app.storage.pushNewReport(reportData[r].ncrNumber, reportData[r].status)
        }
    }
}