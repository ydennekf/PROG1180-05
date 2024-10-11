import {safeOr} from "../utils/utils.js";


export function qualityAssuranceForm(targetID=null,
                                     report=null,
                                     includeSubmit=true) {
    // Can be passed a report to load its details ( for edit view)
    // If a report is passed it assumes we are editing a report.
    const html = `
            <fieldset>
            <legend>Quality Assurance</legend>
                <div>
                    <label for="txt-ncr-number" id="lbl-ncr-number">Report Number</label>
                    <input name="ncr-number" required type="number" aria-describedby="lbl-ncr-number" id="txt-ncr-number"
                     value="${safeOr(report?.ncrNumber, '')}"/>
                </div>
                
                 <div>
                    <label for="txt-ncr-title" id="lbl-ncr-title">Title</label>
                    <input name="title" required type="text" aria-describedby="lbl-ncr-title" id="txt-ncr-title"
                     value="${report?.title || ''}"/>
                </div>
                
                <div>
                    <label for="txt-supplier" id="lbl-supplier">Supplier Name</label>
                    <input name="supplier-name" required type="text" aria-describedby="lbl-supplier" id="txt-supplier"
                     value="${report?.supplierName || ''}"/>
                </div>
                
                <div>
                    <label for="txt-prod-number" id="lbl-prod-number">Prod Number</label>
                    <input name="prod-number" required type="number" aria-describedby="lbl-prod-number" id="txt-prod-number"
                     value="${safeOr(report?.prodNumber, '')}"/>
                </div>
                
                <div>
                    <label for="txt-sales-number" id="lbl-sales-number">Sales Order Number</label>
                    <input name="sales-number" required type="number" aria-describedby="lbl-sales-number" id="txt-sales-number"
                     value="${safeOr(report?.salesNumber, '')}"/>
                </div>
                
                <div>
                    <label for="txt-quantity-received" id="lbl-quantity-received">Quantity Received</label>
                    <input name="quantity-received" required type="number" aria-describedby="lbl-quantity-received" id="txt-quantity-received"
                     value="${safeOr(report?.qtyReceived, '')}"/>
                </div>
                
                <div>
                    <label for="txt-quantity-defective" id="lbl-quantity-defective">Quantity Defective</label>
                    <input name="quantity-defective" required type="number" aria-describedby="lbl-quantity-defective" id="txt-quantity-defective"
                     value="${safeOr(report?.qtyDefective, '')}"/>
                </div>
                
                <div>
                    <label for="txt-item-name" id="lbl-item-name">Item Name</label>
                    <input name="item-name" type="text" required  id="txt-item-name" aria-describedby="lbl-item-name"
                    value="${report?.itemName || ''}"/>
                </div>
                
                <div>
                    <label id="lbl-item-description" for="txt-item-description">Description of Item</label>
                    <textarea name="item-description" required  id="txt-item-description" aria-describedby="lbl-item-description">${report?.itemDescription || ''}</textarea>
                </div>
                
                <div>
                    <label for="txt-sap-number" id="lbl-sap-number">SAP Number</label>
                    <input name="sap-number" required type="number" aria-describedby="lbl-sap-number" id="txt-sap-number"
                     value="${safeOr(report?.sapNumber, '')}"/>
                </div>
                
                <div>
                    <label for="txt-item-defect" id="lbl-item-defect">Description of Defect</label>
                    <textarea required  aria-describedby="lbl-item-defect" id="txt-item-defect">${report?.defectDescription || ''}</textarea>
                    
                </div>
                
                <div>
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
                
                <div>
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
                
                <div>
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
                ${includeSubmit ? '<button name="submit-report" id="btn-submit-ncr">Save Report</button>' : ''}
            </fieldset>
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
