import { getReport } from "../Data/reportData.js";
import { DetailsNcrView } from "./NcrFormView/DetailsNcrView.js";
import { ModifyNcrView } from "./NcrFormView/ModifyNcrView.js";
import { injectOrReturn } from "./utils/utils.js";

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
                <div>
                    <button class="view-report" data-ncr-number="${reportData.ncrNumber}">View Report</button>
                    <button class="edit-report" data-ncr-number="${reportData.ncrNumber}">Edit</button>
                </div>
            </td>
        </tr>
    `;
    
}   


function openReportDetails(ncrNumber){
    console.log("loading details for Report numbered: " + ncrNumber)
    DetailsNcrView('root', getReport(parseInt(ncrNumber)))
}

function openReportEditor(ncrNumber){
    console.log("loading editor for report numbered: " + ncrNumber)
    ModifyNcrView('root', {}, getReport(parseInt(ncrNumber)))
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