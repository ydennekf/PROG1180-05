import { mapComponents } from "./utils/utils.js"
import { previewBindings, reportPreview } from "./ReportPreview.js"

export function ReportList(targetID, user, reports){

    document.getElementById('create-report-btn').addEventListener('click', () => {
        
    })
    let sortOrder = {
        id: 'desc',
        title: 'desc',
        status: 'desc',
        itemName: 'desc',
        date: 'desc',
        supplierName: 'desc',
        startedBy: 'desc',
        description: 'desc'
    };

    let renderTable = (sortedReports) => {
        let ReportList = `
    <table>
        ${reportListHeader(sortOrder)}
        <tbody>
        ${mapComponents(sortedReports, reportPreview)}
        </tbody>
    </table>
    `

    document.getElementById(targetID).innerHTML = ReportList;
    applySortListeners(sortedReports);
    }
    
    let applySortListeners = (currentReports) => {
        document.querySelectorAll('#' + targetID + ' th').forEach(header => {
            header.addEventListener('click', function(){
                let column = this.getAttribute('data-column');
                let currentOrder = this.getAttribute('data-order');
                let newOrder = currentOrder === 'desc' ? 'asc' : 'desc';

                sortOrder[column] = newOrder;             

                let sortedReports = sortReports(currentReports, column, newOrder);
                renderTable(sortedReports);      
                previewBindings()      
            });
        });
    };

    

    let sortReports = (reports, column, order) => {
        return reports.sort((a,b) => {
            let valA = a[column];
            let valB = b[column];

            if(column === 'date'){
                valA = new Date(valA);
                valB = new Date(valB);
            }

            if(!isNaN(valA) && !isNaN(valB)){
                
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }

            if(order === 'asc'){
                if(valA > valB)return 1;
                if(valA < valB)return -1;
                return 0;
            }
            else{
                
                if(valA < valB)return 1;
                if(valA > valB)return -1;
                return 0;
            }
        });
    }

    renderTable(reports);
    previewBindings() // Makes buttons redirect to their respective reports edit/details views.

}

function reportListHeader(sortOrder){ 

    return `
        <thead>
        <tr>
            <th data-column="ncrNumber" data-order="${sortOrder.ncrNumber}">Report #</th>
            <th data-column="title" data-order="${sortOrder.title}">Title</th>
            <th data-column="status" data-order="${sortOrder.status}">Status</th>
            <th data-column="itemName" data-order="${sortOrder.itemName}">Item Name</th>
            <th data-column="date" data-order="${sortOrder.date}">Date</th>
            <th data-column="supplierName" data-order="${sortOrder.supplierName}">Supplier</th>
            <th data-column="startedBy" data-order="${sortOrder.startedBy}">Started By</th>
            <th data-column="description" data-order="${sortOrder.description}">Description</th>
        </tr>
        </thead>
    `;

    
}