import {injectOrReturn, append} from "../utils/utils.js";
import {app} from "../../AppState.js";
import {createReport, errorLog, generateNcrNumber, getEngFormData, getPurchasingFormData, getReportFormData, validateEngiInputs, validatePurchasingInputs, validateQANumberInputs, validateQAStringInputs} from "./utils.js";
import {safeTruthy} from "../utils/utils.js";
import {renderList, ReportList} from "../ReportList.js";
import {reportData, updateReport} from "../../Data/new_reportData.js";
import {validateForm} from "./utils.js";
import { convertToPDF } from "../../Data/createPDF.js";
import { redirectHome, redirectViewAllReports } from "../../redirection/redirect.js";
import { createModal } from "../Modal.js";
import { EngineeringReport, PurchasingReport } from "./Reports.js";
import { checkEngineeringInProgress, validateAdmin, addEngButton, addPurchasingButton, checkPurchasingInProgress, bindAdditionButtons, shouldRevealPurchasing, shouldRevealEngineering, createQAReport, addEngReportData, addPurchasingReportData } from "./admin.js";
import { RedirectWithSuccessModal } from "./successModal.js";
import { AutoFillButtons, bindAutoFillButtons } from "./AutoFillButtons.js";

export let tempImageStorage = []
export function clearImageStorage(){
    tempImageStorage= []
}
let QAReadOnly;
let engiReadOnly;
let purchaseReadOnly;
let exportReadOnly;
let newNCR;

export function addImagesToReport(report){
    tempImageStorage.forEach(i => {
        report.imageStorage.push(i)
    })
}


function departmentBasedValidation(action, report){
    const errors = errorLog()
    const data = getReportFormData();
    if(app.employee.department === "QA"){
        validateQANumberInputs(errors, data)
        validateQAStringInputs(errors, data)
        return errors;
    }

    if(app.employee.department === "engineering"){
        validateEngiInputs(errors, data)
        return errors;
    }

    if(app.employee.department === "purchasing"){
        validatePurchasingInputs(errors)
        return errors;
    }

    if(app.employee.department === "admin"){
        validateAdmin(errors, action,report)
        return errors;
    }

   
   
}

