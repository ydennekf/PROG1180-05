import { injectOrReturn } from "../utils/utils.js"

export function EngineeringReport(report, engiReadOnly, targetID = null){
    const html = `
    <h2 data-role="engineering">Engineering</h2>
        
            <div class="engineering-inputs">
                <div class="engi-top-container">
                    
                <fieldset>
                    <legend><span class="required-marker">*</span> Review by CF Engineering</legend>

                        
                    <ul class= "col-2">
                    
                        <li>
                            <input ${engiReadOnly? "readonly" : ""} id="rad-use-as-is" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-use-as-is" value="useAsIs" name="rad-engiReview"
                            ${report?.engineeringReview === "useAsIs"? 'checked' : ''}>
                            <label for="rad-use-as-is" id="lbl-use-as-is">Use as is</label>
                            <label class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "readonly" : ""} id="rad-repair" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-repair" value="Repair" name="rad-engiReview"
                            ${report?.engineeringReview === "Repair"? 'checked' : ''}>
                            <label for="rad-repair" id="lbl-repair">Repair</label>
                            <label  class="error-label"></label>
                        </li>
                        <li>
                            <input required ${engiReadOnly? "readonly" : ""} id="rad-rework" aria-errormessage="engineering-review-radio-error" type="radio" aria-describedby="lbl-rework" value="Rework" name="rad-engiReview"
                            ${report?.engineeringReview === "Rework"? 'checked' : ''}>
                             <label for="rad-rework" id="lbl-rework">Rework</label>
                            <label  class="error-label"></label>
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
                                <input readonly aria-errormessage="name-engineer-error" name="name-engineer" type="text" aria-describedby="lbl-name-engineer" id="txt-name-engineer"
                                value="${report?.nameOfEngineer || ""}"/>
                                <label id="name-engineer-error" class="error-label"></label>
                            </div>
                        
                        </div>
                        <div class="col-2">
                            <div>
                                <label class="required" for="txt-updated-rev" id="lbl-updated-rev">Updated Rev. Number </label>
                                <input ${engiReadOnly ? "readonly" : ''} aria-errormessage="updated-rev-error" name="updated-rev" type="number" aria-describedby="lbl-updated-rev" id="txt-updated-rev"
                                value=${report?.updatedRev || ""}/>
                                <label id="updated-rev-error" class="error-label"></label>
                            </div>
                            <div>
                                <label class="required" for="txt-revision-date" id="lbl-revision-date">Revision Date</label>
                                <input ${engiReadOnly ? "readonly" : ''} aria-errormessage="revision-date-error" name="revision-date" type="text" aria-describedby="lbl-revision-date" id="txt-revision-date"
                                value="${report?.RevisionDate || ""}"/>
                                <label id="sap-number-error" class="error-label"></label>
                            </div>
                        </div>
   
                        <div>
                            <label class="required" for="txt-engi-disposition" id="lbl-engi-disposition"><span class="required-marker">*</span> Disposition</label>
                            <textarea ${engiReadOnly ? "readonly" : ''} required aria-errormessage="Engineering-disposition-error"  aria-describedby="lbl-engi-disposition" id="txt-engi-disposition">${report?.Disposition || ''}</textarea>
                            <label id="Engineering-disposition-error" class="error-label"></label>
                        </div>
                   </div>
            </div>
    `

    return injectOrReturn(html, targetID)
}


