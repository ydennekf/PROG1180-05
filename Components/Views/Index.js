import { app } from "../../AppState.js";

export default function Index(){


    const html = `
        ${RoleIndexButtons()}

    `
    // Shows most recent and some buttons based on the logged in users role

    document.getElementById('root').innerHTML = html;
    
}

function RoleIndexButtons(){
    if(!app){
        return ""
    }

    switch(app.employee.department){
        case "QA":
            return `
        <div>
            <button>Create NCR</button>
            <button>View NCRs</button>
        </div>`
    }

    
}

export function RecentReports(targetID = null){
    const recent = app.storage.getRecentReports()
    const html = `
    <table>
    ${UnsortedHeader()}
        <tbody>
        <tr><button>Recent Reports</button></tr>
        ${mapComponents(recent, reportPreview)}
        </tbody>
    </table>
    `

    return injectOrReturn(html, targetID)
}

function UnsortedHeader(){ 
    if (window.innerWidth <= 768) {
        return `
        <thead>
        <tr>
            <th data-column="ncrNumber" tabindex="4">Report</th>
            <th data-column="sapNum" tabindex="4">SAP</th>
            <th data-column="status" tabindex="4">Status</th>
            <th data-column="itemName" tabindex="4">Item Name</th>
            <th data-column="date" tabindex="4">Date</th>
            <th data-column="supplierName" tabindex="4">Supplier</th>
            <th data-column="startedBy" tabindex="4">Started</th>
         
            <th></th>
        </tr>
        </thead>
    `;
    } else {
        return `
        <thead>
        <tr>
            <th data-column="ncrNumber" tabindex="4">Report</th>
            <th data-column="sapNum" tabindex="4">SAP</th>
            <th data-column="status" tabindex="4">Status</th>
            <th data-column="itemName" tabindex="4">Item Name</th>
            <th data-column="date" tabindex="4">Date</th>
            <th data-column="supplierName" tabindex="4">Supplier</th>
            <th data-column="startedBy" tabindex="4">Started</th>
            <th data-column="description" tabindex="4">Description</th>
            <th></th>
        </tr>
        </thead>
    `;
    }
   

    

    
}