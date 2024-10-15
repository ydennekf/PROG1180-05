import { mapComponents } from "./utils/utils.js"
import { previewBindings, reportPreview } from "./ReportPreview.js"
import { NavBar } from "./NavBar.js";

export function ReportList(targetID, user, reports){
    
    
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
    <table class ="ncr-list">
        ${reportListHeader(sortOrder)}
        <tbody class="report-view">
        ${mapComponents(sortedReports, reportPreview)}
        </tbody>
    </table>
    `
    
    
    if(!document.getElementById(targetID).classList.contains("ncr-view")){
        document.getElementById(targetID).setAttribute("class","ncr-view");
    }

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
    
    NavBar("navbar");
    
    

}

function reportListHeader(sortOrder){ 

    return `
        <thead>
        <tr>
            <th data-column="ncrNumber" tabindex="4" data-order="${sortOrder.ncrNumber}">Report #</th>
            <th data-column="title" tabindex="4" data-order="${sortOrder.title}">Title</th>
            <th data-column="status" tabindex="4" data-order="${sortOrder.status}">Status</th>
            <th data-column="itemName" tabindex="4" data-order="${sortOrder.itemName}">Item Name</th>
            <th data-column="date" tabindex="4" data-order="${sortOrder.date}">Date</th>
            <th data-column="supplierName" tabindex="4" data-order="${sortOrder.supplierName}">Supplier</th>
            <th data-column="startedBy" tabindex="4" data-order="${sortOrder.startedBy}">Started By</th>
            <th data-column="description" tabindex="4" data-order="${sortOrder.description}">Description</th>
            <th></th>
        </tr>
        </thead>
    `;

    
}