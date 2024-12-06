import { getReport } from "../Data/new_reportData.js";
import { DetailsNcrView } from "./NcrFormView/DetailsNcrView.js";
import * as SVG from "./svgs.js";


import { app } from "../AppState.js";
import {ReportView} from "./NcrFormView/ReportView.js";
import { redirectViewAllReports } from "../redirection/redirect.js";
import { convertToPDF } from "../Data/createPDF.js";






export function reportPreview  (reportData) {




let  startDate = new Date(reportData.date);


        return`
        <tr class="report-preview-row">
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
                <div class="tooltip-container view-report" data-ncr-number="${reportData.ncrNumber}">
                <button class="icon" tabindex="5" >${SVG.viewSVG(reportData.ncrNumber)}</button>
                <div data-ncr-number="${reportData.ncrNumber}" class="tooltip top-tooltip">Details</div>
                </div>
                <div class="tooltip-container edit-report" data-ncr-number="${reportData.ncrNumber}">
                <button class="icon" tabindex="5" >${SVG.editSVG(reportData.ncrNumber)}</button>
                <div data-ncr-number="${reportData.ncrNumber}" class="tooltip top-tooltip">Edit</div>
                </div>
                <div class="tooltip-container archive-report" data-ncr-number="${reportData.ncrNumber}">
                <button class="icon" tabindex="5" >${SVG.folderSVG(reportData.ncrNumber)}</button>
                <div data-ncr-number="${reportData.ncrNumber}" class="tooltip top-tooltip">Archive</div>
                </div>
                    
                    
                    
                    
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

export function openReportEditor(ncrNumber){
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

    archiveBtns.forEach(e => {
        e.addEventListener('click', (e) => {
            pdfMake.createPdf(convertToPDF(e.target.dataset.ncrNumber)).open()
            getReport(e.target.dataset.ncrNumber).status = "archived"
        })
    })
    //THIS IS INCREDIBLY SHIT CODE
    // var s = document.createElement('script');
    // s.type = 'module';
    // let code = `
    // import { convertToPDF } from "../Data/createPDF.js";
   
    //  const archiveBtns = document.querySelectorAll('.archive-report')
    //      archiveBtns.forEach(e => {
            
    //     e.addEventListener('click', function(ev)  {ev.preventDefault();pdfMake.createPdf(convertToPDF(ev.target.dataset.ncrNumber)).open()
           
    //     })
        
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



