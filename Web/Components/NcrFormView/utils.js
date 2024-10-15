import {getReport, reportData, ReportStatus} from "../../Data/reportData.js";

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
        sapNumber: document.getElementById('txt-sap-number')
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
        status:ReportStatus.AwaitingEngineering,
        date:new Date(Date.now()).toDateString(),
        itemName:formData.itemName.value,
        sapNumber:formData.sapNumber.value
    }
}

// TODO change order when design portion is released so the errors are displayed correctly

export function validateQualityAssuranceForm(){
    // TODO better validators like min char-length
    // TODO before tuesday add labels under the fields that show the error 
    const data = getReportFormData();
    const errors = []
    const validNcr = parseInt(data.ncrNumber.value);
    const validQuantityRec = parseInt(data.quantityReceived.value)
    const validQuantityDef = parseInt(data.quantityDefective.value)
    const validProdNum = parseInt(data.prodNumber.value)
    const validSalesNumber = parseInt(data.salesNumber.value)

    if(data.ncrNumber.value === "" || isNaN(validNcr)){
        data.ncrNumber.ariaInvalid = true;
    }


    if(data.title.value === ""){
        data.title.ariaInvalid = true;
        errors.push('')
    }

    if(data.itemName.value === ""){
        data.itemName.ariaInvalid = true;
        errors.push('')
    }

    if(data.supplier.value === ""){
        data.ncrNumber.ariaInvalid = true;
        errors.push('')
    }

    if(data.salesNumber.value === "" || isNaN(validSalesNumber)){
        data.salesNumber.ariaInvalid = true;
        errors.push('')
    }


    if(data.quantityReceived.value === "" || isNaN(validQuantityRec)){
        data.quantityReceived.ariaInvalid = true;
        errors.push('')
    }

    if(data.sapNumber.value === "" || isNaN(data.sapNumber.value)){
        data.sapNumber.ariaInvalid = true;
        errors.push('')
    }

    if(data.quantityDefective.value === "" || isNaN(validQuantityDef)){
        data.quantityDefective.ariaInvalid = true;
        errors.push('')
    }

    if(data.defectDescription.value === ""){
        data.defectDescription.ariaInvalid = true;
        errors.push('')
    }

    if(data.itemDescription.value === ""){
        data.itemDescription.ariaInvalid = true;
        errors.push('')
    }

    if(data.prodNumber.value === "" || isNaN(validProdNum)){
        data.prodNumber.ariaInvalid = true; 
    
        errors.push('')
    }
    return !errors.length > 0

}


function validateQualityForm(){
    const data = getReportFormData()
    const errors = [] // if anything is pushed to this array the forms invalid

    
}

function validateNcrNumber(ncrNumber, errorList){
    var number = getReport(parseInt(ncrNumber))
    if(number){
        errorList.push({target:'ncr-number-error', msg:"There is already a report with the NCR Number provided"})
    }
}



/* TODOS
    error-message aria attributes to element
    add invalid aria to the element 
    insert a new label under the element (APPEND ig)
*/