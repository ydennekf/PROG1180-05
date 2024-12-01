import {ReportStatus, getReport, reportData} from "../../Data/new_reportData.js";
import { tryGetElementById } from "../utils/utils.js";
import { app } from "../../AppState.js";
function getEngReviewRAD(){
    const asIs = tryGetElementById('rad-use-as-is')
    const repair = tryGetElementById('rad-repair')
    const rework = tryGetElementById('rad-rework')
    const scrap = tryGetElementById('rad-scrap')


    if(asIs.checked){
        console.log('use')
        return "useAsIs"
    }
    if(repair.checked){
        console.log('rep')
        return "Repair"
    }
    if(rework.checked){
        console.log('rew')
        return 'Rework'
    }
    if(scrap.checked){
        console.log('scrap')
        return 'Scrap'
    }
    console.log('getting passed ')

}

export function getReportFormData(){

  
    let engiReviewValue = getEngReviewRAD()
    // for(let choice of engiRadBtns){
    //     if(choice.checked){
    //         engiReviewValue = choice.value;
    //         break;
    //     }
    // }

    return { 
        itemName:tryGetElementById('txt-item-name'),
        ncrNumber: tryGetElementById("txt-ncr-number"),
        //title : tryGetElementById("txt-ncr-title"),
        supplier : tryGetElementById("txt-supplier"),
        prodNumber : tryGetElementById("txt-prod-number"),
        salesNumber : tryGetElementById('txt-sales-number'),
        quantityReceived : tryGetElementById("txt-quantity-received"),
        quantityDefective : tryGetElementById("txt-quantity-defective"),
        //itemDescription : tryGetElementById('txt-item-description'),
        defectDescription : tryGetElementById('txt-item-defect'),
        supplierOrRec : tryGetElementById("rad-supplier-or-rec"),
        nonConforming : tryGetElementById('chk-non-conforming'),
        //productionOrder:  tryGetElementById("chk-production-order"),
        wip :tryGetElementById('rad-wip'),
        sapNumber: tryGetElementById('txt-sap-number'),
        engineeringRequired:tryGetElementById('chk-engineering-required'),
        customerNotification: tryGetElementById('chk-customer-notification'),
        drawingToUpdate: tryGetElementById('chk-drawing-to-update'),
        engineeringReview: engiReviewValue,
        origRevNum: tryGetElementById('txt-orig-rev-number'),
        nameOfEngineer: tryGetElementById('txt-name-engineer'),
        updatedRev: tryGetElementById('txt-updated-rev'),
        RevisionDate: tryGetElementById('txt-revision-date'),
        Disposition: tryGetElementById('txt-engi-disposition'),
        purchaseDecision: null,
        CarRaised: null,
        CarNum: null,
        FollowReq: false,
        followUpType: tryGetElementById(''),
        followUpDate: tryGetElementById('dtp-followup-date'),
        operationManager: null,
        purchaseDate: null

    }

}



export function getQAFormData(){
    return {
        itemName:tryGetElementById('txt-item-name'),
        ncrNumber: tryGetElementById("txt-ncr-number"),
        //title : tryGetElementById("txt-ncr-title"),
        supplier : tryGetElementById("txt-supplier"),
        prodNumber : tryGetElementById("txt-prod-number"),
        salesNumber : tryGetElementById('txt-sales-number'),
        quantityReceived : tryGetElementById("txt-quantity-received"),
        quantityDefective : tryGetElementById("txt-quantity-defective"),
        //itemDescription : tryGetElementById('txt-item-description'),
        defectDescription : tryGetElementById('txt-item-defect'),
        supplierOrRec : tryGetElementById("rad-supplier-or-rec"),
        nonConforming : tryGetElementById('chk-non-conforming'),
        //productionOrder:  tryGetElementById("chk-production-order"),
        wip :tryGetElementById('rad-wip'),
        sapNumber: tryGetElementById('txt-sap-number'),
        engineeringRequired:tryGetElementById('chk-engineering-required'),
    }
}


export function getEngFormData(){
    
    let engiReviewValue = getEngReviewRAD()

    return {
        customerNotification: tryGetElementById('chk-customer-notification'),
        drawingToUpdate: tryGetElementById('chk-drawing-to-update'),
        engineeringReview: engiReviewValue,
        origRevNum: tryGetElementById('txt-orig-rev-number'),
        nameOfEngineer: tryGetElementById('txt-name-engineer'),
        updatedRev: tryGetElementById('txt-updated-rev'),
        RevisionDate: tryGetElementById('txt-revision-date'),
        Disposition: tryGetElementById('txt-engi-disposition'),
    }
}

