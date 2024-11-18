import { app, initApp } from "../AppState.js"

import { qualityAssuranceForm } from "./NcrFormView/QualityAssuranceForm.js";

import { reportData } from "../Data/new_reportData.js";

import { ReportList, renderList } from "./ReportList.js";

import {ReportView} from "./NcrFormView/ReportView.js";
import { redirectHome, redirectNewReport as redirectNewNCR, redirectViewAllReports } from "../redirection/redirect.js";

function bindNav(){
    const home = document.getElementById('_home')
    const create = document.getElementById("_create-ncr")
    const view = document.getElementById("_view-ncr")
    const img = document.getElementById('crossfire-logo')
    //document.getElementById('crossfire-logo')

    view.addEventListener("click", e => {
        if(!app){
            return;
        }
        redirectViewAllReports(true)
    })
    home.addEventListener('click', e =>{
        if(!app){
            return;
        } 
        redirectHome(true)
    })
    create.addEventListener('click', e => {
        if(!app){
            return;
        }
        redirectNewNCR(true)
    })

    img.addEventListener('click', e =>{
        if(!app){
            return;
        }
        redirectHome(true)
    })


}


export function NavBar(){
    // add navigation links here make the image direct to the dashboard.
    
    const html = `
    <nav>
    <div class="centre">

    <img id='crossfire-logo' class='logo' src="../image/crossfire-logo-no-bkg-darkmode.png" alt="crossfire's logo" />
            <ul class='nav-list'>
               
            
                <li id="_home">
                    Home
                </li>

                <li id="_create-ncr">
                    New NCR
                </li>

                <li id="_view-ncr">
                    View NCR's
                </li>

                <li id="_view_report">
                    Reports
                </li>

                <li>
                <div id="emp-info"></div>
                </li>

                <li id="logout">
                    
                </li>
            </ul>
            </div>
    </nav>
            <div id="bread-crumbs"> </div>
            
    `

    document.getElementById('nav-wrapper').innerHTML = html;
    bindNav()
}

export function SearchBar(targetID) {



    // separate the search box for NCR num and Supplier
    // set the search text to update on keypress again.
    let html = `
  <h2>View NCR's</h2>
        <div class="button-container" ><button id="create-report-btn" aria-label="create New Report" tabindex="1">New Report</button></div>
        <ul class='nav-list'>
            <li><h2>Filter</h2></li>
            
            <li id='ncr-search-container' class='search-container'>
                    
                    <label for="report-search" style="display:inline;" id="lbl-search">Search by ncr no.</label>
                    <input type="text"  id="report-search" placeholder="search ncr reports ..."
                        aria-label="search-description" aria-autocomplete="list" 
                         tabindex="1">
                            
            </li>
            <li id='supplier-search-container' class='search-container'>
                    
                    <label for="supplier-search" style="display:inline;" id="lbl-search">Search by supplier</label>
                    <input type="text"  id="supplier-search" placeholder="search suppliers ..."
                        aria-label="search-description" aria-autocomplete="list" 
                         tabindex="1">
                            
            </li>
            <li id='supplier-search-container' class='search-container'>
                <label for="status-filter" style="display:inline;" id="lbl-search">Status:</label>
                <select id="status-filter" name="status-filter">
                    <option value="">All</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="engineering">Engineering</option>
                    <option value="sales">Purchasing</option>
                    <option value="Pending Signoff">Pending Signoff</option>
                </select>
            </li>
           <li id='supplier-search-container' class='search-container'>
                            
                <label for="start-date" style="display:inline;" id="lbl-search">Start Date:</label>
                <input type="text" id="start-date" placeholder="Select start date">
                 </li>
             <li id='supplier-search-container' class='search-container'>
                <label for="end-date" style="display:inline;" id="lbl-search">End Date:</label>
                <input type="text" id="end-date" placeholder="Select end date">
            </li>
            <li>
                <button id="filter-button">Apply Filters</button>
            </li>
        </ul>
        <div id="active-filters"></div>
    `




    document.getElementById(targetID).innerHTML = html;
    document.getElementById("create-report-btn").addEventListener("click", () => {
        app.history.branchPath({component: 'ReportView', data: [null, "Create"]})
        ReportView(null, "Create");
    });

     $("#start-date, #end-date").datepicker({
        dateFormat: "M/d/yy",
        changeMonth: true,
        changeYear: true
    });

function applyFilters() {

        const statusFilter = $("#status-filter").val();
        const startDate = $("#start-date").datepicker("getDate");
        const endDate = $("#end-date").datepicker("getDate");

        const filteredReports = reportData.filter(report => {
            // Convert report date to Date object
            const reportDateStr = cleanDateString(report.date)
            const reportDate = new Date(reportDateStr);

            if(isNaN(reportDate.getTime())){
                 console.error(`Invalid date for report ${report.ncrNumber}: ${report.date}`);
                return false; // Exclude reports with invalid dates
            }

            // Apply status filter
            const matchesStatus = !statusFilter || report.status === statusFilter;

            // Apply date range filter
            const matchesDateRange = (!startDate || reportDate >= startDate) &&
                                     (!endDate || reportDate <= endDate);

                return matchesStatus && matchesDateRange;
        });

        // Render the filtered reports

        renderList(filteredReports,  1);

        clearFilterInputs();
        displayActiveFilters(statusFilter, startDate, endDate);
    }

    function clearFilterInputs(){
              $("#status-filter").val("");

            // Clear the date pickers
            $("#start-date").datepicker("setDate", null);
            $("#end-date").datepicker("setDate", null);
    }


    function displayActiveFilters(statusFilter, startDate, endDate){
           const activeFiltersContainer = $("#active-filters");
    let filters = [];

    // Format the date for display
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formatDate = (date) => date ? date.toLocaleDateString(undefined, options) : null;

    // Check which filters are active and add them to the array
    if (statusFilter) {
        filters.push(`Status: ${statusFilter}`);
    }
    if (startDate) {
        filters.push(`Start Date: ${formatDate(startDate)}`);
    }
    if (endDate) {
        filters.push(`End Date: ${formatDate(endDate)}`);
    }

    // If no filters are active, display a message
    if (filters.length === 0) {
        activeFiltersContainer.html("<p>No filters applied.</p>");
    } else {
        activeFiltersContainer.html(`<p>Active Filters: ${filters.join(', ')}</p>`);
    }
    }
    function cleanDateString(dateStr) {
    return dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
}

    // Event listeners for filters

    $("#filter-button").on("click", applyFilters);

    $("#report-search").autocomplete({
        source: function(request, response){
            let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
           let filteredSuggestions = reportData.filter(report => (
               matcher.test(report.ncrNumber)
           ));

            renderList(filteredSuggestions, filteredSuggestions.length / 10, 1);
            response([]);
        },
        minLength: 0
    })

    $("#supplier-search").autocomplete({
        source: function(request, response){
              let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
           let filteredSuggestions = reportData.filter(report => (
               matcher.test(report.supplierName)
           ));

            renderList(filteredSuggestions,  1);
            response([]);
        },
        minLength: 0
    })


}