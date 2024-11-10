import { getReport } from "../Data/new_reportData.js";
import { DetailsNcrView } from "./NcrFormView/DetailsNcrView.js";


import { app } from "../AppState.js";
import {ReportView} from "./NcrFormView/ReportView.js";
import { redirectViewAllReports } from "../redirection/redirect.js";


export function reportPreview  (reportData) {

    let startDate = new Date(reportData.date);


        return`
        <tr>
            <td>
                ${reportData.ncrNumber}
            </td>
           <td>
            ${startDate.getFullYear()}/${startDate.getMonth()}/${startDate.getDate()}
            </td>
            <td>
                ${reportData.supplierName}
            </td>
            <td>
                ${reportData.status}
            </td>
         
            <td>
                <div class='index-view-table-buttons'>
                    <button class="view-report" tabindex="5" data-ncr-number="${reportData.ncrNumber}">View</button>
                    <button class="edit-report" tabindex="5" data-ncr-number="${reportData.ncrNumber}">Edit</button>
                    <button class="archive-report" tabindex="5" data-ncr-number="${reportData.ncrNumber}">Archive</button>
                    
                </div>
            </td>
        </tr>
    `;

   
  
    
}   


function openReportDetails(ncrNumber){
    if(app === undefined){
        // user not logged in
        return;
    }
    console.log("loading details for Report numbered: " + ncrNumber)  
    
    ReportView( getReport(ncrNumber), "View")
    if(app.currentView === "ReportList"){
        app.history.branchPath({component:'ReportView', data:[getReport(ncrNumber), "View"]})
    } else {
        app.history.newPath({component:'ReportView', data:[getReport(ncrNumber), "View"]})
    }
    app.storage.pushRecentReport(ncrNumber)
}

function openReportEditor(ncrNumber){
    if(app === undefined){
        // user not logged in
        return;
    }
    console.log("loading editor for report numbered: " + ncrNumber)
    ReportView(getReport(ncrNumber), "Edit")
    if(app.currentView === "ReportList"){
        app.history.branchPath({component:'ReportView', data:[getReport(ncrNumber), "Edit"]})
    } else {
        app.history.newPath({component:'ReportView', data:[getReport(ncrNumber), "Edit"]})
    }

    app.storage.pushRecentReport(ncrNumber)
}

export function previewBindings(){ // Called after mapComponents completes on reportPreviews
    // The class names can be changed to whatever stefan & jennie decide to call these buttons.
    // for now this works though.
    const viewBtns = document.querySelectorAll('.view-report');
    const editBtns = document.querySelectorAll('.edit-report');
    
    viewBtns.forEach(e => {
        e.addEventListener('click', (ev) => openReportDetails(ev.target.dataset.ncrNumber))
    })

    editBtns.forEach(e =>{
        e.addEventListener('click', (ev) => openReportEditor(ev.target.dataset.ncrNumber))
    })

}

