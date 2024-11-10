import {ReportStatus, getReport, reportData} from "../../Data/new_reportData.js";

export function getReportFormData(){

    let engiRadBtns = document.querySelectorAll('input[name ="rad-engiReview"]');
    let engiReviewValue;
    for(let choice of engiRadBtns){
        if(choice.checked){
            engiReviewValue = choice.value;
            break;
        }
    }

    return {
        itemName:document.getElementById('txt-item-name'),
        ncrNumber: document.getElementById("txt-ncr-number"),
        //title : document.getElementById("txt-ncr-title"),
        supplier : document.getElementById("txt-supplier"),
        prodNumber : document.getElementById("txt-prod-number"),
        salesNumber : document.getElementById('txt-sales-number'),
        quantityReceived : document.getElementById("txt-quantity-received"),
        quantityDefective : document.getElementById("txt-quantity-defective"),
        //itemDescription : document.getElementById('txt-item-description'),
        defectDescription : document.getElementById('txt-item-defect'),
        supplierOrRec : document.getElementById("chk-supplier-or-rec"),
        nonConforming : document.getElementById('chk-non-conforming'),
        productionOrder:  document.getElementById("chk-production-order"),
        sapNumber: document.getElementById('txt-sap-number'),
        engineeringRequired:document.getElementById('chk-engineering-required'),
        customerNotification: document.getElementById('chk-customer-notification'),
        drawingToUpdate: document.getElementById('chk-drawing-to-update'),
        engineeringReview: engiReviewValue,
        origRevNum: document.getElementById('txt-orig-rev-number'),
        nameOfEngineer: document.getElementById('txt-name-engineer'),
        updatedRev: document.getElementById('txt-updated-rev'),
        RevisionDate: document.getElementById('txt-revision-date'),
        Disposition: document.getElementById('txt-engi-disposition'),
        purchaseDecision: null,
        CarRaised: null,
        CarNum: null,
        FollowReq: false,
        followUpType: null,
        followUpDate: null,
        operationManager: null,
        purchaseDate: null

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
    return {
        ncrNumber: formData.ncrNumber.value,
        //title:formData.title.value,
        supplierName:formData.supplier.value,
        prodNumber:parseInt(formData.prodNumber.value),
        defectDescription:formData.defectDescription.value,
        salesNumber:parseInt(formData.salesNumber.value),
        qtyReceived:parseInt(formData.quantityReceived.value),
        qtyDefective:parseInt(formData.quantityDefective.value),
        //itemDescription: formData.itemDescription.value,
        nonConforming:formData.nonConforming.checked,
        productionOrder:formData.productionOrder.checked,
        supplierOrRec:formData.supplierOrRec.checked,
        startedBy:employee.username,
        status:formData.engineeringRequired.checked ? ReportStatus.AwaitingEngineering : ReportStatus.Closed, // defualts to closed cuz we aren't at the next stage
        date:new Date(Date.now()).toDateString(),
        itemName:formData.itemName.value,
        sapNumber:formData.sapNumber.value,
        engineeringRequired:false,
        customerNotification:false,
        drawingToUpdate: false,
        engineeringReview: null,
        origRevNum: "",
        nameOfEngineer:"",
        updatedRev: "",
        RevisionDate:"",
        Disposition:"",
        purchaseDecision: null,
        CarRaised: null,
        CarNum: null,
        FollowReq: false,
        followUpType: null,
        followUpDate: null,
        operationManager: null,
        purchaseDate: null
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
                document.getElementById(error.targetID).ariaInvalid = true;
                document.getElementById(error.errorTarget).innerText = error.msg;
            });
        }
    }
}


export function validateForm(){
    const data = getReportFormData();
    const errors = errorLog()
    const validNcr = parseInt(data.ncrNumber.value);


    //validateNcrNumber(validNcr, errors, updating, report)

    validateNumberInputs(errors)

    if(data.itemName.value === ""){
        data.itemName.ariaInvalid = true;
        errors.push('txt-item-name',"item-name-error", "Please submit the name of the supplier")
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

function validateNumberInputs(errorList){
    const data = getReportFormData()
    const validQuantityRec = parseInt(data.quantityReceived.value)
    const validQuantityDef = parseInt(data.quantityDefective.value)
    const validProdNum = parseInt(data.prodNumber.value)
    const validSalesNumber = parseInt(data.salesNumber.value)

    
    if(isNaN(validSalesNumber) || validSalesNumber <0){
        data.salesNumber.ariaInvalid = true;
        errorList.push('txt-sales-number', 'sales-number-error', "Please submit a positive number.")
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

    if(isNaN(validProdNum) || validProdNum < 0){
        data.prodNumber.ariaInvalid = true;
        errorList.push('txt-prod-number', 'prod-number-error', "Please submit a positive number.")
    }

    if(validQuantityDef > validQuantityRec){
        data.quantityDefective.ariaInvalid = true;
        errorList.push('txt-quantity-defective', 'quantity-defective-error', "The defective amount cannot be greater than the received amount.")
    }
}



