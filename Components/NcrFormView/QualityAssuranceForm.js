import {safeTruthy} from "../utils/utils.js";


export function qualityAssuranceForm(targetID=null,
                                     report=null,
                                     includeSubmit=true) {
    // Can be passed a report to load its details ( for edit view)
    // If a report is passed it assumes we are editing a report.
    const html = `
            <div class= "grid">

                <div class= "head">
                    <div class= "box">                        
                        <label id="lbl-ncr-doc-no">Document No.:</label>
                        <p>OPS-00011</p>
                    </div>

                    <div class= "box">
                        <label id="lbl-ncr-doc-title">Document Title:</label>
                        <p>Non-Conformance Report</p>
                    </div>
                    
                    <div class= "box">
                        <label id="lbl-ncr-doc-qa"></label>
                        <p>Quality Assurance Section</p>
                    </div>

                    <div class= "box">
                        <label id="lbl-ncr-doc-auth">Document Author:</label>
                        <p>L. Nicholls</p>
                    </div>

                    <div class= "box">
                        <label id="lbl-ncr-doc-date">Document Date:</label>
                        <p>August 12, 2023</p>
                    </div>

                    <div class= "box">
                        <label id="lbl-ncr-approve">Approved By:</label>
                        <p>L. Pentland, Operations Manager</p>
                    </div>

                    <div class= "box">
                        <label id="lbl-ncr-rev-date">Revision Date:</label>
                        <p>July 14, 2020</p>
                    </div>

                    <div class= "box">
                        <label id="lbl-ncr-rev-no">Revision No:</label>
                        <p>013</p>
                    </div>
                </div>
                

                <div class= "main1">
                    <div>
                        <label class= "required" for="txt-ncr-number" id="lbl-ncr-number">NCR No</label>
                        <input aria-errormessage="ncr-number-error" name="ncr-number" required type="number" aria-describedby="lbl-ncr-number" id="txt-ncr-number"
                        value="${safeTruthy(report?.ncrNumber, '')}"/>
                        <label id="ncr-number-error" class="error-label"></label>
                    </div>
                    
                    <div>
                        <label class="required" for="txt-prod-number" id="lbl-prod-number">Prod Number</label>
                        <input aria-errormessage="prod-number-error" name="prod-number" required type="number" aria-describedby="lbl-prod-number" id="txt-prod-number"
                        value="${safeTruthy(report?.prodNumber, '')}"/>
                        <label id="prod-number-error" class="error-label"></label>
                    </div>
                    
                    <div>
                        <label class="required" for="txt-sales-number" id="lbl-sales-number">Sales Order Number</label>
                        <input aria-errormessage="sales-number-error" name="sales-number" required type="number" aria-describedby="lbl-sales-number" id="txt-sales-number"
                        value="${safeTruthy(report?.salesNumber, '')}"/>
                        <label id="sales-number-error" class="error-label"></label>
                    </div>
                    
                    <div>
                        <label class="required" for="txt-quantity-received" id="lbl-quantity-received">Quantity Received</label>
                        <input aria-errormessage="quantity-received-error" name="quantity-received" required type="number" aria-describedby="lbl-quantity-received" id="txt-quantity-received"
                        value="${safeTruthy(report?.qtyReceived, '')}"/>
                        <label id="quantity-received-error" class="error-label"></label>
                    </div>
                    
                    <div>
                        <label class="required" for="txt-quantity-defective" id="lbl-quantity-defective">Quantity Defective</label>
                        <input aria-errormessage="quantity-defective-error" name="quantity-defective" required type="number" aria-describedby="lbl-quantity-defective" id="txt-quantity-defective"
                        value="${safeTruthy(report?.qtyDefective, '')}"/>
                        <label id="quantity-defective-error" class="error-label"></label>
                    </div>

                    
                    <div>
                        <label class="required" for="txt-ncr-title" id="lbl-ncr-title">Title</label>
                        <input aria-errormessage="title-error" name="title" required type="text" aria-describedby="lbl-ncr-title" id="txt-ncr-title"
                        value="${report?.title || ''}"/>
                        <label id="title-error" class="error-label"></label>
                    </div>
                </div>
                
                <div class="main3">                    
                    <div>
                        <label class="required" for="txt-supplier" id="lbl-supplier">Supplier Name</label>
                        <input aria-errormessage="supplier-error" name="supplier-name" required type="text" aria-describedby="lbl-supplier" id="txt-supplier"
                        value="${report?.supplierName || ''}"/>
                        <label id="supplier-error" class="error-label"></label>
                    </div>

                    <div>
                        <label class="required" for="txt-item-name" id="lbl-item-name">Item Name</label>
                        <input name="item-name" type="text" required  id="txt-item-name" aria-errormessage="item-name-error" aria-describedby="lbl-item-name"
                        value="${report?.itemName || ''}"/>
                        <label id="item-name-error" class="error-label"></label>
                    </div>

                    <div>
                        <label class="required" for="txt-sap-number" id="lbl-sap-number">SAP Number</label>
                        <input aria-errormessage="sap-number-error" name="sap-number" required type="number" aria-describedby="lbl-sap-number" id="txt-sap-number"
                        value="${safeTruthy(report?.sapNumber, '')}"/>
                        <label id="sap-number-error" class="error-label"></label>
                    </div>
                    
                    <div> 
                        <label class="required" id="lbl-item-description" for="txt-item-description">Description of Item</label>
                        <textarea name="item-description" aria-errormessage="item-description-error" required  id="txt-item-description" aria-describedby="lbl-item-description">${report?.itemDescription || ''}</textarea>
                        <label id="item-description-error" class="error-label"></label>
                    </div>
                    
                    <div>
                        <label class="required" for="txt-item-defect" id="lbl-item-defect">Description of Defect</label>
                        <textarea required aria-errormessage="item-defect-error"  aria-describedby="lbl-item-defect" id="txt-item-defect">${report?.defectDescription || ''}</textarea>
                        <label id="item-defect-error" class="error-label"></label>
                    </div>
                </div>

                <div class= "main2">    
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

                    <div>
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
