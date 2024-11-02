import { app } from "../AppState.js"

import { qualityAssuranceForm } from "./NcrFormView/QualityAssuranceForm.js";

import { reportData } from "./../Data/new_reportData.js";

import { ReportList } from "./ReportList.js";
import { ModifyNcrView } from "./NcrFormView/ModifyNcrView.js";

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

export function SearchBar(targetID){ 

    if(document.getElementById("report-search")){
        // its a messy fix but it disables the continuous rerender of the search bar
        return;
    }
    


    let html = `
    
        <ul class='nav-list'>
            <li id='new-report-container' class='new-report-container'>
                <button id="create-report-btn" aria-label="create New Report" tabindex="1">New Report</button>
            </li>
            <li id='search-container' class='search-container'>
                    
                    
                    <input type="text"  id="report-search" placeholder="search ncr reports ..."
                        aria-label="search-description" aria-autocomplete="list" 
                         tabindex="1">
                        <label for="report-search" style="display:inline;" id="lbl-search">Find a report</label>
                    
            </li>
        </ul>
        
    `
    


    document.getElementById(targetID).innerHTML = html;
    document.getElementById("create-report-btn").addEventListener("click", () => {
        app.history.newPath({component:'ModifyNcrView', data:['root', app.employee, null]})
        ModifyNcrView("root",app.employee, null);
    })  

    $(function () {

        function filterReports(term) {
            let matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
    
            let filteredReports = reportData.filter(report => (
                matcher.test(report.title) ||
                matcher.test(report.itemName) ||
                matcher.test(report.supplierName) ||
                matcher.test(report.status) ||
                matcher.test(report.description)
            ));
            // this is where the reports are rendered through will need to figure out pagination over the break.
            ReportList("root",null, filteredReports.slice(0,10));
        }
    
    
        
        // this handles the drop down list population which we are not currently using
        $("#report-search").autocomplete({
            source: function(request, response){
                let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
    
                filterReports(request.term);
    
                let filteredSuggestions = reportData.flatMap(report => [
                    {category: "Report Title", label: report.title, value: report.title},
                    {category: "Item Name", label: report.itemName, value: report.itemName},
                    {category: "Supplier", label: report.supplierName, value: report.supplierName},
                    {category: "Status", label: report.status, value: report.status},
                    {category: "Description", label: report.description, value: report.description}
                ]).filter(item => matcher.test(item.label));
    
                
                response(filteredSuggestions.slice(0,0));
            },
            minLength: 0,
            select: function (event, ui) {
                // action when an item is selected from the auto complete
                console.log("selected:" + ui.item.label);
            },
            open: function () {
                // $("#report-search").attr("aria-expanded" , "true");
            },
            close: function () {
                //$("#report-search").attr("aria-expanded" , "false");
            }
        })
    });
}