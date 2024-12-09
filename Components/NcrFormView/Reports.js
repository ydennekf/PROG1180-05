import { injectOrReturn } from "../utils/utils.js"
import { app } from "../../AppState.js"

export function EngineeringReport(report, engiReadOnly, targetID = null, hidden=false){
    const html = `
    <h2 data-role="engineering" id="engineering-header">Engineering</h2>
        
            <div class="engineering-inputs">
                <div class="engi-top-container">
                    
                <fieldset>
                    <legend><span class="required-marker">*</span>&nbsp;Review by CF Engineering</legend>
                    <div id="engineering-exists" style="display:none;"></div>
                        
                    <ul class= "col-2">
                    
                        <li>
                            <input ${engiReadOnly? "disabled" : ""} id="rad-use-as-is" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-use-as-is" value="useAsIs" name="rad-engiReview"
                            ${report?.engineeringReview === "useAsIs"? 'checked' : ''}>
                            <label for="rad-use-as-is" id="lbl-use-as-is">Use as is</label>
                            <label class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "disabled" : ""} id="rad-repair" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-repair" value="Repair" name="rad-engiReview"
                            ${report?.engineeringReview === "Repair"? 'checked' : ''}>
                            <label for="rad-repair" id="lbl-repair">Repair</label>
                            <label  class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "disabled" : ""} id="rad-rework" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-rework" value="Rework" name="rad-engiReview"
                            ${report?.engineeringReview === "Rework"? 'checked' : ''}>
                             <label for="rad-rework" id="lbl-rework">Rework</label>
                            <label  class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "disabled" : ""} id="rad-scrap" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-scrap" value="Scrap" name="rad-engiReview"
                            ${report?.engineeringReview === "Scrap"? 'checked' : ''}>
                            <label for="rad-scrap" id="lbl-scrap">Scrap</label>
                            <label id="engineering-review-radio-error" class="error-label"></label>
                        </li>
                    </ul>    

                </fieldset>
                    
                

                <ul class= "eng-checkbox-align">
                        <li class= "chkBox2">
                            <input ${engiReadOnly ? "disabled" : ''} name="customer-notification" aria-describedby="lbl-customer-notification" type="checkbox" id="chk-customer-notification" 
                            ${report?.customerNotification ? 'checked' : ''}/>
                            <label id="lbl-customer-notification" for="chk-customer-notification">Does Customer Require Notification of NCR?</label>
                        </li>
                        <li class= "chkBox2">
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
                                <input readonly aria-errormessage="name-engineer-error" name="name-engineer" type="text" aria-describedby="lbl-name-engineer" id="txt-name-engineer"
                                value="${report?.nameOfEngineer || ["engineering", "admin"].includes(app.employee.department)  ? app.employee.username : ""}"/>
                                <label id="name-engineer-error" class="error-label"></label>
                            </div>
                        
                        </div>
                        <div class="col-2">
                            <div>
                                <label class="required" for="txt-updated-rev" id="lbl-updated-rev">Updated Rev. Number </label>
                                <input ${engiReadOnly ? "readonly" : ''} min="1" aria-errormessage="updated-rev-error" name="updated-rev" type="number" aria-describedby="lbl-updated-rev" id="txt-updated-rev"
                                value="${report?.updatedRev || 1}"/>
                                <label id="updated-rev-error" class="error-label"></label>
                            </div>
                            <div>
                                <label class="required" for="txt-revision-date" id="lbl-revision-date">Revision Date</label>
                                <input ${engiReadOnly ? "readonly" : ''} aria-errormessage="revision-date-error" name="revision-date" type="date" aria-describedby="lbl-revision-date" id="txt-revision-date"
                                value="${report?.RevisionDate || ""}"/>
                                <label id="revision-date-error" class="error-label"></label>
                            </div>
                        </div>
   
                        <div>
                            <label class="required" for="txt-engi-disposition" id="lbl-engi-disposition"><span class="required-marker">*</span>&nbsp;Disposition</label>
                            <textarea ${engiReadOnly ? "readonly" : ''} required aria-errormessage="Engineering-disposition-error"  aria-describedby="lbl-engi-disposition" id="txt-engi-disposition">${report?.Disposition || ''}</textarea>
                            <label id="Engineering-disposition-error" class="error-label"></label>
                        </div>
                   </div>
            </div>
    `

    return injectOrReturn(html, targetID)
}


