import { getEngFormData, getPurchasingFormData, getQAFormData, validateEngiInputs, validatePurchasingInputs } from "./utils.js";
import { append } from "../utils/utils.js";
import { EngineeringReport, PurchasingReport } from "./Reports.js";
import { validateQANumberInputs } from "./utils.js";
import { validateQAStringInputs } from "./utils.js";
import { ReportStatus } from "../../Data/new_reportData.js";

import { app } from "../../AppState.js";
import { reportData, updateReport } from "../../Data/new_reportData.js";
import { RedirectWithSuccessModal } from "./successModal.js";
import { addImagesToReport, clearImageStorage } from "./ReportView.js";





/* TODOS
 TODO admin add form portion buttons
 TODO finalize purchasing validation
 TODO dummy buttons for filling each portions data
*/











export function createQAReport(){
    const formData = getQAFormData()
    const newReport ={
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
        startedBy:app.employee.username,
        status:formData.engineeringRequired.checked ? ReportStatus.engineering : "closed" ,// defualts to closed cuz we aren't at the next stage
        date:new Date(Date.now()).toDateString(),
        itemName:formData.itemName.value,
        sapNumber:formData.sapNumber.value,
        engineeringRequired:formData.engineeringRequired.checked,
        imageStorage:[]
    }

    addImagesToReport(newReport)
    clearImageStorage()
    // TODO whenever fraser does his notification stuff need to add it here
    reportData.push(newReport)
    app.storage.pushNewReport(newReport.ncrNumber, newReport.status);
    
    //updateReport(newReport.ncrNumber, newReport);
    app.storage.pushRecentReport(newReport.ncrNumber)

    return newReport;
}


export function addEngReportData(report, ){
    const newReport = {...report}
    const eData = getEngFormData()
    newReport.Disposition = eData.Disposition.value
    newReport.engineeringReview = eData.engineeringReview
    newReport.nameOfEngineer = app.employee.firstName + " " + app.employee.lastName
    newReport.origRevNum = eData.origRevNum.value
    newReport.updatedRev = eData.updatedRev.value
    newReport.RevisionDate = eData.RevisionDate.value
    newReport.drawingToUpdate = eData.drawingToUpdate.checked
    newReport.customerNotification = eData.customerNotification.checked
    newReport.status = "purchasing"
    newReport.engDate = new Date(Date.now()).toDateString(),
    addImagesToReport(newReport)
    clearImageStorage()

    updateReport(newReport.ncrNumber, newReport)

    app.storage.pushNewReport(newReport.ncrNumber, newReport.status);
    app.storage.pushRecentReport(newReport.ncrNumber)

    return newReport;
}


export function addPurchasingReportData(report){
    const pData = getPurchasingFormData()
    console.log("Purchasing adding")
    const newReport = {...report}
    newReport.purchaseDecision = pData.purchaseDecision
    newReport.CarRaised = pData.CarRaised.checked
    newReport.CarNum = pData.CarNum.value
    newReport.operationManager = app.employee.firstName +  " " + app.employee.lastName
    newReport.followUpType = pData.followUpType.options[pData.followUpType.selectedIndex].value
    newReport.followUpRequired = pData.followUpRequired.checked
    newReport.purchaseDate = pData.purchaseDate.value
    newReport.status = "closed"
    newReport.followUpDate = pData.followUpDate.value
    newReport.purDate =new Date(Date.now()).toDateString()
    addImagesToReport(newReport)
    clearImageStorage()

    updateReport(newReport.ncrNumber, newReport)
    app.storage.pushNewReport(newReport.ncrNumber, newReport.status);
    //updateReport(newReport.ncrNumber, newReport);
    app.storage.pushRecentReport(newReport.ncrNumber)

    return newReport
}