export function PurchasingReport(report, purchaseReadOnly, targetID=null){
    const html = `
    <h2 data-role="sales">Purchasing</h2>
        
            <div class="purchasing-inputs">
                <div class="purchasing-left-container">

                    <fieldset>
                        <legend>Purchasing's Preliminary Decision</legend>
                    
                    
                        <input ${purchaseReadOnly? "readonly" : ""} aria-errormessage="purchase-decision-rework-error" type="radio" aria-describedby="lbl-purchase-decision-rework" value="Rework" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Rework"? 'checked' : ''}>
                        <label for="rad-purchase-decision-rework" id="lbl-purchase-decision-rework">Rework "In-House"</label>
                        
                        
                        
                        <input required ${purchaseReadOnly? "readonly" : ""} aria-errormessage="purchaseReview-radio-error" type="radio" aria-describedby="lbl-purchaseReview-repair" value="Repair" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Repair"? 'checked' : ''}>
                        <label for="rad-purchaseReview-repair" id="lbl-purchaseReview-repair">Repair</label>
                        
                        
                        
                        <input required ${purchaseReadOnly? "readonly" : ""} aria-errormessage="purchaseReview-radio-error" type="radio" aria-describedby="lbl-purchaseReview-rework" value="Rework" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Rework"? 'checked' : ''}>
                        <label for="rad-purchaseReview-rework" id="lbl-purchaseReview-rework">Rework</label>
                      
                        
                        
                        <input required ${purchaseReadOnly? "readonly" : ""} aria-errormessage="purchaseReview-radio-error" type="radio" aria-describedby="lbl-purchaseReview-scrap" value="Scrap" name="rad-purchaseReview"
                        ${report?.purchaseDecision === "Scrap"? 'checked' : ''}>
                        <label for="rad-purchaseReview-scrap" id="lbl-purchaseReview-scrap">Scrap</label>
                        
                        
                        <label id="purchase-decision-error" class="error-label"></label>
                    </fieldset>
                        <div class="Car-container">
                            <div>
                                <input ${purchaseReadOnly ? "disabled" : ''} name="car-raised" aria-describedby="lbl-car-raised" type="checkbox" id="chk-car-raised" 
                            ${report?.CarRaised ? 'checked' : ''}/>
                            <label id="lbl-car-raised" for="chk-car-raised">Car Raised?</label>
                            </div>
                            <div>
                                <label class="required" for="txt-car-num" id="lbl-car-num">Car Number</label>
                                <input readonly aria-errormessage="car-num-error" name="car-num" type="text" aria-describedby="lbl-car-num" id="txt-car-num"
                                value=""
                                <label id="car-num-error" class="error-label"></label>
                            </div>
                    
                        </div>    
                
                </div>
                <div class="purchasing-right-container">
                            <div class="purchase-followup-container">
                                <div>
                                <label id="lbl-follwup-req" for="chk-followup-req">Followup Required?</label>
                                    <input ${purchaseReadOnly ? "disabled" : ''} name="followup-req" aria-describedby="lbl-followup-req" type="checkbox" id="chk-followup-req" 
                                ${report?.FollowReq ? 'checked' : ''}/>
                                
                                </div>
                                <div class="purchasing-followup-inputs" id="followup-inputs">
                                    <div>
                                        <label for="dtp-followup-date">Followup Date:</label>
                                        <input ${purchaseReadOnly ? "disabled" : ''} name="followup-date"  aria-describedby="lbl-followup-date" type="text" id="dtp-followup-date" placeholder="Select followup date">
                                        <label id="followup-date-error" class="error-label"></label>
                                    </div>
                                    <div>
                                        <label for="followup-type">Followup Type:</label>
                                        <label id="followup-type-error" class="error-label"></label>
                                            <select id="cbo-followup-type" name="followup-type">
                                                <option value="">Select a type</option>
                                                <option value="Phone">Phone</option>
                                                <option value="InPerson">In Person</option>
                                                <option value="Virtual">Virtual Meet</option>
                                                <option value="Email">Email</option>
                                                <option value="Fax">Fax</option>
                                            </select>
                                    </div>
                                </div>
                            </div>
                            <div class="purchase-signoff-container">
                                <div>
                                    <label  for="txt-operation-manager" id="lbl-operation-manager">Operation Manager</label>
                                    <input readonly name="operation-manager" type="text" aria-describedby="lbl-operation-manager" id="txt-operation-manager"
                                    value="${report?.operationManager ? report?.operationManager : 'default operation manager'}"/>
                                </div>
                                
                                <div>
                                    <label for="dtp-purchase-date">Purchase Date:</label>
                                    <input ${purchaseReadOnly ? "disabled" : ''} name="purchase-date"  aria-describedby="lbl-purchase-date" type="text" id="dtp-purchase-date" placeholder="Select purchase date">
                                    <label id="purchase-date-error" class="error-label"></label>
                                </div>
                                                           
                                
                            </div>
                </div>     
            </div>`

    return injectOrReturn(html, targetID)
}