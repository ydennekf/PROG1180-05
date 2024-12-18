import {app, initApp} from "../AppState.js"
import * as SVG from "./svgs.js";
import {notificationBell, setNotifyListeners} from "./NavBar/notificationBell.js"
import {notificationItem} from "./NavBar/notificationItem.js";
import {qualityAssuranceForm} from "./NcrFormView/QualityAssuranceForm.js";

import {reportData} from "../Data/new_reportData.js";

import {ReportList, renderList} from "./ReportList.js";

import {ReportView} from "./NcrFormView/ReportView.js";
import {redirectHome, redirectNewReport as redirectNewNCR, redirectViewAllReports} from "../redirection/redirect.js";
import {append, setMobileMediaQuery} from "./utils/utils.js";

function bindNav() {
    const home = document.getElementById('_home')
    const create = document.getElementById("_create-ncr")
    const view = document.getElementById("_view-ncr")
    const img = document.getElementById('crossfire-logo')
    const bell = document.getElementById('_notifications')
    //document.getElementById('crossfire-logo')

    view.addEventListener("click", e => {
        if (!app) {
            return;
        }
        redirectViewAllReports(true)
    })
    home.addEventListener('click', e => {
        if (!app) {
            return;
        }
        redirectHome(true)
    })
    create.addEventListener('click', e => {
        if (!app) {
            return;
        }
        redirectNewNCR(true)
    })

    img.addEventListener('click', e => {
        if (!app) {
            return;
        }
        redirectHome(true)
    })
    bell.addEventListener('click', e => {
        // set logic here to show the dropdown
    })


}

export function loadNavOnLogin() {
    const html = `
    <ul class='nav-link-list'>
               
            
                <li id="_home" class="nav-icon">
                    
                    <div class="tooltip-container">
                    ${SVG.homeSVG()}
                    
                    Home
                    <div class="tooltip">Return Home</div>
                    </div>
                    
                    
                </li>

                <li id="_create-ncr" class="nav-icon">
                   <div class="tooltip-container">
                     ${SVG.createSVG()}
                    
                     Create
                     <div class="tooltip">Create New NCR</div>
                   </div>
                   
                  
                </li>

                <li id="_view-ncr" class="nav-icon">
                    <div class="tooltip-container">
                    ${SVG.eyeSVG()}
                    
                    Log
                    <div class="tooltip">NCR Log</div>
                    </div>
                </li>

                <li id="_view_report" class="nav-icon">
                    <div class="tooltip-container">
                    ${SVG.documentSVG()}
                    
                    Report
                    <div class="tooltip">View Reporting</div>
                    </div>
                    
                </li>

                <li>
                
                <div id="_notifications" class="nav-icon">
                    <div id="dropdownTrigger" class="tooltip-container">
                        
                    </div>
                    <div class="dropdown-content">
                        <ul id="notificationList">
                        </ul>
                    </div>
                </div>
                </li>
                

                <li id="logout">
                    
                </li>
            </ul>`
    document.getElementById("nav-links").innerHTML = "";
    append("nav-links", html)
    notificationBell()
    bindNav()
    setNotifyListeners()
}

export function clearNavOnLogout() {
    document.getElementById("_home").remove()
    document.getElementById("_create-ncr").remove()
    document.getElementById("_view-ncr").remove()
    document.getElementById("_view_report").remove()
    document.getElementById("logout").remove()
    document.getElementById("_notifications").remove()
}


export function NavBar() {
    // add navigation links here make the image direct to the dashboard.

    const html = `
    <nav id="main-nav" class="main-nav">
    
    <div id="logo-container" class="nav-logo tooltip-container">
         <img id='crossfire-logo' class='logo' src="../image/crossfire-logo-no-bkg-darkmode.png" alt="crossfire's logo" />
         <div class="tooltip bottom-tooltip">Return Home</div>
    </div>
    <div id="nav-links">
    
    </div>
   
            
            
    </nav>
            <div id="bread-crumbs"> </div>
            
    `

    document.getElementById('nav-wrapper').innerHTML = html;

    setMobileMediaQuery();

}

export function SearchBar(targetID) {

    console.log(["QA", "admin"].includes(app.employee.department))

    // separate the search box for NCR num and Supplier
    // set the search text to update on keypress again.
    let html = `
  <h1 class="ncr-log-header">NCR LOG</h1>
        
        <div class='nav-list'>
        <div class="filter-container-buttons"> 
                <div class="tooltip-container filter-button-container">
                
                    <button id="filter-reveal-button" class="nav-icon filter-nav-icon" aria-label="Filter Toggle">${SVG.filterSVG()}</button>
                
                    
            
            <div id="filter-tooltip" class="tooltip filter-tooltip">Toggle Filter Options</div>
            </div>
            
            ${["QA", "admin"].includes(app.employee.department) ? '<div class="button-container tooltip-container" ><button id="create-report-btn" aria-label="create New Report" tabindex="1">Create NCR</button><div id="create-filter-tooltip" class="tooltip bottom-tooltip">Create NCR</div></div>' : ""}
        </div>
        
        
        
        
        <ul class='nav-search collapsed' id="search-filters">
           
            
         
           
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
           <li id='start-date-container' class='search-container'>
                            
                <label for="start-date" style="display:inline;" id="lbl-start-date">Start Date:</label>
                <input type="text" id="start-date" placeholder="Select start date">
                 </li>
             <li id='end-date-container' class='search-container'>
                <label for="end-date" style="display:inline;" id="lbl-end-date">End Date:</label>
                <input type="text" id="end-date" placeholder="Select end date">
            </li>

             <li id='supplier-search-container' class='search-container'>
                    
                    <label for="supplier-search" style="display:inline;" id="lbl-supplier-search">Search by supplier</label>
                    <input type="text"  id="supplier-search" placeholder="search suppliers ..."
                        aria-label="search-supplier" aria-autocomplete="list" 
                         tabindex="1">
                            
            </li>

               <li id='ncr-search-container' class='search-container'>
                    
                    <label for="report-search" style="display:inline;" id="lbl-ncr-search">Search by ncr no.</label>
                    <input type="text"  id="report-search" placeholder="search ncr reports ..."
                        aria-label="search-ncr" aria-autocomplete="list" 
                         tabindex="1">
                            
            </li>
            <li>
                <button id="filter-button">Apply Filters</button>
            </li>
        </ul>
        <div id="active-filters"></div>
        </div>
    `


    document.getElementById(targetID).innerHTML = html;
    try {
        document.getElementById("create-report-btn").addEventListener("click", () => {
            app.history.branchPath({component: 'ReportView', data: [null, "Create"]})
            ReportView(null, "Create");
        });
    } catch {
        // only happens if the user logged in is NOT an admin/qa person
    }

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

            if (isNaN(reportDate.getTime())) {
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

        renderList(filteredReports, 1);

        clearFilterInputs();
        displayActiveFilters(statusFilter, startDate, endDate);
    }

    function clearFilterInputs() {
        $("#status-filter").val("");

        // Clear the date pickers
        $("#start-date").datepicker("setDate", null);
        $("#end-date").datepicker("setDate", null);
    }


    function displayActiveFilters(statusFilter, startDate, endDate) {
        const activeFiltersContainer = $("#active-filters");
        let filters = [];

        // Format the date for display
        const options = {year: 'numeric', month: 'short', day: 'numeric'};
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
        source: function (request, response) {
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
        source: function (request, response) {
            let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            let filteredSuggestions = reportData.filter(report => (
                matcher.test(report.supplierName)
            ));

            renderList(filteredSuggestions, 1);
            response([]);
        },
        minLength: 0
    })


}

