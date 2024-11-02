import {injectOrReturn} from "../utils/utils";
import {app} from "../../AppState";
import { generateNcrNumber } from "./utils.js";
import {safeTruthy} from "../utils/utils.js";


export function ReportView(report, viewIndex, role){
    // take the employee's role to determine what sections are editable and what is read only

    let DisplayView = () => {
        // takes the desired view and ensures that is open first.
        if(role === "QA") return 0;
        if(role === "engi")return 1;
        if(role === "purchase")return 2;
        if(role === "admin")return 0;
        if(role === null)return 0;


    }

    let ReadOnly = () => {
        if(role === "QA") return 0;
        if(role === "engi")return 1;
        if(role === "purchase")return 2;
    }



    const html = `
<h1 class="Report-view-header">Report Details</h1>
<div class="iso-header">
    <div class="iso-row">
        <div><label>Document No.</label><p>OPS-00011</p></div>
        <div><label>Document Title:</label><p>Non-Conformance Report</p></div>
        <div><label>NCR No: ${report.ncrNumber}</label></div>
    </div>
    <div class="iso-row">
        <div><label>Document Author:</label><p>M. Hunt</p></div>
        <div><label>Document Date:</label><p>August 12, 2023</p></div>
        <div><label>Approved By:</label><p>J. Fish, Operations Manager</p></div>
        <div><label>Revision Date:</label><p>July 14, 2024</p></div>
        <div><label>Revision No:</label><p>013</p></div>
    </div>

</div>    
<div id="accordion">
    <h2>Quality Assurance</h2>
                   
            <div class="quality-assurance-inputs">
                <div class="qa-left-container">
                    <ul>
                        <li>
                            <label class= "required" for="txt-ncr-number" id="lbl-ncr-number">NCR No:</label><br>
                            <input readonly aria-errormessage="ncr-number-error" name="ncr-number" required type="text" aria-describedby="lbl-ncr-number" id="txt-ncr-number"
                            value="${report?.ncrNumber || generateNcrNumber()}"/>
                            <label id="ncr-number-error" class="error-label"></label>
                        </li>
                        
                        <li>
                            <label class="required" for="txt-prod-number" id="lbl-prod-number">Product No:</label><br>
                            <input ${readonly ? "readonly" : ''} aria-errormessage="prod-number-error" name="prod-number" required type="number" aria-describedby="lbl-prod-number" id="txt-prod-number"
                            value="${safeTruthy(report?.prodNumber, '')}"/>
                            <label id="prod-number-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-sales-number" id="lbl-sales-number">Sales Order No:</label><br>
                            <input ${readonly ? "readonly" : ''} aria-errormessage="sales-number-error" name="sales-number" required type="number" aria-describedby="lbl-sales-number" id="txt-sales-number"
                            value="${safeTruthy(report?.salesNumber, '')}"/>
                            <label id="sales-number-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-quantity-received" id="lbl-quantity-received">Qty. Received:</label><br>
                            <input ${readonly ? "readonly" : ''} aria-errormessage="quantity-received-error" name="quantity-received" required type="number" aria-describedby="lbl-quantity-received" id="txt-quantity-received"
                            value="${safeTruthy(report?.qtyReceived, '')}"/>
                            <label id="quantity-received-error" class="error-label"></label>
                        </li>
                        <li>
                            <label class="required" for="txt-quantity-defective" id="lbl-quantity-defective">Qty. Defective:</label><br>
                            <input ${readonly ? "readonly" : ''} aria-errormessage="quantity-defective-error" name="quantity-defective" required type="number" aria-describedby="lbl-quantity-defective" id="txt-quantity-defective"
                            value="${safeTruthy(report?.qtyDefective, '')}"/>
                            <label id="quantity-defective-error" class="error-label"></label>
                        </li>
                        <li>
                            <label id="lbl-supplier-or-rec" for="chk-supplier-or-rec">Supplier or Rec-Insp</label>
                            <input ${readonly ? "disabled" : ''} name="supplier-or-rec" aria-describedby="lbl-supplier-or-rec" type="checkbox" id="chk-supplier-or-rec" 
                            ${ checked 'checked' : ''}/>
                        </li>
                        <li>
                            <label class="${labelClass}" id="${labelID}" for="${inputID}">${labelContent}</label>
                            <input ${readonly ? "disabled" : ''} name="${inputName}" aria-describedby="${labelID}" type="checkbox" id="${inputID}" 
                               ${checked ? 'checked' : ''}/>
                        </li>
                        <li>
                            <label class="${labelClass}" id="${labelID}" for="${inputID}">${labelContent}</label>
                            <input ${readonly ? "disabled" : ''} name="${inputName}" aria-describedby="${labelID}" type="checkbox" id="${inputID}" 
                                ${checked ? 'checked' : ''}/>
                        </li>                    
                    </ul>
                        
                
                </div>
                <div class="qa-right-container">
                    <div>
                        <div>
                            <label class="required" for="txt-supplier" id="lbl-supplier">Supplier Name</label>
                            <input ${readonly ? "readonly" : ''} aria-errormessage="supplier-error" name="supplier-name" required type="text" aria-describedby="lbl-supplier" id="txt-supplier"
                            value="${report?.supplierName || ''}"/>
                            <label id="supplier-error" class="error-label"></label>
                        </div>
                        <div>
                            <div>
                                <label class="required" for="txt-sap-number" id="lbl-sap-number">SAP No</label>
                                <input ${readonly ? "readonly" : ''} aria-errormessage="sap-number-error" name="sap-number" required type="number" aria-describedby="lbl-sap-number" id="txt-sap-number"
                                value="${safeTruthy(report?.sapNumber, '')}"/>
                                <label id="sap-number-error" class="error-label"></label>
                            </div>
                            <div>
                                <label class="required" for="txt-item-name" id="lbl-item-name">Item Name</label>
                                <input ${readonly ? "readonly" : ''} name="item-name" type="text" required  id="txt-item-name" aria-errormessage="item-name-error" aria-describedby="lbl-item-name"
                                value="${report?.itemName || ''}"/>
                                <label id="item-name-error" class="error-label"></label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="required" for="txt-item-defect" id="lbl-item-defect">Description of Defect</label>
                        <textarea ${readonly ? "readonly" : ''} required aria-errormessage="item-defect-error"  aria-describedby="lbl-item-defect" id="txt-item-defect">${report?.defectDescription || ''}</textarea>
                        <label id="item-defect-error" class="error-label"></label>
                    </div>
                
                </div>     
            </div>
    <h2>Engineering</h2>
        
            <div class="engineering-inputs">
                <div class="engi-left-container">
                    
                
                </div>
                <div class="engi-right-container">
                
                </div>     
            </div>
        
    <h2>Purchasing</h2>
        <div>
            <div class="purchasing-inputs">
                <div class="purchasing-left-container">
                    
                
                </div>
                <div class="purchasing-right-container">
                
                </div>     
            </div>
        </div>
    <h2>Export</h2>
        <div>
        
        </div>
        
</div>
    
    
    
    `;

    $( function() {
        $( "#accordion" ).accordion({
            collapsible: true,
            active: DisplayView()
        });
    })

// add event listeners
document.getElementById("root").innerHTML = html;
}