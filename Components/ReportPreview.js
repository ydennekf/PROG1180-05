import { getReport } from "../Data/new_reportData.js";
import { DetailsNcrView } from "./NcrFormView/DetailsNcrView.js";
import { ModifyNcrView } from "./NcrFormView/ModifyNcrView.js";

import { app } from "../AppState.js";


export function reportPreview  (reportData) {


   
    return`
        <tr>
            <td>
                ${reportData.ncrNumber}
            </td>
            <td>
                ${reportData.title}
            </td>
            <td>
                ${reportData.status}
            </td>
            <td>
                ${reportData.itemName}
            </td>
            <td>
                ${reportData.date}
            </td>
            <td>
                ${reportData.supplierName}
            </td>
            <td>
                ${reportData.startedBy}
            </td>
            <td>
                ${reportData.defectDescription}
            </td>
            <td>
                <div class='index-view-table-buttons'>
                    <button class="view-report" tabindex="5" data-ncr-number="${reportData.ncrNumber}">View</button>
                    <button class="edit-report" tabindex="5" data-ncr-number="${reportData.ncrNumber}">Edit</button>
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
    
    DetailsNcrView('root', getReport(ncrNumber))
    app.history.flush()
    app.history.newPath({component:'DetailsNcrView', data:['root', getReport(ncrNumber)]})
    app.storage.pushRecentReport(ncrNumber)
}

function openReportEditor(ncrNumber){
    if(app === undefined){
        // user not logged in
        return;
    }
    console.log("loading editor for report numbered: " + ncrNumber)
    ModifyNcrView('root', app.employee, getReport(ncrNumber))
    app.history.newPath({component:'ModifyNcrView', data:['root', app.employee, getReport(ncrNumber)]})
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