export function getPurchasingFormData(){
    let followUpType = document.getElementById('cbo-followup-type')

    console.log(followUpType)

    const inHouse = tryGetElementById('rad-purchase-decision-rework')
    const repair = tryGetElementById('rad-purchaseReview-repair')
    const rework = tryGetElementById('rad-purchaseReview-rework')
    const scrap = tryGetElementById('rad-purchaseReview-scrap')
    let decision;


    if(inHouse.checked){
        console.log('use')
        decision="Rework In-House"
    }
    if(repair.checked){
        console.log('rep')
        decision= "Repair"
    }
    if(rework.checked){
        console.log('rew')
        decision='Rework'
    }
    if(scrap.checked){
        console.log('scrap')
        decision='Scrap'
    }
    console.log('getting passed ')
    return {
        purchaseDecision: decision,
        CarRaised: document.getElementById('chk-car-raised'),
        CarNum: document.getElementById('txt-car-num'),
        followUpRequired: document.getElementById('chk-followup-req'),
        followUpType: followUpType,
        followUpDate: tryGetElementById('dtp-followup-date'),
        operationManager: app.employee.username,
        purchaseDate: tryGetElementById('dtp-purchase-date')
    }
}



export function generateNcrNumber(){
    const num = reportData.length +1
    let s = ""
    if(num < 10){
        s += `00${num}`
    } else if(num < 100 && num > 10){
        s+=`0${num}`
    }else{
        s+=`${num}`
    }
    return new Date().getFullYear() + "-" + s;
}



export function createReport(employee){
    // DOESN'T VALIDATE USE THE VALIDATORS BEFORE CREATING THE REPORT
    const formData = getReportFormData()
    console.log(formData.engineeringRequired.checked + "OWOWOWOWWO")
  
    return {
        ncrNumber: formData.ncrNumber.value,
        //title:formData.title.value,
        supplierName:formData.supplier.value,
        prodNumber:formData.prodNumber.value,
        defectDescription:formData.defectDescription.value,
        salesNumber:formData.salesNumber.value,
        qtyReceived:parseInt(formData.quantityReceived.value),
        qtyDefective:parseInt(formData.quantityDefective.value),
        //itemDescription: formData.itemDescription.value,
        nonConforming:formData.nonConforming.checked,
        supplierOrRec:formData.supplierOrRec.checked,
        startedBy:employee.username,
        status:formData.engineeringRequired.checked ? ReportStatus.engineering : ReportStatus.purchasing, // defualts to closed cuz we aren't at the next stage
        date:new Date(Date.now()).toDateString(),
        itemName:formData.itemName.value,
        sapNumber:formData.sapNumber.value,
        engineeringRequired:formData.engineeringRequired.checked,
        customerNotification:formData.customerNotification.checked,
        drawingToUpdate: formData.drawingToUpdate.checked,
        engineeringReview: formData.engineeringReview,
        origRevNum: formData.origRevNum.value,
        nameOfEngineer:formData.nameOfEngineer.value || "",
        updatedRev: formData.updatedRev.value || "",
        RevisionDate:formData.RevisionDate.value || "",
        Disposition:formData.Disposition.value,
        purchaseDecision: formData.purchaseDecision?.options[formData.purchaseDecision.selectedIndex],
        CarRaised: formData.CarRaised?.checked,
        CarNum: null,
        FollowReq: false,
        followUpType: null,
        followUpDate: null,
        operationManager: null,
        purchaseDate: null,
        imageStorage:[]
    }
}


export function errorLog(){
    const errors = []

    return {
        push:(targetID, errorTarget, msg)=>{
            errors.push({targetID, errorTarget, msg})
        },
        get:() => errors,
        expose:() => {
            errors.forEach(error => {
                tryGetElementById(error.targetID).ariaInvalid = true;
                tryGetElementById(error.errorTarget).innerText = error.msg;
            });
        }
    }
}


export function validateForm(){
    const data = getReportFormData();
    const errors = errorLog()
    const validNcr = parseInt(data.ncrNumber.value);


    //validateNcrNumber(validNcr, errors, updating, report)

    validateQANumberInputs(errors, data)
    validateQAStringInputs(errors, data)
    validateEngiInputs(errors, data)
    //validatePurchasingInputs(errors, data)

    console.log(errors.get())
    return errors;

}



function validateNcrNumber(ncrNumber, errorList, updating=false, report=undefined){
    const validNumber = ncrNumber
    const e = 'ncr-number-error'
    if(updating){
        if(report){
            console.log(report)
            if(ncrNumber !== report.ncrNumber && getReport(ncrNumber) !== undefined){
                
                errorList.push('txt-ncr-number',e, "There is already a report with the NCR Number provided")
                return;
            }
        }
    }
    if(isNaN(validNumber)){
        errorList.push('txt-ncr-number',e,  "A non numeric value was submitted.")
        return;
    }
    if(validNumber < 0){
        errorList.push('txt-ncr-number', e,  "Please submit a positive number.")
        return;
    }
    const number = getReport(ncrNumber)
    console.log(number, updating)
    if(number && !updating){
        errorList.push('txt-ncr-number',e, "There is already a report with the NCR Number provided")
        return;
    }

}

