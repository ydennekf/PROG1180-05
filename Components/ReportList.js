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

    let onlyOpenReports = [];
    for(let i = 0; Reports.length > i; i++){
        if(Reports[i].status !== "Closed"){
            console.log(Reports[i])
            onlyOpenReports.push(Reports[i]);
        }
    }
    currentPage = page;

    let ReportList = `
    <div id="report-filtering" class="filter-container"></div>
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
    console.log(onlyOpenReports);
    renderList(onlyOpenReports, currentPage);
        if(!document.getElementById("report-search")){
            SearchBar('report-filtering')
            try{document.getElementById('create-report-btn').style.display = 'block';}
            catch{
                // only happens if logged in user is not QA or Admin
            }
        
        document.getElementById('report-search').style.display = 'block';
        document.getElementById('lbl-search').style.display = "inline";
        }

    applySortListeners(reportData, targetID)
}

export function renderList(reports, currentPage = 1){
    const totalPages = Math.ceil(reports.length / reportsPerPage);

    const paginatedReports = getReportsForPage(currentPage, reports)
    const html = `
    ${mapComponents(paginatedReports, reportPreview)}
    `
    document.getElementById("ncr-report-list").innerHTML = html;

    renderPaginationControls(totalPages, currentPage, reports);
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
    return reports.slice(startIndex, endIndex);
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
            goToPage(currentPage - 1, reports);
        } else if (target.id === 'next-page') {
            goToPage(currentPage + 1, reports);
        } else if (target.classList.contains('page-btn')) {
            const selectedPage = parseInt(target.getAttribute('data-page'));
            if(selectedPage === currentPage) return;
            goToPage(selectedPage, reports);
        }
    });
}

function goToPage(page, reports){
   
        renderList(reports, page)
   
}

function reportListHeader(){ 

        return `
        <thead>
        <tr class="report-preview-row">
            <th data-column="ncrNumber" tabindex="4" data-order="${sortOrder.ncrNumber}">NCR no.</th>
            <th data-column="date" tabindex="4" data-order="${sortOrder.date}">Date</th>
            <th data-column="supplierName" tabindex="4" data-order="${sortOrder.supplierName}">Supplier</th>
            <th data-column="status" tabindex="4" data-order="${sortOrder.status}">Status</th>

            <th></th>
        </tr>
        </thead>
    `;

   

    

    
}