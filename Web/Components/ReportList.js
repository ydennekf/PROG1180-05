import { mapComponents } from "./utils/utils.js"
import { reportPreview } from "./ReportPreview.js"

export function ReportList(targetID, user, reports){
    
    let ReportList = `
    <table>
        ${reportListHeader()}
        <tbody>
        ${mapComponents(reports, reportPreview)}
        </tbody>
    </table>
    `

    document.getElementById('targetID').innerHTML = ReportList;

}

function reportListHeader(){ // !TODO  filtering func's

    return `
    <tbody>
        <tr>
            <th>Report #</th>
            <th>Title</th>
            <th>Status</th>
            <th>Item Name</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Started By</th>
            <th>Description</th>
        </tr>
        </tbody>
    `;

    
}