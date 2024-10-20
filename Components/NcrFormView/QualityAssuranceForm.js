import {safeOr} from "../utils/utils.js";


export function qualityAssuranceForm(targetID=null,
                                     report=null,
                                     includeSubmit=true) {
    // Can be passed a report to load its details ( for edit view)
    // If a report is passed it assumes we are editing a report.
    const html = `
            <div class= "grid">

                <div class= "head">Quality Assurance</div>

                <div>
                    <label class= "required main1" for="txt-ncr-number" id="lbl-ncr-number">NCR No</label>
                    <input class= "main1b" aria-errormessage="ncr-number-error" name="ncr-number" required type="number" aria-describedby="lbl-ncr-number" id="txt-ncr-number"
                     value="${safeOr(report?.ncrNumber, '')}"/>
                     <label id="ncr-number-error" class="error-label"></label>
                </div>
                
                 <div>
                    <label class="required main2" for="txt-ncr-title" id="lbl-ncr-title">Title</label>
                    <input class= "main2b" aria-errormessage="title-error" name="title" required type="text" aria-describedby="lbl-ncr-title" id="txt-ncr-title"
                     value="${report?.title || ''}"/>
                     <label id="title-error" class="error-label"></label>
                </div>
                 
                <div>
                    <label class="required main3" for="txt-supplier" id="lbl-supplier">Supplier Name</label>
                    <input class= "main3b" aria-errormessage="supplier-error" name="supplier-name" required type="text" aria-describedby="lbl-supplier" id="txt-supplier"
                     value="${report?.supplierName || ''}"/>
                     <label id="supplier-error" class="error-label"></label>
                </div>
                
                <div>
                    <label class="required main4" for="txt-prod-number" id="lbl-prod-number">Prod Number</label>
                    <input class= "main4" aria-errormessage="prod-number-error" name="prod-number" required type="number" aria-describedby="lbl-prod-number" id="txt-prod-number"
                     value="${safeOr(report?.prodNumber, '')}"/>
                     <label id="prod-number-error" class="error-label"></label>
                </div>
                
                <div>
                    <label class="required main5" for="txt-sales-number" id="lbl-sales-number">Sales Order Number</label>
                    <input class= "main5" aria-errormessage="sales-number-error" name="sales-number" required type="number" aria-describedby="lbl-sales-number" id="txt-sales-number"
                     value="${safeOr(report?.salesNumber, '')}"/>
                     <label id="sales-number-error" class="error-label"></label>
                </div>
                
                <div>
                    <label class="required main6"  for="txt-quantity-received" id="lbl-quantity-received">Quantity Received</label>
                    <input class= "main6" aria-errormessage="quantity-received-error" name="quantity-received" required type="number" aria-describedby="lbl-quantity-received" id="txt-quantity-received"
                     value="${safeOr(report?.qtyReceived, '')}"/>
                     <label id="quantity-received-error" class="error-label"></label>
                </div class= "main1">
                
                <div>
                    <label class="required main7" for="txt-quantity-defective" id="lbl-quantity-defective">Quantity Defective</label>
                    <input class= "main7" aria-errormessage="quantity-defective-error" name="quantity-defective" required type="number" aria-describedby="lbl-quantity-defective" id="txt-quantity-defective"
                     value="${safeOr(report?.qtyDefective, '')}"/>
                     <label id="quantity-defective-error" class="error-label"></label>
                </div>
                
                <div>
                    <label class="required main8" for="txt-item-name" id="lbl-item-name">Item Name</label>
                    <input class= "main8" name="item-name" type="text" required  id="txt-item-name" aria-errormessage="item-name-error" aria-describedby="lbl-item-name"
                    value="${report?.itemName || ''}"/>
                    <label id="item-name-error" class="error-label"></label>
                </div>
                
                <div> 
                    <label class="required main9" id="lbl-item-description" for="txt-item-description">Description of Item</label>
                    <textarea class= "main9" name="item-description" aria-errormessage="item-description-error" required  id="txt-item-description" aria-describedby="lbl-item-description">${report?.itemDescription || ''}</textarea>
                    <label id="item-description-error" class="error-label"></label>
                </div>
                
                <div>
                    <label class="required main10" for="txt-sap-number" id="lbl-sap-number">SAP Number</label>
                    <input class= "main10" aria-errormessage="sap-number-error" name="sap-number" required type="number" aria-describedby="lbl-sap-number" id="txt-sap-number"
                     value="${safeOr(report?.sapNumber, '')}"/>
                     <label id="sap-number-error" class="error-label"></label>
                </div>
                
                <div>
                    <label class="required main11" for="txt-item-defect" id="lbl-item-defect">Description of Defect</label>
                    <textarea  class= "main11" required aria-errormessage="item-defect-error"  aria-describedby="lbl-item-defect" id="txt-item-defect">${report?.defectDescription || ''}</textarea>
                    <label id="item-defect-error" class="error-label"></label>
                </div>
                
                <div class= "main12">
                    ${labeledCheckbox(
                        'chk-non-conforming', 
                        'non-conforming', 
                        '', 
                        'lbl-non-conforming', 
                        'Item Non-Conforming?', 
                        '',
                        null,
                        report?.nonConforming || false)}
                </div>
                
                <div class= "main13">
                    ${labeledCheckbox(
                        'chk-supplier-or-rec', 
                        'supplier-or-rec', 
                        '',
                        'lbl-supplier-or-rec', 
                        'Supplier or Rec-Insp', 
                        '',
                        null,
                        report?.nonConforming || false)}
                </div>
                
                <div class= "main14">
                    ${labeledCheckbox(
                        'chk-production-order', 
                        'production-order', 
                        '', 
                        'lbl-production-order', 
                        'WIP (Production Order)', 
                        '',
                        null,
                        report?.nonConforming || false)}
                </div>

                <div class= "main15">
                ${labeledCheckbox(
                    'chk-engineering-required', 
                    'engineering-required', 
                    '', 
                    'lbl-engineering-required', 
                    'Engineering Required?', 
                    '',
                    null,
                    report?.engineeringRequired || false)}
                </div>

                <div class= "foot">
                ${includeSubmit ? '<button name="submit-report" id="btn-submit-ncr">Save Report</button>' : ''}
                </div>
            </div>
    `

    if(targetID) {
        document.getElementById(targetID).innerHTML = html;
    }
    return html
}

function labeledCheckbox( // prob going to delete this thought it might make the html cleaner but, it makes it uglier
    // and I don't think it's overly necessary
    inputID,
    inputName,
    inputClass,
    labelID,
    labelContent,
    labelClass,
    targetID= null,
    checked = false

){

    const html = `
        <label class="${labelClass}" id="${labelID}" for="${inputID}">${labelContent}</label>
        <input name="${inputName}" aria-describedby="${labelID}" type="checkbox" id="${inputID}" 
            ${checked ? 'checked' : ''}/>
    `

    if(targetID){
        if(typeof targetID !== 'string'){
            throw new Error("Invalid id " + targetID + " passed to a LabeledInput component. (Non string object passed)");
        }
        document.getElementById(targetID).innerHTML = html;
    } else{
        return html
    }
}
