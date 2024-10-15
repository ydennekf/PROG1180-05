import {ReportStatus, getReport} from "../../Data/new_reportData.js";

export function getReportFormData(){
    return {
        itemName:document.getElementById('txt-item-name'),
        ncrNumber: document.getElementById("txt-ncr-number"),
        title : document.getElementById("txt-ncr-title"),
        supplier : document.getElementById("txt-supplier"),
        prodNumber : document.getElementById("txt-prod-number"),
        salesNumber : document.getElementById('txt-sales-number'),
        quantityReceived : document.getElementById("txt-quantity-received"),
        quantityDefective : document.getElementById("txt-quantity-defective"),
        itemDescription : document.getElementById('txt-item-description'),
        defectDescription : document.getElementById('txt-item-defect'),
        supplierOrRec : document.getElementById("chk-supplier-or-rec"),
        nonConforming : document.getElementById('chk-non-conforming'),
        productionOrder:  document.getElementById("chk-production-order"),
        sapNumber: document.getElementById('txt-sap-number'),
        engineeringRequired:document.getElementById('chk-engineering-required')
    }

}



export function createQAReport(employee){
    // DOESN'T VALIDATE USE THE VALIDATORS BEFORE CREATING THE REPORT
    const formData = getReportFormData()
    return {
        ncrNumber: parseInt(formData.ncrNumber.value),
        title:formData.title.value,
        supplierName:formData.supplier.value,
        prodNumber:parseInt(formData.prodNumber.value),
        defectDescription:formData.itemDescription.value,
        salesNumber:parseInt(formData.salesNumber.value),
        qtyReceived:parseInt(formData.quantityReceived.value),
        qtyDefective:parseInt(formData.quantityDefective.value),
        itemDescription: formData.itemDescription.value,
        nonConforming:formData.nonConforming.checked,
        productionOrder:formData.productionOrder.checked,
        supplierOrRec:formData.supplierOrRec.checked,
        startedBy:employee.username,
        status:formData.engineeringRequired.checked ? ReportStatus.AwaitingEngineering : ReportStatus.Closed, // defualts to closed cuz we aren't at the next stage
        date:new Date(Date.now()).toDateString(),
        itemName:formData.itemName.value,
        sapNumber:formData.sapNumber.value
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


export function validateQualityAssuranceForm(updating=false){
    const data = getReportFormData();
    const errors = errorLog()
    const validNcr = parseInt(data.ncrNumber.value);


    validateNcrNumber(validNcr, errors, updating)

    validateNumberInputs(errors)

    if(data.title.value === ""){
        data.title.ariaInvalid = true;
    }

    if(data.itemName.value === ""){
        data.itemName.ariaInvalid = true;
    }

    if(data.supplier.value === ""){
        data.ncrNumber.ariaInvalid = true;
    }

  
    if(data.defectDescription.value === ""){
        data.defectDescription.ariaInvalid = true;
    }

    if(data.itemDescription.value === ""){
        data.itemDescription.ariaInvalid = true;
    }


    
    return errors

}



function validateNcrNumber(ncrNumber, errorList, updating=false){
    const validNumber = parseInt(ncrNumber)
    const e = 'ncr-number-error'
    if(isNaN(validNumber)){
        errorList.push('txt-ncr-number',e,  "A non numeric value was submitted.")
        return;
    }
    if(validNumber < 0){
        errorList.push('txt-ncr-number', e,  "Please submit a positive number.")
        return;
    }
    const number = getReport(parseInt(ncrNumber))
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

    if(isNaN(data.sapNumber.value) || data.sapNumber.value <= 0) {
        data.sapNumber.ariaInvalid = true;
        errorList.push('txt-sap-number', 'sap-number-error', "Please submit a positive number.")
    }

    if(isNaN(validQuantityDef) || validQuantityDef <= 0){
        data.quantityDefective.ariaInvalid = true;
        errorList.push('txt-quantity-defective', 'quantity-defective-error', "Please submit a positive number.")
    }

    if(isNaN(validProdNum) || validProdNum <= 0){
        data.prodNumber.ariaInvalid = true;
        errorList.push('txt-prod-number', 'prod-number-error', "Please submit a positive number.")
    }
}





/* TODOS
    error-message aria attributes to element
    add invalid aria to the element 
    insert a new label under the element (APPEND ig)
*/