export function validateAdmin(errors, action, report=null){

    // check each portion of the form for data
    // based on the ones with data validate tht portion
    // THIS IS GOING TO BE FUCKING DISGUSTING CODE BRACE YOURSELF IF YOU READ IT :D
    const engineeringNeedsValidtion = document.getElementById('engineering-header')
    const purchasingNeedsValidation = document.getElementById('purchasing-header')
    if(action === "Create"){
        validateQANumberInputs(errors, getQAFormData())
        validateQAStringInputs(errors, getQAFormData())
        if(errors.get().length === 0){
            report = createQAReport()
            if(engineeringNeedsValidtion.style.display !== "none"){
                validateEngiInputs(errors)
                report = addEngReportData(report)
            }
            if(purchasingNeedsValidation.style.display !== 'none' && engineeringNeedsValidtion.style.display !== 'none'){
                validatePurchasingInputs(errors) // requires the admin to do the engineering portion first
                report = addPurchasingReportData(report)
            }

            RedirectWithSuccessModal(action, report)
        }else{
            errors.expose()
        }
        return;
    }


    validateQANumberInputs(errors, getQAFormData())
    validateQAStringInputs(errors, getQAFormData())

   if(engineeringNeedsValidtion.style.display!=="none"){
    
    validateEngiInputs(errors, getEngFormData())
    
   }

   if(purchasingNeedsValidation.style.display!=="none"){
    validatePurchasingInputs(   errors, )
    
   }

   if(errors.get().length === 0){
    const newReport = {...report}
    console.log("Working")
    if(engineeringNeedsValidtion.style.display!=="none"){
        addEngReportData(newReport)
        
    }
    if(purchasingNeedsValidation.style.display!=="none"){
        console.log("Working Here")
        addPurchasingReportData(newReport)
        
    }
    RedirectWithSuccessModal(action, newReport)
    
    app.storage.pushRecentReport(newReport.ncrNumber)
   }else{
    errors.expose()
   }

}




export function checkPurchasingInProgress(){
    const purchasingNeedsValidation = document.getElementById('purchasing-exists')
    if(purchasingNeedsValidation){
        return true;
    }
    return false;
}

export function checkEngineeringInProgress(){
    const engineeringNeedsValidtion = document.getElementById('engineering-exists')
    if(engineeringNeedsValidtion){
        return true;
    }
    return false;
}


export function addEngButton(){
    return '<button id="bind-eng-start">Start Engineering</button>'
}

export function addPurchasingButton(){
    return '<button id="bind-pur-start">Start Purchasing</button>'
}



export function bindAdditionButtons(){
    try{
        document.getElementById('bind-eng-start').addEventListener('click', (e) => {
            e.preventDefault()
            const p = document.getElementById('engineering-header')
            

            if(p.style.display === "none"){
                p.style.display = "block"
                 e.target.innerHTML = "Remove Engineering"
            }else{
                p.style.display="none"
                e.target.innerHTML = "Add Engineering"
            }
        })
        document.getElementById('bind-pur-start').addEventListener('click', (e) => {
            e.preventDefault()
            // TODO mke sure engineering portion exists 
            const p = document.getElementById('purchasing-header')
            if(p.style.display === "none"){
                p.style.display = "block"
                 e.target.innerHtml = "Remove Purchasing"
            }else{
                p.style.display="none"
                e.target.innerHtml = "Add Purchasing"
            }
        })
    }
    catch {

    }
}


export function shouldRevealPurchasing(action, report=null){
   let purchasing = document.getElementById("purchasing-header")

   if(action ==="View" || 
        ((["admin", "purchasing"].includes(app.employee.department)) && report?.status === "purchasing")){
        return;
   }
   if(report?.status === "closed" || report?.status === "Closed"){
        return;
    }


    //if(app.employee.department !== "purchasing" && ["Edit", "Create"].includes(action)){
      //  console.log("wow")
        purchasing.style.display = "none"
    //}
        
    

}

export function shouldRevealEngineering(action, report=null){

    let purchasing = document.getElementById("engineering-header")
    console.log(purchasing)
     if(action ==="View"  || ((["admin", "purchasing", "engineering"].includes(app.employee.department)) && (report?.status === "engineering" ||  report?.status === "purchasing"))){
         // should be shown do nothing
         return;
     }

     if(report?.status === "closed" || report?.status === "Closed"){
        return;
    }



     
 
     //if((app.employee.department !== "engineering" && app.employee.department !== "purchasing") && ["Edit", "Create"].includes(action)){
         purchasing.style.display = "none"
     //}
         
    //document.getElementById("ui-id-3").style.display = "none"
    // if(action === "View"){
    //     return EngineeringReport(report, true, null, false)
    // }

    // if(app.employee.department === "engineering"){
    //     return EngineeringReport(report, readonly , null, false)
    // }

    // return EngineeringReport(report, readonly, null, true)
}

/*             ${action === "View" || [ "purchasing"].includes(app.employee.department) ? `${PurchasingReport(report, purchaseReadOnly, null, 
                (action ==="Create" && app.employee.department === "admin") || report.status !== "purchasing")}` : `<div id="purchasing-container"></div>`} */




                /*
                    ${action === "View" || [ "purchasing", "engineering"].includes(app.employee.department) ? `${EngineeringReport(report, engiReadOnly)}` : ``}
            
            ${action === "View" || [ "purchasing"].includes(app.employee.department) ? `${PurchasingReport(report, purchaseReadOnly, null)}` : ``} 
                */