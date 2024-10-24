import { reportData } from "../../Data/new_reportData.js";
import { ReportList } from "../ReportList.js";






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

        
        // any time you filter or sort it will re-render the table at page 1.
       
        // this is where the reports are rendered through will need to figure out pagination over the break.
        ReportList("root",null, filteredReports, 1);
    }


    

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

            
            response(filteredSuggestions.slice(0,10));
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