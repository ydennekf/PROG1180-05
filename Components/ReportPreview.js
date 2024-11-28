import { getReport } from "../Data/new_reportData.js";
import { DetailsNcrView } from "./NcrFormView/DetailsNcrView.js";
import * as SVG from "./svgs.js";


import { app } from "../AppState.js";
import {ReportView} from "./NcrFormView/ReportView.js";
import { redirectViewAllReports } from "../redirection/redirect.js";
import { convertToPDF } from "../Data/createPDF.js";






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
                    <button class="view-report icon" tabindex="5" data-ncr-number="${reportData.ncrNumber}">${SVG.eyeSVG()}<br/>Details</button>
                    <button class="edit-report icon" tabindex="5" data-ncr-number="${reportData.ncrNumber}">${SVG.editSVG()}Edit</button>
                    <button class="archive-report icon" tabindex="5" data-ncr-number="${reportData.ncrNumber}">${SVG.folderSVG()}Archive</button>
                    
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
    const archiveBtns = document.querySelectorAll('.archive-report')
    
    viewBtns.forEach(e => {
        e.addEventListener('click', (ev) => openReportDetails(ev.target.dataset.ncrNumber))
    })

    editBtns.forEach(e =>{
        e.addEventListener('click', (ev) => openReportEditor(ev.target.dataset.ncrNumber))
    })

    // archiveBtns.forEach(e => {
    //     e.addEventListener('click', pdfMake.createPdf(convertToPDF("2024-001")).open())
    // })
    // THIS IS INCREDIBLY SHIT CODE
    // var s = document.createElement('script');
    // s.type = 'module';
    // let code = `
    // import { convertToPDF } from "../Data/createPDF.js";
    //  const archiveBtns = document.querySelectorAll('.archive-report')
    //      archiveBtns.forEach(e => {
    //     e.addEventListener('click', (ev) =>  pdfMake.createPdf(convertToPDF(ev.target.dataset.ncrNumber)).open())
    // })
    // `
    // try {
    //     s.appendChild(document.createTextNode(code));
    //     document.body.appendChild(s);
    //   } catch (e) {
    //     s.text = code;
    //     document.body.appendChild(s);
    //   }   

}



