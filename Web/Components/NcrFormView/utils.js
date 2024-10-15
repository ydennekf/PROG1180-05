import {ReportStatus} from "../../Data/new_reportData.js";

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
    const validNcr = parseInt(data.ncrNumber.value);
    const validQuantityRec = parseInt(data.quantityReceived.value)
    const validQuantityDef = parseInt(data.quantityDefective.value)
    const validProdNum = parseInt(data.prodNumber.value)
    const validSalesNumber = parseInt(data.salesNumber.value)

    if(data.ncrNumber.value === "" || isNaN(validNcr)){
        data.ncrNumber.focus();
        return false;
    }


    if(data.title.value === ""){
        data.title.focus();
        return false;
    }

    if(data.itemName.value === ""){
        data.itemName.focus()
        return false;
    }

    if(data.supplier.value === ""){
        data.ncrNumber.focus();
        return false
    }

    if(data.salesNumber.value === "" || isNaN(validSalesNumber)){
        data.salesNumber.focus();
        return false;
    }


    if(data.quantityReceived.value === "" || isNaN(validQuantityRec)){
        data.quantityReceived.focus();
        return false;
    }

    if(data.sapNumber.value === "" || isNaN(data.sapNumber.value)){
        data.sapNumber.focus();
        return false;
    }

    if(data.quantityDefective.value === "" || isNaN(validQuantityDef)){
        data.quantityDefective.focus();
        return false;
    }

    if(data.defectDescription.value === ""){
        data.defectDescription.focus();
        return false;
    }

    if(data.itemDescription.value === ""){
        data.itemDescription.focus();
        return false;
    }

    if(data.prodNumber.value === ""){
        data.prodNumber.focus();
        return false;
    }
    return true;

}