import { app } from "../../AppState.js";
import { createSVG, viewSVG, eyeSVG, documentSVG } from "../svgs.js";
import { mapComponents } from "../utils/utils.js";
import { previewBindings, reportPreview } from "../ReportPreview.js";
import { injectOrReturn } from "../utils/utils.js";
import { redirectNewReport, redirectViewAllReports } from "../../redirection/redirect.js";
import {getReport, reportData } from "../../Data/new_reportData.js";


export default function Index(){

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
            <div class= "home-button-centre">
                
                   
                    <button id="view-reports" class="large-icon">
                        ${eyeSVG()}
                        <br/>
                        NCR Log
                    </button>
                    <button class="large-icon">
                        ${documentSVG()}
                        Reporting
                    </button>
                 
            </div>`
            
        default: // This will be for QA I just need to figure out whaat each ones buttons will be
            return `
        <div class= "home-button-centre">
            <div class= "home-ncr-button">
                <button id="create-report-btn" class="large-icon">
                    ${createSVG()}<br/>
                    Create NCR
                </button>
                <button id="view-reports" class="large-icon">
                    ${eyeSVG()}
                    <br/>
                    NCR Log
                </button>
                <button class="large-icon">
                    ${documentSVG()}<br/>
                    Reporting
                </button>
            </div>    
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

    // Iterate through recent reports 
    // if the report isnt in reportData we skip
    const reports = []
    recent.forEach(element => {
        console.log(element)
        const e = getReport(element)
        if(e){
            reports.push(e)
        }
    });


    const html = `

    
    <table>
    ${UnsortedHeader()}
     <tbody>
          
        ${reports.length > 0  ? mapComponents(reports, reportPreview) : "<tr><td colspan='5'>You haven't viewed any reports recently!</td></tr>"} 
        </tbody>
    </table>
      
    `

    return injectOrReturn(html, targetID)
}

function UnsortedHeader(){

        return `
        
        <thead>
        <tr><th colspan="5">Recent Reports</th></tr>
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
