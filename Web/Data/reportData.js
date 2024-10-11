
export class ReportStatus{
    static AwaitingEngineering = "Awaiting Engineering"
    static Closed = "Closed"
}

export function getReport(ncrNumber){
    return reportData.find(i => i.ncrNumber === ncrNumber)
}

export function updateReport(ncrNumber, updatedReport){ // returns old report
    // can implement some sort of rollback feature with this
    const idx = reportData.findIndex(i => i.ncrNumber === ncrNumber)
    const oldReport = {...reportData[idx]}

    reportData[idx] = updatedReport
    console.log(reportData)

    return oldReport;
}

// Eventually I want to reformat the reports so that each respective field is in a nested object
// eg: {qualityAssurance : { itemName, defectDescription, supplierName, etc } }.


export const reportData = [
    {
        ncrNumber:0,
        title:"Broken Bike",
        itemName:"Bicycle",
        status:ReportStatus.Closed,
        defectDescription:"The bike is broken, it has no seat the wheels don't have rubber and the gears are cut in half.",
        supplierName:"Mountain inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceived:100,
        prodNumber:10000,
        salesNumber:100,
        date:'Nov 13 2023',
        nonConforming:true,
        supplierOrRec:true,
        productionOrder:true,
        itemDescription:"Bike",
        sapNumber:0
    },
    {
        ncrNumber:1,
        title:"Broken Trampoline",
        itemName:"Trampoline",
        status:ReportStatus.AwaitingEngineering,
        defectDescription:"The trampoline is missing 3 of its poles.",
        supplierName:"Trampoline inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceived:100,
        prodNumber:10001,
        salesNumber:101,
        date:'Oct 24th 2024',
        nonConforming:true,
        supplierOrRec:true,
        productionOrder:true,
        itemDescription:"Trampoline",
        sapNumber:1
    },
    {
        ncrNumber:2,
        title:"Broken Generator",
        itemName:"Generator",
        status:ReportStatus.Closed,
        defectDescription:"The generator won't turn on even after charging",
        supplierName:"Generator inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceived:5,
        prodNumber:10002,
        salesNumber:102,
        date:'Jan 24th 2022',
        nonConforming:true,
        supplierOrRec:true,
        productionOrder:true,
        itemDescription:"Generator",
        sapNumber:2
    },
    {
        ncrNumber:3,
        title:"Broken Fishing Rods",
        itemName:"Fishing Rod",
        status:ReportStatus.AwaitingEngineering,
        defectDescription:"All the fishing rods are broken you cannot reel in on any of them, not suitable for fishing.",
        supplierName:"Fishing inc",
        startedBy:'btaylor',
        qtyDefective:100,
        qtyReceived:100,
        prodNumber:10003,
        salesNumber:103,
        date:'June 24th 2024',
        nonConforming:true,
        supplierOrRec:true,
        productionOrder:true,
        itemDescription:"Fishing Rods",
        sapNumber:3
    },
    {
        ncrNumber:4,
        title:"Tent Missing Poles",
        itemName:"Tent",
        status:ReportStatus.Closed,
        defectDescription:"One of the tents is missing all of its poles its just a sheet",
        supplierName:"Mountain inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceived:50,
        prodNumber:10004,
        salesNumber:104,
        date:'March 1st 2024',
        nonConforming:true,
        supplierOrRec:true,
        productionOrder:true,
        itemDescription:"Tent",
        sapNumber:4
    }
]









