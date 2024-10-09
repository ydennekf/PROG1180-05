
export class ReportStatus{
    static AwaitingEngineering = "Awaiting Engineering"
    static Closed = "Closed"
}




export const reportData = [
    {
        id:0,
        title:"Broken Bike",
        itemName:"Bicycle",
        status:ReportStatus.Closed,
        description:"The bike is broken, it has no seat the wheels don't have rubber and the gears are cut in half.",
        supplierName:"Mountain inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceieved:100,
        prodNumber:10000,
        salesNumber:100,
        date:'Nov 13 2023',
        engineeringRequired:true,
        nonConforming:true
    },
    {
        id:1,
        title:"Broken Bike",
        itemName:"Trampoline",
        status:ReportStatus.AwaitingEngineering,
        description:"The trampoline is missing 3 of its poles.",
        supplierName:"Trampoline inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceieved:100,
        prodNumber:10001,
        salesNumber:101,
        date:'Oct 24th 2024',
        engineeringRequired:true,
        nonConforming:true
    },
    {
        id:2,
        title:"Broken Generator",
        itemName:"Generator",
        status:ReportStatus.Closed,
        description:"The generator won't turn on even after charging",
        supplierName:"Generator inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceieved:5,
        prodNumber:10002,
        salesNumber:102,
        date:'Jan 24th 2022',
        engineeringRequired:true,
        nonConforming:true
    },
    {
        id:3,
        title:"Broken Fishing Rods",
        itemName:"Fishing Rod",
        status:ReportStatus.AwaitingEngineering,
        description:"All the fishing rods are broken you cannot reel in on any of them, not suitable for fishing.",
        supplierName:"Fishing inc",
        startedBy:'btaylor',
        qtyDefective:100,
        qtyReceieved:100,
        prodNumber:10003,
        salesNumber:103,
        date:'June 24th 2024',
        engineeringRequired:true,
        nonConforming:true
    },
    {
        id:4,
        title:"Tent Missing Poles",
        itemName:"Tent",
        status:ReportStatus.Closed,
        description:"One of the tents is missing all of its poles its just a sheet",
        supplierName:"Mountain inc",
        startedBy:'btaylor',
        qtyDefective:1,
        qtyReceieved:50,
        prodNumber:10004,
        salesNumber:104,
        date:'March 1st 2024',
        engineeringRequired:true,
        nonConforming:true
    }
]









