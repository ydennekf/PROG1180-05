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


}


export function NavBar(){
    // add navigation links here make the image direct to the dashboard.
    
    const html = `
    <nav>
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
        <div><button id="create-report-btn" aria-label="create New Report" tabindex="1">New Report</button></div>
        <ul class='nav-list'>
            <li><h2>Filter</h2></li>
            
            <li id='ncr-search-container' class='search-container'>
                    
                    <label for="report-search" style="display:inline;" id="lbl-search">search by ncr no.</label>
                    <input type="text"  id="report-search" placeholder="search ncr reports ..."
                        aria-label="search-description" aria-autocomplete="list" 
                         tabindex="1">
                            
            </li>
            <li id='supplier-search-container' class='search-container'>
                    
                    <label for="supplier-search" style="display:inline;" id="lbl-search">search by supplier</label>
                    <input type="text"  id="supplier-search" placeholder="search suppliers ..."
                        aria-label="search-description" aria-autocomplete="list" 
                         tabindex="1">
                            
            </li>
            <li>
                <label for="status-filter">Status:</label>
                <select id="status-filter" name="status-filter">
                    <option value="">All</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="engineering">Engineering</option>
                    <option value="sales">Purchasing</option>
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
        app.history.branchPath({component: 'ReportView', data: [null, "Create"]})
        ReportView(null, "Create");
    });

     $("#start-date, #end-date").datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        changeYear: true
    });

function applyFilters() {

        const statusFilter = $("#status-filter").val();
        const startDate = $("#start-date").datepicker("getDate");
        const endDate = $("#end-date").datepicker("getDate");

        const filteredReports = reportData.filter(report => {
            // Convert report date to Date object
            const reportDate = new Date(report.date);
            const data = [];
            // Apply status filter
            const matchesStatus = !statusFilter || report.status === statusFilter;
            data.push(matchesStatus);
            // Apply date range filter
            const matchesDateRange = (!startDate || reportDate >= startDate) &&
                                     (!endDate || reportDate <= endDate);
            data.push(matchesDateRange);
            console.log(data);
                return data;
        });

        // Render the filtered reports

        renderList(filteredReports, Math.ceil(reportData.length / 10), 1);
    }

    // Event listeners for filters

    $("#filter-button").on("click", applyFilters);

    $("#report-search").autocomplete({
        source: function(request, response){
            let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
           let filteredSuggestions = reportData.filter(report => (
               matcher.test(report.ncrNumber)
           ));

            renderList(filteredSuggestions, Math.ceil(reportData.length / 10), 1);
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

            renderList(filteredSuggestions, Math.ceil(reportData.length / 10), 1);
            response([]);
        },
        minLength: 0
    })


}