export function ReportView(report, action){
    // take the employee's role to determine what sections are editable and what is read only


    // let QAReadOnly;
    // let engiReadOnly;
    // let purchaseReadOnly;
    // let exportReadOnly;
    // let newNCR;
    let empAction;
    let btnAction;

    if(report === null){
        newNCR = generateNcrNumber();
    }

    let returnToList = () => {
        ReportList('root', app.employee, reportData)
        app.history.flush()
        clearImageStorage()
    }

    let saveReport = (e, action) => {
        e.preventDefault()
        if(action === "View"){
            redirectViewAllReports()
            return;
        }
        // when we save the report check which section recieved edits and based on the section update the status to the next position
        // when the status changes send notification to the job role
        // when the notification sends send the email to the job role employee
    let errors = departmentBasedValidation(action, report)

    if(app.employee.department === "admin"){
        return; // handled else where
    }

    if(errors.get().length === 0){ // check if there are any errors if not then we can save or update the NCR form.
        if(action === "Create"){

            const newReport = createQAReport(app.employee)
            
           
            

        }
        if(action === "Edit"){
       
            btnAction = "Save";
            let ncrNum = document.getElementById('txt-ncr-number')
            let reportt = getReportFormData();


            // var updatedReport = createReport(reportt)
            // updatedReport.startedBy = report.startedBy;
            if(report.status === "engineering" && (app.employee.department === "engineering")){
                const eData = getEngFormData()
                const newReport = {...report}
                addEngReportData(newReport)
                // newReport.Disposition = eData.Disposition.value
                // newReport.engineeringReview = eData.engineeringReview
                // newReport.nameOfEngineer = app.employee.firstName + " " + app.employee.lastName
                // newReport.origRevNum = eData.origRevNum.value
                // newReport.updatedRev = eData.updatedRev.value
                // newReport.RevisionDate = eData.RevisionDate.value
                // newReport.drawingToUpdate = eData.drawingToUpdate.checked
                // newReport.customerNotification = eData.customerNotification.checked
                // newReport.status = "purchasing"
                // app.storage.pushRecentReport(newReport.ncrNumber)
            }

            if(report.status === "purchasing" && (app.employee.department === "purchasing")){
                const pData = getPurchasingFormData()
                const newReport = {...report}
                addPurchasingReportData(newReport)

                addImagesToReport(newReport)
                clearImageStorage()
            
                updateReport(ncrNum.value, newReport);
                app.storage.pushRecentReport(newReport.ncrNumber)
            }

      
            
            
        }

        RedirectWithSuccessModal(action, report)
    } else{
        errors.expose();
    }
}

/* CODE FOR UPLOADING IMAGES  */
    function imageUpload(){
        // check if report has any images already and load them in
        // add an imageStorage property to the report
 
        return `
            <div>
                <form id="img-form">
                    <label for="attach-img">Attach an image</label>
                
                    <input type="file" id="attach-img" required/>
                    <label id="lbl-img-err" class="error-label"></label>
                    <label for="alt-text">Alt text</label>
                    <input type="text" required id="alt-text"/>
                    <button>Add Image</button>
                </form>
            </div>
            <div id="image-grid">
            
            </div>
        `
    }
  
    function attachImage(){
        const files = document.getElementById('attach-img').files
        if(files.length <= 0){return;}
        // console.log(files[i])
            var reader = new FileReader();
            const img = new Image()
            let src;
            //let id;
            reader.addEventListener(
                "load",
                () => {
                    // convert image file to base64 string

                    src = reader.result;
                    const data = {img:src, addedBy:app.employee.username,alt:document.getElementById('alt-text').value}
                    imgGridItem(data, 'image-grid');
                    tempImageStorage.push(data)
                    document.getElementById('alt-text').value = ""
            const input = document.getElementById('attach-img')
            input.value = null;
                },
                false,
            );
            reader.readAsDataURL(files[0]);
            
            
    }

    function bindUpload(tempStorage){
        
        document.getElementById('img-form').onsubmit = (e)=>{
            e.preventDefault();
            attachImage(tempStorage)
           
        };

        if(report){
            report.imageStorage.forEach(i =>{
                imgGridItem(i, "image-grid")
            })
        }
    }


   

    function imgGridItem(data, targetID=null, appendContent=true){
        const html = `
            <div class="img-grid-item">
                <span>Attached by ${data.addedBy}</span>
                <a href="${data.img}" target="_blank"><img id=${data.img.substring(25, 50)} src="${data.img}" alt="${data.alt}"/></a>
            </div>
        `

        if(appendContent){
            append(targetID, html)
            
        }

        
        return html;
    }

    function setReadonly(){
        
        if(action === "Edit" || action === "Create"){
            // this limits the create and edit functions to only be emplolyee role specific
            empAction = app.employee.department;

            console.log("Edit or saved")
            if(app.employee.department === "QA"){
            QAReadOnly = false;
            engiReadOnly = true;
            purchaseReadOnly = true;
            exportReadOnly = true;
            
        }

        if(app.employee.department === "engineering"){
            console.log("testing emp engineer")
            QAReadOnly = true;
            engiReadOnly = false;
            purchaseReadOnly = true;
            exportReadOnly = true;
            

        }

        if(app.employee.department === "purchasing"){
            QAReadOnly = true;
            engiReadOnly = true;
            purchaseReadOnly = false;
            exportReadOnly = true;
        

        }

        if(app.employee.department === "admin"){
            QAReadOnly = false;
           engiReadOnly = false;
           purchaseReadOnly = false;
           exportReadOnly = false;
           

       }

       if(report?.status === "closed" || report?.status === "Closed" || (action !== "Edit" && action !== "Create"))
        {
            console.log("Status")
            QAReadOnly = true;
            engiReadOnly = true;
            purchaseReadOnly = true;
            exportReadOnly = true;
            
        }

        
    }
}

    let DisplayView = () => {
        // uses the app.employee to determine a role and sets appropriate sections to but readonly

        if(action === "Edit" || action === "Create"){
            // this limits the create and edit functions to only be emplolyee role specific
            empAction = app.employee.department;

            console.log("Edit or saved")
            if(app.employee.department === "QA"){
            QAReadOnly = false;
            engiReadOnly = true;
            purchaseReadOnly = true;
            exportReadOnly = true;
            $("#accordion").multiAccordion({

                active: 0

              });
        }

        else if(app.employee.department === "engineering"){
            console.log("testing emp engineer")
            QAReadOnly = true;
            engiReadOnly = false;
            purchaseReadOnly = true;
            exportReadOnly = true;
             $("#accordion").multiAccordion({

                active: 1

              });

        }
        else if(app.employee.department === "purchasing"){
            console.log("purchasing")
            QAReadOnly = true;
            engiReadOnly = true;
            purchaseReadOnly = false;
            exportReadOnly = true;
            $("#accordion").multiAccordion({

                active: 2

              });

        }
        else if(app.employee.department === "admin"){
             QAReadOnly = false;
            engiReadOnly = false;
            purchaseReadOnly = false;
            exportReadOnly = false;
            $("#accordion").multiAccordion({

                active: 0

              });

        }
        else if(report?.status === "closed" || report?.status === "Closed")
        {
            console.log("Status")
            QAReadOnly = true;
            engiReadOnly = true;
            purchaseReadOnly = true;
            exportReadOnly = true;
            
        }
        }
        else{
            // this means its set to View
            console.log("ELSING????")
            QAReadOnly = true;
            engiReadOnly = true;
            purchaseReadOnly = true;
            exportReadOnly = true;
                  if(app.employee.department === "QA"){
            $("#accordion").multiAccordion({ active: 0});
        }

        if(app.employee.department === "engineering"){
             $("#accordion").multiAccordion({active: 1});

        }
        if(app.employee.department === "sales"){
            $("#accordion").multiAccordion({active: 2});
        }
        if(app.employee.department === "admin"){
            $("#accordion").multiAccordion({ active: 0});
        }}
        
    }


setReadonly()
// within the QA form, add the autocomplete to the supplier name
    // if the supplier name does not exsist add a button to create a new supplier with the data needed from the data model
    console.log(purchaseReadOnly, "come the fuck on")
    
    const html = `
<h1 class="Report-view-header">Create NCR</h1>
   
    <div class="iso-header">
       
            <div><label>Document No.</label><p>OPS-00011</p></div>
            <div><label>Document Title:</label><p>Non-Conformance Report</p></div>
            <div>
            <label>NCR No:</label>
            <p>${report?.ncrNumber || newNCR}</p>
            </div>

            <div><label>Document Author:</label><p>M. Hunt</p></div>
            <div><label>Document Date:</label><p>August 12, 2023</p></div>
            <div><label>Approved By:</label><p>J. Fish, Oper. Manager</p></div>
            <div><label>Revision Date:</label><p>July 14, 2024</p></div>
            <div><label>Revision No:</label><p>013</p></div>
            ${report?.status !== "Closed"  && report?.status !== "Archived" && action !== "View" && report ?`<div><button id="close-ncr">Close NCR</button></div>` : ''}
    
    </div>


<form class="ncr-report">   
<div id="accordion">
    <h2 data-role="QA">Quality Assurance</h2>
                   
            <div class="quality-assurance-inputs">
                <div class="qa-left-container">
                    <ul class="qa-labels">
                        <li>
                            <label class= "required" for="txt-ncr-number" id="lbl-ncr-number">&nbsp; NCR No:</label>
                            <input readonly aria-errormessage="ncr-number-error" name="ncr-number" required type="text" aria-describedby="lbl-ncr-number" id="txt-ncr-number"
                            value="${report?.ncrNumber || newNCR}"/>
                            <label id="ncr-number-error" class="error-label"></label>
                        </li>
                        
                        <li>
                            <label class="required" for="txt-prod-number" id="lbl-prod-number"><span class="required-marker">*</span> Product No:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="prod-number-error" name="prod-number" required type="text" aria-describedby="lbl-prod-number" id="txt-prod-number"
                            value="${safeTruthy(report?.prodNumber, '')}"/>
                            <label id="prod-number-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-sales-number" id="lbl-sales-number"><span class="required-marker">*</span>Sales Order No:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="sales-number-error" name="sales-number" required type="text" aria-describedby="lbl-sales-number" id="txt-sales-number"
                            value="${safeTruthy(report?.salesNumber, '')}"/>
                            <label id="sales-number-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-quantity-received" id="lbl-quantity-received"><span class="required-marker">*</span>Qty. Received:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="quantity-received-error" name="quantity-received" required type="number" aria-describedby="lbl-quantity-received" id="txt-quantity-received"
                            value="${safeTruthy(report?.qtyReceived, '')}" min="1"/>
                            <label id="quantity-received-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-quantity-defective" id="lbl-quantity-defective"><span class="required-marker">*</span>Qty. Defective:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="quantity-defective-error" name="quantity-defective" required type="number" aria-describedby="lbl-quantity-defective" id="txt-quantity-defective"
                            value="${safeTruthy(report?.qtyDefective, '')}" min="1"/>
                            <label id="quantity-defective-error" class="error-label"></label>
                        </li>
                    </ul>  
                                     
                    <ul class= "qa-checkbox-align">
                        <span class="required-marker">*</span>
                        <label for="wip-or-rec">Identify Process Applicable:</label>
                            
                            <li>  
                                <input ${QAReadOnly ? "disabled" : ''} name="wip-or-rec" aria-describedby="lbl-supplier-or-rec" type="radio" id="rad-supplier-or-rec" 
                                ${ report?.supplierOrRec ? 'checked' : ''}/>
                                 <label id="lbl-supplier-or-rec" for="rad-supplier-or-rec">Supplier or Rec-Insp</label>
                                <label id="QA-supplier-or-rec-radio-error" class="error-label"></label>
                            </li>
                            <li>
                                <input ${QAReadOnly ? "disabled" : ''} name="wip-or-rec" aria-describedby="lbl-wip" type="radio" id="rad-wip" 
                                ${ report?.supplierOrRec === false ? 'checked' : ''}/>
                                <label id="lbl-wip" for="rad-wip">WIP</label>
                                <label id="QA-wip-radio-error" class="error-label"></label>
                            </li>                     
                        </ul>               
                </div>

                <div class="qa-right-container">
                    <div>
                        <div>
                            <label class="required" for="txt-supplier" id="lbl-supplier"><span class="required-marker">*</span> Supplier Name</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="supplier-error" name="supplier-name" required type="text" aria-describedby="lbl-supplier" id="txt-supplier"
                            value="${report?.supplierName || ''}"/>
                            <label id="supplier-error" class="error-label"></label>
                            <div id="create-supplier-modal" title="Create New Supplier" style="display: none;">
                                <form id="create-supplier-form">
                                    <label for="new-supplier-name">Supplier Name:</label>
                                    <input type="text" id="new-supplier-name" name="new-supplier-name">
                                    <!-- Add more fields if necessary -->
                                </form>
                            </div>
                        </div>
                        <fieldset class="no-border">
                            <legend><span class="required-marker">*</span> Description of Item</legend>
                            <div class="sap-width hypen">
                                <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="sap-number-error" name="sap-number" required type="number" aria-describedby="lbl-sap-number" id="txt-sap-number"
                                value="${safeTruthy(report?.sapNumber, '')}" placeholder="SAP No"/>
                                <label class="required" for="txt-sap-number" id="lbl-sap-number"></label>
                                <label id="sap-number-error" class="error-label"></label>
                            </div>
                            
                            <div class= "item -width">
                                <input ${QAReadOnly ? "readonly" : ''} name="item-name" type="text" required  id="txt-item-name" aria-errormessage="item-name-error" aria-describedby="lbl-item-name"
                                value="${report?.itemName || ''}" placeholder="Item Name"/>
                                <label class="required" for="txt-item-name" id="lbl-item-name"></label>
                                <label id="item-name-error" class="error-label"></label>
                            </div>
                        </field>
                    </div>
                    <div>
                        <label class="required" for="txt-item-defect" id="lbl-item-defect"><span class="required-marker">*</span> Description of Defect</label>
                        <textarea ${QAReadOnly ? "readonly" : ''} required aria-errormessage="item-defect-error"  aria-describedby="lbl-item-defect" id="txt-item-defect">${report?.defectDescription || ''}</textarea>
                        <label id="item-defect-error" class="error-label"></label>
                    </div>

                    <div class= "qa-checkbox-align col-2">      
                        <div>
                            <input ${QAReadOnly ? "disabled" : ''} name="non-conforming" aria-describedby="lbl-non-conforming" type="checkbox" id="chk-non-conforming" 
                               ${report?.nonConforming ? 'checked' : ''}/>
                            <label id="lbl-non-conforming" for="chk-non-conforming"><span class="required-marker">*</span>Item Non-Conforming?</label>   
                        </div>
                        <div>
                            <input ${QAReadOnly ? "disabled" : ''} name="engineering-required" aria-describedby="lbl-engineering-required" type="checkbox" id="chk-engineering-required" 
                                ${report?.engineeringRequired ? 'checked' : ''}/>
                            <label id="lbl-engineering-required" for="chk-engineering-required"><span class="required-marker">*</span>Engineering Required?</label>                     
                        </div>
                    </div>       
                </div>     
            </div>

           
            ${EngineeringReport(report, engiReadOnly)}
            
            ${PurchasingReport(report, purchaseReadOnly)}
    

             
            
    <h2>Export & Upload</h2>
        <div>
            ${report ? `<button id="export-pdf" data-ncr-number="${report.ncrNumber}">Export as PDF</button>` : 'Cannot export a report in the creation stage!'}

            ${imageUpload()}
        </div>
        
</div>
<div class="ncr-submit-cancel">
<button id="submitBtn">${action === "View" ? "Back" : "Save"}</button>
<button id="cancelBtn" >Cancel</button>
${app.employee.department === "admin" && (action === "Create" || action === "Edit") && !checkEngineeringInProgress() ? `${addEngButton()}` : ""}
${app.employee.department === "admin" &&  (action === "Create" || action === "Edit") && !checkPurchasingInProgress() ? `${addPurchasingButton()}` : ""}
${AutoFillButtons()}
</div>

</form>
    
    
    
    `;
 // fix the text to better describe the submit action ie. save, create
 // number inputs changed to text fields


// add functionality to allow multiple sections to be open here.
$.widget("custom.multiAccordion", $.ui.accordion, {

  options: {
    // Custom option to allow multiple sections open
    multiple: true,

  },
  _create: function() {
    this._super();
    var self = this;

    // Modify the click handler to support multiple sections
    this.headers.unbind("keydown").unbind("click").on("click", function(event) {
      self._clickHandler(event, $(this));
    });
  },
  _clickHandler: function(event, header) {
    var options = this.options;
    var active = header.next();

    // Toggle the active panel
    if (options.multiple) {
      header.toggleClass("ui-accordion-header-active ui-state-active ui-corner-top")
            .next().toggleClass("ui-accordion-content-active").slideToggle();
    } else {
      this._super(event, header);
    }
  }
});

// Initialize the custom multiAccordion
$(document).ready(function(){
  $("#accordion").multiAccordion({
    header: "> h2",
    collapsible: true,
    animate: 200,
    icons: null,
    multiple: true, // Enable multiple sections open
      heightStyle: "auto"
  });
});

function bindExport(){

    var s = document.createElement('script');
    s.type = 'module';
    let code = `
    import { convertToPDF } from "../Data/createPDF.js";
    try{
     const archiveBtns = document.getElementById('export-pdf')
         archiveBtns.addEventListener('click', (ev) =>  pdfMake.createPdf(convertToPDF(ev.target.dataset.ncrNumber)).open())
         
} catch{
 }
    `
    try {
        s.appendChild(document.createTextNode(code));
        document.body.appendChild(s);
      } catch (e) {
        s.text = code;
        document.body.appendChild(s);
      }   
    
}



// add event listeners
//DisplayView()
document.getElementById("root").innerHTML = html;
document.getElementById('submitBtn').addEventListener('click', (e) => {saveReport(e, action)});
try{
    document.getElementById(('cancelBtn')).addEventListener('click', (e) => {returnToList()});
}
catch{ // removing this button if its irrelevant 

}
try{


document.getElementById(("chk-car-raised" )).addEventListener('click', (e)=>{checkCarRaised(e)} );
document.getElementById(("chk-followup-req" )).addEventListener('click', (e)=>{checkFollowup(e)});
}catch{
    // bandage fix because some of these wont exist depending on the department
}
DisplayView();
bindExport()
bindUpload()
bindAdditionButtons()
shouldRevealPurchasing(action, report, purchaseReadOnly)
shouldRevealEngineering(action, report, engiReadOnly)
bindAutoFillButtons()
try{
    document.getElementById('close-ncr').addEventListener('click', ()=> {
        report.status = "Closed"
        redirectViewAllReports(true)
        createModal('errorPanel', "Success", "You have closed report " + report.ncrNumber, 10000)
    })
}catch{

}

$("#txt-supplier").autocomplete({
        source: function(request, response){
              let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
           let filteredSuggestions = reportData.filter(report => (
               matcher.test(report.supplierName)
           ));
            const supplierNames = filteredSuggestions.map(report => report.supplierName)
            const uniqueNames = [...new Set(supplierNames)]

            if(uniqueNames.length > 0) {
                response(uniqueNames.slice(0,3).map(name => ({label: name, value: name})));
            }
            else{
                response([{
                    label: "Add new supplier",
                    value: "",
                    isAddNew: true
                }]);
            }

        },
    minLength: 0,
     select: function (event, ui) {
        if (ui.item.isAddNew) {
            // Open the modal to create a new supplier
            openCreateSupplierModal();
            // Prevent default behavior
            event.preventDefault();
        } else {
            // Set the input value to the selected supplier name
            $(this).val(ui.item.value);
        }
    }
    })

    $("#dtp-purchase-date, #dtp-followup-date").datepicker({
        dateFormat: "M/d/yy",
        changeMonth: true,
        changeYear: true
    });

    function openCreateSupplierModal() {
    $("#create-supplier-modal").dialog({
        modal: true,
        buttons: {
            "Create Supplier": function () {
                // Get the supplier name from the form
                var supplierName = $("#new-supplier-name").val().trim();
                if (supplierName) {
                    createNewSupplier(supplierName);
                    $(this).dialog("close");
                } else {
                    alert("Please enter a supplier name.");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            // Reset the form when the dialog is closed
            $("#create-supplier-form")[0].reset();
        }
    });
}

function createNewSupplier(supplierName){
    document.getElementById("txt-supplier").value = supplierName;
}


function checkCarRaised(e) {
    const CarNumContainer = document.getElementById("txt-car-num");

    if(e.target.checked){
        CarNumContainer.style.display = "block"
    }else{
        CarNumContainer.style.display = "none"
    }
}
function checkFollowup(e) {
    const followupContainer = document.getElementById("followup-inputs");

    if(e.target.checked){
        followupContainer.style.display = "block"
    }else{
        followupContainer.style.display = "none"
    }
}

    }
