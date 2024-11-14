import {injectOrReturn} from "../utils/utils.js";
import {app} from "../../AppState.js";
import {createReport, generateNcrNumber, getReportFormData} from "./utils.js";
import {safeTruthy} from "../utils/utils.js";
import {ReportList} from "../ReportList.js";
import {reportData, updateReport} from "../../Data/new_reportData.js";
import {validateForm} from "./utils.js";


export function ReportView(report, action){
    // take the employee's role to determine what sections are editable and what is read only


    let QAReadOnly = true;
    let engiReadOnly = true;
    let purchaseReadOnly = true;
    let exportReadOnly = true;
    let newNCR;
    let empAction;

    if(report === null){
        newNCR = generateNcrNumber();
    }

    let returnToList = () => {
        ReportList('root', app.employee, reportData)
        app.history.flush()
    }

    let saveReport = (action) => {
        // when we save the report check which section recieved edits and based on the section update the status to the next position
        // when the status changes send notification to the job role
        // when the notification sends send the email to the job role employee
    let errors = validateForm()

    if(errors.get().length === 0){ // check if there are any errors if not then we can save or update the NCR form.
        if(action === "Create"){
            const newReport = createReport(app.employee)
            newReport.status = "Engineering"
            app.storage.pushNewReport(newReport.ncrNumber, newReport.status);
            updateReport(newReport.ncrNumber, newReport);
            ReportList('root', app.employee, reportData)
            app.history.flush()

        }
        if(action === "Edit"){
            let ncrNum = document.getElementById('txt-ncr-number')
            let report = getReportFormData();



            updateReport(ncrNum, report);
            ReportList('root', app.employee, reportData)
            app.history.flush()
        }
    }
}

    let DisplayView = () => {
        // uses the app.employee to determine a role and sets appropriate sections to but readonly

        if(action === "Edit" || action === "Create"){
            // this limits the create and edit functions to only be emplolyee role specific
            empAction = app.employee.department;
            if(app.employee.department === "QA"){
            QAReadOnly === false;
            engiReadOnly === true;
            purchaseReadOnly === true;
            exportReadOnly === true;

            $( "#accordion" ).accordion({ active: 0})
        }

        if(app.employee.department === "engineering"){
            QAReadOnly === true;
            engiReadOnly === false;
            purchaseReadOnly === true;
            exportReadOnly === true;

            $( "#accordion" ).accordion({ active: 1})
        }
        if(app.employee.department === "sales"){
            QAReadOnly === true;
            engiReadOnly === true;
            purchaseReadOnly === false;
            exportReadOnly === true;

            $( "#accordion" ).accordion({ active: 2})
        }
        if(app.employee.department === "admin"){
             QAReadOnly === false;
            engiReadOnly === false;
            purchaseReadOnly === false;
            exportReadOnly === false;

            $( "#accordion" ).accordion({ active: 0})
        }
        }
        else{
            // this means its set to View
            QAReadOnly === true;
            engiReadOnly === true;
            purchaseReadOnly === true;
            exportReadOnly === true;
        }



    }


// within the QA form, add the autocomplete to the supplier name
    // if the supplier name does not exsist add a button to create a new supplier with the data needed from the data model
    const html = `
<h1 class="Report-view-header">Report Details</h1>
   
    <div class="iso-header">
       
            <div><label>Document No.</label><p>OPS-00011</p></div>
            <div><label>Document Title:</label><p>Non-Conformance Report</p></div>
            <div>
            <label>NCR No:</label>
            <p>${report?.ncrNumber || newNCR}</p>
            </div>

            <div><label>Document Author:</label><p>M. Hunt</p></div>
            <div><label>Document Date:</label><p>August 12, 2023</p></div>
            <div><label>Approved By:</label><p>J. Fish, Operations Manager</p></div>
            <div><label>Revision Date:</label><p>July 14, 2024</p></div>
            <div><label>Revision No:</label><p>013</p></div>
    
    </div>


<form class="ncr-report">    
<div id="accordion">
    <h2>Quality Assurance</h2>
                   
            <div class="quality-assurance-inputs">
                <div class="qa-left-container">
                    <ul>
                        <li>
                            <label class= "required" for="txt-ncr-number" id="lbl-ncr-number">NCR No:</label>
                            <input readonly aria-errormessage="ncr-number-error" name="ncr-number" required type="text" aria-describedby="lbl-ncr-number" id="txt-ncr-number"
                            value="${report?.ncrNumber || newNCR}"/>
                            <label id="ncr-number-error" class="error-label"></label>
                        </li>
                        
                        <li>
                            <label class="required" for="txt-prod-number" id="lbl-prod-number">Product No:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="prod-number-error" name="prod-number" required type="number" aria-describedby="lbl-prod-number" id="txt-prod-number"
                            value="${safeTruthy(report?.prodNumber, '')}"/>
                            <label id="prod-number-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-sales-number" id="lbl-sales-number">Sales Order No:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="sales-number-error" name="sales-number" required type="number" aria-describedby="lbl-sales-number" id="txt-sales-number"
                            value="${safeTruthy(report?.salesNumber, '')}"/>
                            <label id="sales-number-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-quantity-received" id="lbl-quantity-received">Qty. Received:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="quantity-received-error" name="quantity-received" required type="number" aria-describedby="lbl-quantity-received" id="txt-quantity-received"
                            value="${safeTruthy(report?.qtyReceived, '')}"/>
                            <label id="quantity-received-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-quantity-defective" id="lbl-quantity-defective">Qty. Defective:</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="quantity-defective-error" name="quantity-defective" required type="number" aria-describedby="lbl-quantity-defective" id="txt-quantity-defective"
                            value="${safeTruthy(report?.qtyDefective, '')}"/>
                            <label id="quantity-defective-error" class="error-label"></label>
                        </li>
                    </ul>  

                    <hr>
                    <ul class= "checkbox-align">      
                        <li>
                            <input ${QAReadOnly ? "disabled" : ''} name="non-conforming" aria-describedby="lbl-non-conforming" type="checkbox" id="chk-non-conforming" 
                               ${report?.nonConforming ? 'checked' : ''}/>
                            <label id="lbl-non-conforming" for="chk-non-conforming">Item Non-Conforming?</label>   
                        </li>
                        <li>
                            <input ${QAReadOnly ? "disabled" : ''} name="engineering-required" aria-describedby="lbl-engineering-required" type="checkbox" id="chk-engineering-required" 
                                ${report?.productionOrder ? 'checked' : ''}/>
                            <label id="lbl-engineering-required" for="chk-engineering-required">Engineering Required?</label>                     
                        </li>
                    </ul>
                    

                    <hr>

                    
                        <ul class= "checkbox-align">    
                            <li>
                               
                                <input ${QAReadOnly ? "disabled" : ''} name="supplier-or-rec" aria-describedby="lbl-supplier-or-rec" type="radio" id="rad-supplier-or-rec" 
                                ${ report?.supplierOrRec ? 'checked' : ''}/>
                                 <label id="lbl-supplier-or-rec" for="rad-supplier-or-rec">Supplier or Rec-Insp</label>
                                <label id="QA-supplier-or-rec-radio-error" class="error-label"></label>
                            </li>
                            <li>
                                
                                <input ${QAReadOnly ? "disabled" : ''} name="wip" aria-describedby="lbl-wip" type="radio" id="rad-wip" 
                                ${ report?.supplierOrRec === false ? 'checked' : ''}/>
                                <label id="lbl-wip" for="rad-wip">WIP</label>
                                <label id="QA-wip-radio-error" class="error-label"></label>
                            </li>                     
                        </ul>
                         
                
                </div>
                <div class="qa-right-container">
                    <div>
                        <div>
                            <label class="required" for="txt-supplier" id="lbl-supplier">Supplier Name</label>
                            <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="supplier-error" name="supplier-name" required type="text" aria-describedby="lbl-supplier" id="txt-supplier"
                            value="${report?.supplierName || ''}"/>
                            <label id="supplier-error" class="error-label"></label>
                        </div>
                        <fieldset class="col-2">
                            <legend>Description of Item</legend>
                            <div>
                                <label class="required" for="txt-sap-number" id="lbl-sap-number"></label>
                                <input ${QAReadOnly ? "readonly" : ''} aria-errormessage="sap-number-error" name="sap-number" required type="number" aria-describedby="lbl-sap-number" id="txt-sap-number"
                                value="${safeTruthy(report?.sapNumber, '')}" placeholder="SAP No"/>
                                <label id="sap-number-error" class="error-label"></label>
                            </div>
                            <div>
                                <label class="required" for="txt-item-name" id="lbl-item-name"></label>
                                <input ${QAReadOnly ? "readonly" : ''} name="item-name" type="text" required  id="txt-item-name" aria-errormessage="item-name-error" aria-describedby="lbl-item-name"
                                value="${report?.itemName || ''}" placeholder="Item Name"/>
                                <label id="item-name-error" class="error-label"></label>
                            </div>
                        </field>
                    </div>
                    <div>
                        <label class="required" for="txt-item-defect" id="lbl-item-defect">Description of Defect</label>
                        <textarea ${QAReadOnly ? "readonly" : ''} required aria-errormessage="item-defect-error"  aria-describedby="lbl-item-defect" id="txt-item-defect">${report?.defectDescription || ''}</textarea>
                        <label id="item-defect-error" class="error-label"></label>
                    </div>
        
                    
                
                </div>     
            </div>


    <h2>Engineering</h2>
        
            <div class="engineering-inputs">
                <div class="engi-left-container">
                    
                <fieldset>
                    <legend>Review by CF Engineering</legend>

                        
                    <ul>
                    
                        <li>
                            <input ${engiReadOnly? "readonly" : ""} id="rad-use-as-is" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-use-as-is" value="useAsIs" name="rad-engiReview"
                            ${report?.engineeringReview === "useAsIs"? 'checked' : ''}>
                            <label for="rad-use-as-is" id="lbl-use-as-is">Use as is</label>
                            <label id="engineering-review-radio-error" class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "readonly" : ""} id="rad-repair" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-repair" value="Repair" name="rad-engiReview"
                            ${report?.engineeringReview === "Repair"? 'checked' : ''}>
                            <label for="rad-repair" id="lbl-repair">Repair</label>
                            <label id="engineering-review-radio-error" class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "readonly" : ""} id="rad-rework" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-rework" value="Rework" name="rad-engiReview"
                            ${report?.engineeringReview === "Rework"? 'checked' : ''}>
                             <label for="rad-rework" id="lbl-rework">Rework</label>
                            <label id="engineering-review-radio-error" class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "readonly" : ""} id="rad-scrap" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-scrap" value="Scrap" name="rad-engiReview"
                            ${report?.engineeringReview === "Scrap"? 'checked' : ''}>
                            <label for="rad-scrap" id="lbl-scrap">Scrap</label>
                            <label id="engineering-review-radio-error" class="error-label"></label>
                        </li>
                    </ul>    

                </fieldset>
                    
                

                <ul class= "eng-checkbox-align">
                        <li>
                            <input ${engiReadOnly ? "disabled" : ''} name="customer-notification" aria-describedby="lbl-customer-notification" type="checkbox" id="chk-customer-notification" 
                            ${report?.customerNotification ? 'checked' : ''}/>
                            <label id="lbl-customer-notification" for="chk-customer-notification">Does Customer Require Notification of NCR?</label>
                        </li>
                        <li>
                            <input ${engiReadOnly ? "disabled" : ''} name="drawing-to-update" aria-describedby="lbl-drawing-to-update" type="checkbox" id="chk-drawing-to-update" 
                            ${report?.drawingToUpdate ? 'checked' : ''}/>
                            <label id="lbl-drawing-to-update" for="chk-drawing-to-update">Does the drawing require updating?</label>
                        </li>
                </ul>

                </div>
                <div class="engi-right-container">
                        <div class="col-2">
                            <div>
                                <label class="required" for="txt-orig-rev-number" id="lbl-orig-rev-number">Orig Rev. Number</label>
                                <input readonly aria-errormessage="orig-rev-number-error" name="orig-rev-number" required type="number" aria-describedby="lbl-orig-rev-number" id="txt-orig-rev-number"
                                value="${report?.origRevNum || 1 }"/>
                                <label id="orig-rev-number-error" class="error-label"></label>
                            </div>
                            <div>
                                <label class="required" for="txt-name-engineer" id="lbl-name-engineer">Name of Engineer</label>
                                <input readonly aria-errormessage="name-engineer-error" name="name-engineer" required type="text" aria-describedby="lbl-name-engineer" id="txt-name-engineer"
                                value="${safeTruthy(report?.NameOfEngineer, app.employee.firstName + " " + app.employee.lastName)}"/>
                                <label id="sap-number-error" class="error-label"></label>
                            </div>
                        
                        </div>
                        <div class="col-2">
                            <div>
                                <label class="required" for="txt-updated-rev" id="lbl-updated-rev">Updated Rev. Number </label>
                                <input ${engiReadOnly ? "readonly" : ''} aria-errormessage="updated-rev-error" name="updated-rev" required type="number" aria-describedby="lbl-updated-rev" id="txt-updated-rev"
                                value="${safeTruthy(report?.UpdatedRev, '')}"/>
                                <label id="updated-rev-error" class="error-label"></label>
                            </div>
                            <div>
                                <label class="required" for="txt-revision-date" id="lbl-revision-date">Revision Date</label>
                                <input ${engiReadOnly ? "readonly" : ''} aria-errormessage="revision-date-error" name="revision-date" required type="datetime-local" aria-describedby="lbl-revision-date" id="txt-revision-date"
                                value="${safeTruthy(report?.RevisionDate, Date.now())}"/>
                                <label id="sap-number-error" class="error-label"></label>
                            </div>
                        </div>
   
                        <div>
                            <label class="required" for="txt-engi-disposition" id="lbl-engi-disposition">Disposition</label>
                            <textarea ${engiReadOnly ? "readonly" : ''} required aria-errormessage="Engineering-disposition-error"  aria-describedby="lbl-engi-disposition" id="txt-engi-disposition">${report?.Disposition || ''}</textarea>
                            <label id="Engineering-disposition-error" class="error-label"></label>
                        </div>
                   </div>
            </div>
        
    <h2>Purchasing</h2>
        
            <div class="purchasing-inputs">
                <div class="purchasing-left-container">

                    <fieldset>
                        <legend>Purchasing's Preliminary Decision</legend>
                    
                    
                        <input ${purchaseReadOnly? "readonly" : ""} aria-errormessage="purchase-decision-rework-error" type="radio" aria-describedby="lbl-purchase-decision-rework" value="Rework" name="rad-purchaseReview"
                        ${report?.engineeringReview === "Rework"? 'checked' : ''}>
                        <label for="rad-purchase-decision-rework" id="lbl-purchase-decision-rework">Rework "In-House"</label>
                        <label id="purchase-decision-rework-error" class="error-label"></label>
                        
                        
                        <input required ${engiReadOnly? "readonly" : ""} aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-repair" value="Repair" name="rad-engiReview"
                        ${report?.engineeringReview === "Repair"? 'checked' : ''}>
                        <label for="rad-repair" id="lbl-repair">Repair</label>
                        <label id="engineering-review-radio-error" class="error-label"></label>
                        
                        
                        <input required ${engiReadOnly? "readonly" : ""} aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-rework" value="Rework" name="rad-engiReview"
                        ${report?.engineeringReview === "Rework"? 'checked' : ''}>
                        <label for="rad-rework" id="lbl-rework">Rework</label>
                        <label id="engineering-review-radio-error" class="error-label"></label>
                        
                        
                        <input required ${engiReadOnly? "readonly" : ""} aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-scrap" value="Scrap" name="rad-engiReview"
                        ${report?.engineeringReview === "Scrap"? 'checked' : ''}>
                        <label for="rad-scrap" id="lbl-scrap">Scrap</label>
                        <label id="engineering-review-radio-error" class="error-label"></label>
                    </fieldset>    
                
                </div>
                <div class="purchasing-right-container">
                            <label class="required" for="txt-engi-disposition" id="lbl-engi-disposition">Disposition</label>
                            <textarea ${engiReadOnly ? "readonly" : ''} required aria-errormessage="Engineering-disposition-error"  aria-describedby="lbl-engi-disposition" id="txt-engi-disposition">${report?.Disposition || ''}</textarea>
                            <label id="Engineering-disposition-error" class="error-label"></label>
                </div>     
            </div>
        
    <h2>Export</h2>
        <div>
            <p>placeholder content</p>
        </div>
        
</div>
<div>
<button id="submitBtn" >${action}</button>
<button id="cancelBtn" >Cancel</button>
</div>

</form>
    
    
    
    `;
 // fix the text to better describe the submit action ie. save, create
 // number inputs changed to text fields


// add functionality to allow multiple sections to be open here.
    $(document).ready( function() {
        $( "#accordion" ).accordion({
            collapsible: true
        });
    });

// add event listeners

document.getElementById("root").innerHTML = html;
document.getElementById('submitBtn').addEventListener('click', (e) => {saveReport(action)});
document.getElementById(('cancelBtn')).addEventListener('click', (e) => {returnToList()});
DisplayView();
}