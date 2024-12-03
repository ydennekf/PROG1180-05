import { reportData } from "../../Data/new_reportData.js"
import { insert } from "../utils/utils.js"
import { getEngFormData, getPurchasingFormData, getQAFormData } from "./utils.js"

const exampleReport = {
    "ncrNumber": 2024001,
    "title": "Broken Bike",
    "itemName": "Bicycle",
    "status": "Closed",
    "defectDescription": "The bike is broken, it has no seat, the wheels don't have rubber, and the gears are cut in half.",
    "supplierName": "Mountain inc",
    "startedBy": "btaylor",
    "qtyDefective": 1,
    "qtyReceived": 100,
    "prodNumber": 10000,
    "salesNumber": 100,
    "date": "Nov 13 2023",
    "nonConforming": true,
    "supplierOrRec": true,
    "productionOrder": true,
    "itemDescription": "Bike",
    "sapNumber": 545,
    "engineeringReview": "Repair",
    customerNotification: true,
    drawingToUpdate: true,
    origRevNum: 8,
    NameOfEngineer: "Jack B. Skelly",
    UpdatedRev: null,
    RevisionDate: "july 4 2022",
    engineeringSignoff: null,
    Date: "Nov 1st 2024",
    Disposition: "this is the work that was done for this item",
    purchaseDecision: "Rework",
    CarRaised: true,
    CarNum: 100,
    FollowReq: false,
    followUpType: "phone",
    followUpDate: "march 8 2025",
    operationManager: "J B Goode",
    purchaseDate: "Nov 10 2024"
}



export function AutoFillButtons(targetID){
    const html = `
        <div>
            <button id="fill-qa">Fill QA</button>
            <button id="fill-eng">Fill Engineering</button>
            <button id="fill-pur">Fill Purchasing</button>
        </div>
    `

    return html;

    
}

function getRandomReport(){
    return reportData[Math.floor(Math.random() * array.length)];
}



export function bindAutoFillButtons(){
    document.getElementById("fill-qa").addEventListener('click', (e)=> {
        // fill it with one static reports data
        const qa = getQAFormData()
        qa.itemName.value = exampleReport.itemName
        qa.engineeringRequired.checked = true;
        qa.nonConforming.checked = true;
        qa.sapNumber.value = exampleReport.sapNumber
        qa.prodNumber.value = exampleReport.prodNumber
        qa.supplier.value = exampleReport.supplierName
        qa.supplierOrRec.checked = true;
        qa.quantityReceived.value = exampleReport.qtyReceived
        qa.quantityDefective.value = exampleReport.qtyDefective
        qa.defectDescription.value = exampleReport.defectDescription
        qa.salesNumber.value = exampleReport.salesNumber
       
    })

    document.getElementById("fill-eng").addEventListener('click', (e)=> {
        if(document.getElementById('engineering-header').style.display !== 'none'){
            const eng = getEngFormData()
            eng.Disposition.value = exampleReport.Disposition
            eng.RevisionDate.value = exampleReport.RevisionDate
            eng.customerNotification.checked = true;
            eng.drawingToUpdate.checked = true;
            document.getElementById("rad-use-as-is").checked = true;
            eng.updatedRev.value = 3
           
        }
    })

    document.getElementById("fill-pur").addEventListener('click', (e)=> {
        if(document.getElementById('purchasing-header').style.display !== 'none'){
            const pur = getPurchasingFormData()
            pur.CarNum.value = exampleReport.CarNum
            pur.CarRaised.checked = true;
            pur.followUpDate.value = exampleReport.followUpDate
            pur.followUpRequired.checked = true;
            pur.followUpType.selectedIndex = 1;
            document.getElementById("rad-purchaseReview-repair").checked = true;
            pur.purchaseDate.value = exampleReport.purchaseDate;
        }
    })
}