export function PurchasingReport(report, purchaseReadOnly, targetID=null, hidden=false){
    const html = `
    <h2 data-role="sales" id="purchasing-header">Purchasing</h2>

            <div class="purchasing-inputs">
                <div class="purchasing-left-container">

                    <fieldset>
                        <legend><span class="required-marker">*</span>&nbsp;Purchasing's Preliminary Decision</legend>
                        <div id="purchasing-exists" style="display:none;"></div>
                    
                        <div>
                        <input id="rad-purchase-decision-rework" ${purchaseReadOnly? "disabled" : ""} aria-errormessage="purchase-decision-rework-error" type="radio" aria-describedby="lbl-purchase-decision-rework" value="Rework" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Rework"? 'checked' : ''}>
                        <label for="rad-purchase-decision-rework" id="lbl-purchase-decision-rework">Rework "In-House"</label> </div>
                        
                        
                        <div>
                        <input id="rad-purchaseReview-repair" required ${purchaseReadOnly? "disabled" : ""} aria-errormessage="purchaseReview-radio-error" type="radio" aria-describedby="lbl-purchaseReview-repair" value="Repair" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Repair"? 'checked' : ''}>
                        <label for="rad-purchaseReview-repair" id="lbl-purchaseReview-repair">Defer</label> </div>
                        
                        
                        <div>
                        <input id="rad-purchaseReview-rework" required ${purchaseReadOnly? "disabled" : ""} aria-errormessage="purchaseReview-radio-error" type="radio" aria-describedby="lbl-purchaseReview-rework" value="Rework" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Rework"? 'checked' : ''}>
                        <label for="rad-purchaseReview-rework" id="lbl-purchaseReview-rework">Return</label></div>
                      
                        
                        <div>
                        <input id="rad-purchaseReview-scrap" required ${purchaseReadOnly? "disabled" : ""} aria-errormessage="purchaseReview-radio-error" type="radio" aria-describedby="lbl-purchaseReview-scrap" value="Scrap" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Scrap"? 'checked' : ''}>
                        <label for="rad-purchaseReview-scrap" id="lbl-purchaseReview-scrap">Scrap</label> </div>
                        
                        
                        <label id="purchase-decision-error" class="error-label"></label>
                    </fieldset>
                          
                
                </div>
                <div class="purchasing-right-container COL-2">

                     
                        <div class= "chkBox2">
                            <input ${purchaseReadOnly ? "disabled" : ''} name="car-raised" aria-describedby="lbl-car-raised" type="checkbox" id="chk-car-raised" 
                            ${report?.CarRaised ? 'checked' : ''}/>
                            <label id="lbl-car-raised" for="chk-car-raised"><span class="required-marker">*</span>&nbsp;CAR Raised?</label>
                        </div>
                        <div>
                            <label class="required" for="txt-car-num" id="lbl-car-num"><span class="required-marker">*</span>&nbsp;CAR Number</label>
                            <input ${purchaseReadOnly ? "disabled" : ''} aria-errormessage="car-num-error" name="car-num" type="text" aria-describedby="lbl-car-num" id="txt-car-num"
                            value="${report?.CarNum || ""}"/>
                            <label id="car-num-error" class="error-label"></label>
                        </div>
                    
                  
                        <div class= "chkBox2">
                            <input ${purchaseReadOnly ? "disabled" : ''} name="followup-req"  type="checkbox" id="chk-followup-req" 
                            ${report?.followUpRequired ? 'checked' : ''}/>
                            <label id="lbl-follwup-req" for="chk-followup-req"><span class="required-marker">*</span>&nbsp;Followup Required?</label>
                        </div>
                         <div>
                            <fieldset class="no-border">
                                <legend><span class="required-marker">*</span>&nbsp;Followup Type:</legend>
                                <label id="followup-type-error" class="error-label"></label>
                                <select id="cbo-followup-type" name="followup-type" ${purchaseReadOnly ? "disabled" : ''}>
                                    <option ${!report?.followUpType ? "selected" : "" } value="">Select a type</option>
                                    <option ${report?.followUpType === "Phone" ? "selected" : "" } value="Phone">Phone</option>
                                    <option ${report?.followUpType === "InPerson" ? "selected" : "" } value="InPerson">In Person</option>
                                    <option ${report?.followUpType === "Virtual" ? "selected" : "" } value="Virtual">Virtual Meet</option>
                                    <option ${report?.followUpType === "Email" ? "selected" : "" } value="Email">Email</option>
                                    <option ${report?.followUpType === "Fax" ? "selected" : "" } value="Fax">Fax</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="followup-date">
                            <label for="dtp-followup-date"><span class="required-marker">*</span>&nbsp;Followup Date:</label>
                            <input value="${report?.followUpDate || ""}" ${purchaseReadOnly ? "disabled" : ''} name="followup-date"  type="text" id="dtp-followup-date" placeholder="Select followup date">
                            <label id="followup-date-error" class="error-label"></label>
                        </div>
                   

                        <div>
                            <label for="txt-operation-manager" id="lbl-operation-manager"><span class="required-marker">*</span>&nbsp;Operation Manager</label>
                            <input readonly name="operation-manager" type="text" aria-describedby="lbl-operation-manager" id="txt-operation-manager"
                            value="${report?.operationManager || app.employee.username}"/>
                        </div>

                        <div>
                            <label for="dtp-purchase-date"><span class="required-marker">*</span>&nbsp;Purchase Date:</label>
                            <input value="${report?.purchaseDate || ""}" ${purchaseReadOnly ? "disabled" : ''} name="purchase-date"   type="text" id="dtp-purchase-date" placeholder="Select purchase date">
                            <label id="purchase-date-error" class="error-label"></label>
                        </div>
                   
                </div>
     
            </div>`

    return injectOrReturn(html, targetID)
}