export function validateQANumberInputs(errorList, data){

    const validQuantityRec = parseInt(data.quantityReceived.value)
    const validQuantityDef = parseInt(data.quantityDefective.value)
    const validProdNum = data.prodNumber.value
    const validSalesNumber = data.salesNumber.value

    
    if(validSalesNumber === "" || validSalesNumber === " "){
        data.salesNumber.ariaInvalid = true;
        errorList.push('txt-sales-number', 'sales-number-error', "Please submit a valid sales number.")
    }


    if(isNaN(validQuantityRec) || validQuantityRec <= 0){
        data.quantityReceived.ariaInvalid = true;
        errorList.push('txt-quantity-received', 'quantity-received-error', "Please submit a positive number.")
    }

    if(isNaN(data.sapNumber.value) || data.sapNumber.value < 0) {
        data.sapNumber.ariaInvalid = true;
        errorList.push('txt-sap-number', 'sap-number-error', "Please submit a positive number.")
    }

    if(isNaN(validQuantityDef) || validQuantityDef <= 0){
        data.quantityDefective.ariaInvalid = true;
        errorList.push('txt-quantity-defective', 'quantity-defective-error', "Please submit a positive number.")
    }

    if(validProdNum === "" || validProdNum === " "){
        data.prodNumber.ariaInvalid = true;
        errorList.push('txt-prod-number', 'prod-number-error', "Please submit a prod number.")
    }

    if(validQuantityDef > validQuantityRec){
        data.quantityDefective.ariaInvalid = true;
        errorList.push('txt-quantity-defective', 'quantity-defective-error', "The defective amount cannot be greater than the received amount.")
    }
}

export function validateQAStringInputs(errors, data){
      if(data.itemName.value === ""){
        data.itemName.ariaInvalid = true;
        errors.push('txt-item-name',"item-name-error", "Please submit the name of the item")
    }

    if(data.supplier.value === ""){
        data.ncrNumber.ariaInvalid = true;
        errors.push('txt-supplier',"supplier-error", "Please submit the name of the supplier")
    }


    if(data.defectDescription.value === ""){
        data.defectDescription.ariaInvalid = true;
        errors.push('txt-item-defect',"item-defect-error", "Please submit a description of the problem")
    }
    return errors
}

export function validateEngiInputs(errors){

    const data = getEngFormData()
    const numericUpdatedRev = parseInt(data.updatedRev.value)
    const numericRev = parseInt(data.origRevNum.value)
    if(data.drawingToUpdate.checked){
        // validate drawing data if drawingToUpdate is true
        if(data.nameOfEngineer.value === ""){
        data.nameOfEngineer.ariaInvalid = true;
        errors.push('txt-name-engineer',"name-engineer-error", "Please submit the name of the Engineer")
        }
        console.log('Updated rev ' + numericUpdatedRev)
        if(data.updatedRev.value === "" || isNaN(numericUpdatedRev)){
            data.updatedRev.ariaInvalid = true;
            errors.push('txt-updated-rev',"updated-rev-error", "Please submit the updated revision number")
        }
    }

    if(data.Disposition.value === ""){
        data.Disposition.ariaInvalid = true;
        errors.push('txt-engi-disposition', 'Engineering-disposition-error', "Please submit the Disposition")
    }


    if(!data.engineeringReview){
        errors.push("engineering-review-radio-error", "engineering-review-radio-error", "Please select an Review value")
    }

    console.log(data.RevisionDate.value + "wowo")
    if(!data.RevisionDate.value){
        
        errors.push("txt-revision-date", "revision-date-error", "Please submit a revision date")
    }

    if(data.RevisionDate.value < Date.now()){
        errors.push("txt-revision-date", "revision-date-error", "Please submit a date equal to or after today.")
    }

    
}

export function validatePurchasingInputs(errors){
  //check if followup req
  const data = getPurchasingFormData()
   const validCarNum =  parseInt(data.CarNum.value)

    if(data.CarRaised.checked){
        if( isNaN(validCarNum)|| validCarNum < 0){
            data.CarNum.ariaInvalid = true;
            errors.push('txt-car-num', 'car-num-error', "please provide a valid car number.")
        }
    }
    if(data.followUpRequired.checked){
        const cboFollowType = tryGetElementById("cbo-followup-type");
        if(data.followUpType.selectedIndex === 0){
            data.followUpType.ariaInvalid = true;
            errors.push('cbo-followup-type', 'followup-type-error', "please select a follow up type.")
        }
        if(data.followUpDate.value < Date.now() || data.followUpDate === ''){
        data.followUpDate.ariaInvalid = true;
        errors.push('dtp-followup-date', 'followup-date-error', 'please provide a followup date in the future.')
    }
    }
    if(data.purchaseDate.value < Date.now() || data.purchaseDate === ''){
        data.purchaseDate.ariaInvalid = true;
        errors.push('dtp-purchase-date', 'purchase-date-error', 'please provide a purchase date in the future.')
    }

    
    //validate followup date
    //validate value selected from follow up type
  //check if car raised
    //validate car num

    //validate purchaseDate
    // autofill operation manager
}




