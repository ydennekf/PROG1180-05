import { mapComponents } from "./utils/utils.js"
import { reportData } from "../Data/new_reportData.js";
import { previewBindings, reportPreview } from "./ReportPreview.js"
import { SearchBar } from "./NavBar.js";





let reportsPerPage = 10;
let currentPage = 1
const sortOrder = {
    ncrNumber: 'desc',
    status: 'desc',
    date: 'desc',
    supplierName: 'desc'
};



export function ReportList(targetID, user, Reports, page = 1){
    
    currentPage = page;
    let totalPages = Math.ceil(reportData.length / reportsPerPage);  
    
    if(Reports.length > 10){
        Reports = getReportsForPage(page, reportData);
    }

    let ReportList = `
    <div id="report-filtering"></div>
    <table class ="ncr-list">
    
        ${reportListHeader()}
       
        <tbody id="ncr-report-list" class="report-view">
        
        </tbody>
    </table>
    `;

    if(!document.getElementById(targetID).classList.contains("ncr-view")){
        document.getElementById(targetID).setAttribute("class","ncr-view");
    }

    document.getElementById(targetID).innerHTML = ReportList;
    renderList(Reports, totalPages, currentPage);
        if(!document.getElementById("report-search")){
            SearchBar('report-filtering')
        document.getElementById('create-report-btn').style.display = 'block';
        document.getElementById('report-search').style.display = 'block';
        document.getElementById('lbl-search').style.display = "inline";
        }







    applySortListeners(reportData, targetID)



    

}

export function renderList(reports, totalPages, currentPage){
    const html = `
    ${mapComponents(reports, reportPreview)}
    `
    document.getElementById("ncr-report-list").innerHTML = html;

    renderPaginationControls(totalPages, currentPage, reportData);
     previewBindings();
}


let applySortListeners = (currentReports, targetID) => {
    document.querySelectorAll('#' + targetID + ' th').forEach(header => {
        header.addEventListener('click', function(){
            let column = this.getAttribute('data-column');
            let currentOrder = this.getAttribute('data-order');
            let newOrder = currentOrder === 'desc' ? 'asc' : 'desc';

            sortOrder[column] = newOrder;             

            let sortedReports = sortReports(currentReports, column, newOrder);
            currentPage = 1;   
           ReportList("root", null, sortedReports, currentPage);
                  
        });
    });
    
};

let sortReports = (reports, column, order) => {
    return reports.sort((a,b) => {
        let valA = a[column];
        let valB = b[column];
        
        if(column === 'date'){
            
            valA = new Date(valA).getTime();
            valB = new Date(valB).getTime();
            
        }
        
         if(column === 'ncrNumber'){
            
            valA = typeof(valA) === 'string' ? parseInt(valA.replace(/-/g, '')) : valA;
            valB = typeof(valB) === 'string' ? parseInt(valB.replace(/-/g, '')) : valB;
            
        }

        if(order === 'asc'){
            
            if(valA > valB) return 1;
            if(valA < valB) return -1;
            
            return 0;
        }
        else{
            
            if(valA < valB)return 1;
            if(valA > valB)return -1;
            return 0;
        }
    });
}

let getReportsForPage = (page, reports) => {
    let startIndex = (page - 1) * reportsPerPage;
    let endIndex = startIndex + reportsPerPage;
    let paginatedReports = [];

    for (let i = startIndex; i < endIndex && i < reports.length; i++) {
        paginatedReports.push(reports[i]);
    }

    return paginatedReports;

};

function renderPaginationControls (totalPages, currentPage, reports) {
    
    let paginationContainer = document.getElementById("pagination-controls");

    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = "pagination-controls";
        paginationContainer.classList.add('pagination-container'); // Optional styling class
        document.querySelector('.ncr-list').after(paginationContainer); // Insert after the table
    }

    // Inject HTML for pagination buttons
    let paginationHtml = `
        <button id="previous-page" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    paginationHtml += `
        <button id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;

    paginationContainer.innerHTML = paginationHtml;

    // Event delegation for pagination buttons
    paginationContainer.addEventListener('click', (event) => {
        let target = event.target;
        
        if (target.id === 'previous-page') {
            goToPage(currentPage - 1, getReportsForPage(currentPage -1, reports));
        } else if (target.id === 'next-page') {
            goToPage(currentPage + 1, getReportsForPage(currentPage +1 , reports));
        } else if (target.classList.contains('page-btn')) {
            const selectedPage = parseInt(target.getAttribute('data-page'));
            if(selectedPage === currentPage) return;
            goToPage(selectedPage, getReportsForPage(selectedPage, reports));
        }
    });
}

function goToPage(page, reports){
   
        ReportList("root",null, reports, page)
   
}

function reportListHeader(){ 

        return `
        <thead>
        <tr>
            <th data-column="ncrNumber" tabindex="4" data-order="${sortOrder.ncrNumber}">NCR no.</th>
            <th data-column="date" tabindex="4" data-order="${sortOrder.date}">Date</th>
            <th data-column="supplierName" tabindex="4" data-order="${sortOrder.supplierName}">Supplier</th>
            <th data-column="status" tabindex="4" data-order="${sortOrder.status}">Status</th>

            <th></th>
        </tr>
        </thead>
    `;

   

    

    
}