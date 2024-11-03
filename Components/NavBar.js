import { app } from "../AppState.js"

import { qualityAssuranceForm } from "./NcrFormView/QualityAssuranceForm.js";

import { reportData } from "./../Data/new_reportData.js";

import { ReportList } from "./ReportList.js";
import { ModifyNcrView } from "./NcrFormView/ModifyNcrView.js";
import {ReportView} from "./NcrFormView/ReportView.js";

export function NavBar(){
    const html = `
    <nav>
            <ul class='nav-list'>
                <li>
                    <img id='crossfire-logo' class='logo' src="../image/crossfire-logo-no-bkg-darkmode.png" alt="crossfire's logo" />
                </li>
                <li>
                <div id="emp-info"></div>
                </li>
            </ul>
    </nav>
            <div id="bread-crumbs"> </div>
            
    `

    document.getElementById('nav-wrapper').innerHTML = html;
}

export function SearchBar(targetID) {

    if (document.getElementById("report-search")) {
        // its a messy fix but it disables the continuous rerender of the search bar
        return;
    }else{
        console.log("testing-search");
    }


    let html = `
        <div><button id="create-report-btn" aria-label="create New Report" tabindex="1">New Report</button></div>
        <ul class='nav-list'>
            <li><h2>Filter</h2></li>
            <li id='search-container' class='search-container'>
                    
                    <label for="report-search" style="display:inline;" id="lbl-search">search by supplier or ncr no.</label>
                    <input type="text"  id="report-search" placeholder="search ncr reports ..."
                        aria-label="search-description" aria-autocomplete="list" 
                         tabindex="1">   
            </li>
            <li>
                <label for="status-filter">Status:</label>
                <select id="status-filter" name="status-filter">
                    <option value="">All</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Awaiting Engineering">Awaiting Engineering</option>
                    <option value="Awaiting Purchasing">Awaiting Purchasing</option>
                    <option value="Pending Signoff">Pending Signoff</option>
                </select>
            </li>
            <li>
                            
                <label for="start-date">Start Date:</label>
                <input type="text" id="start-date" placeholder="Select start date">
                
                <label for="end-date">End Date:</label>
                <input type="text" id="end-date" placeholder="Select end date">
            </li>
            <li>
                <button id="filter-button">Apply Filters</button>
            </li>
        </ul>
        
    `




    document.getElementById(targetID).innerHTML = html;
    document.getElementById("create-report-btn").addEventListener("click", () => {
        app.history.newPath({component: 'ModifyNcrView', data: ['root', app.employee, null]})
        ReportView(null);
    });

     $("#start-date, #end-date").datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        changeYear: true
    });

function applyFilters() {
        const searchTerm = $("#report-search").val().toLowerCase();
        const statusFilter = $("#status-filter").val();
        const startDate = $("#start-date").datepicker("getDate");
        const endDate = $("#end-date").datepicker("getDate");

        const filteredReports = reportData.filter(report => {
            // Convert report date to Date object
            const reportDate = new Date(report.date);

            // Apply search filter
            const matchesSearch = !searchTerm ||
                                  report.ncrNumber.toLowerCase().includes(searchTerm) ||
                                  report.supplierName.toLowerCase().includes(searchTerm);

            // Apply status filter
            const matchesStatus = !statusFilter || report.status === statusFilter;

            // Apply date range filter
            const matchesDateRange = (!startDate || reportDate >= startDate) &&
                                     (!endDate || reportDate <= endDate);

            // Return true if all conditions are met
            return matchesSearch && matchesStatus && matchesDateRange;
        });

        // Render the filtered reports
        ReportList("root", null, filteredReports, 1);
    }

    // Event listeners for filters

    $("#filter-button").on("click", applyFilters);

}