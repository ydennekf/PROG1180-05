import { getReport } from "./new_reportData.js"
function checkBox(){
    return {
        text: '√',
        // absolutePosition: { x: 21, y: 293 }
    }
}

function topRightTable(report) {
    return {
        width:"*",
        table: {
            widths: ['*', 'auto'],
            body: [
                [{text:'NCR No.', fillColor:"#5897c9"}, report.ncrNumber],
                [{text:'PROD No.', fillColor:"#5897c9"}, report.prodNumber],
                [{text:'Sales Order No.', fillColor:"#5897c9"}, report.salesNumber],
                [{text:'Quantity Received', fillColor:"#5897c9"}, report.qtyReceived],
                [{text:'Quantity Defective', fillColor:"#5897c9"}, report.qtyDefective],
                [{text: "Supplier Name", fillColor: "#5897c9"}, `${report.supplierName}`]
            ], margin: [0, 0, 20, 0]
        }
    }
}

function qaFooter(report){

    return [
        {text:"\nQuality Representative's Name: " + "Bob Taylor"},
        {text:"Date " + report.date}
    ]
}



    function qaHeader(report){
    return [
        {text:"Quality Assurance\n", style:"header", fontSize:16},
        {

            columns:[

                { width:200, table:{body:[
                    [{text:"Identify Process Applicable\n", style:"header", fontSize:14, fillColor:"#5897c9"}, ""],
                            ["Supplier or Rec-Insp", report.supplierOrRec ? checkBox() : ""],
                            ["WIP (Production Order)", report.productionOrder ? checkBox() : ""]
                        ]}},
                topRightTable(report)
                //{table: {body: [[{text: "Supplier Name"}, ""], [`${report.supplierName}`, ""]]}}
            ]
        }
    ]
}

    export function convertToPDF(reportNumber) {
        let report = getReport(reportNumber);
        let pdf = {
            content: [
                ...qaHeader(report),
                qaDescriptions(report),
                ...qaFooter(report),
                ...engHeader(report),
                ...engDisposition(report),
                ...engFooter(report)
            ]
        }
        return pdf;

}
/* ENGINEERING */

function engHeader(report){
    return [{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ], margin:[0, 0, 0, 10]},
        {text:"Review By Engineering", style:"header", fontSize:16},

        {text:"Return to Supplier for either rework or replacement"},
        {columns:[
                {table:{body:[
                            [{text:"Use As-Is",fillColor:"#5897c9"}, report.supplierOrRec ? checkBox() : ""]
                        ]}},
                {table:{body:[
                            [{text:"Repair",fillColor:"#5897c9"}, false ? checkBox() : ""]
                        ]}},
                {table:{body:[
                            [{text:"Rework",fillColor:"#5897c9"}, false ? checkBox() : ""]
                        ]}},
                {table:{body:[
                            [{text:"Scrap",fillColor:"#5897c9"}, false ? checkBox() : ""]
                        ]}}
            ]}
    ]
}


function engDisposition(report){
    return [
        {text:"Disposition", style:"header", fontSize:14},
        {text:"This is an example of disposition as I have yet to hook it up to the sample data we have."},
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ], margin:[0, 0, 0, 10]},
        {table:{body:[
                    ["Does the Drawing Require Updating", report.supplierOrRec ? checkBox() : ""],
                    ["Original Rev. Number", "123"],
                    ["Updated Rev. Number", "123"],
                    ["Revision Date", "123"]
                ]}}
    ]
}

function engFooter(report){
    return [

                {text:"\nName of Engineer: " + "Bob Taylor"},
                {text:"Date " + report.date}
            ]

}

export function qaDescriptions(report) {
    return {

                style: 'tableExample',
                color: '#555',
                margin:[ 0, 20, 0, 0 ],
                table: {

                    body: [
                        [
                            {text: "Description of Defect"},
                            {text: report.defectDescription},
                        ],

                        [
                            {text: "Description of Item"},
                            {text:report.itemName},
                        ],
                        [
                            {text:"SAP No."},
                            {text:report.sapNumber}
                        ]
                    ]
                },
                layout: {
                    //hLineWidth: function(i, node) {
                    //  return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    //},
                    //vLineWidth: function(i, node) {
                    //  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    //},
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                    },
                   //  paddingLeft: function(i, node) { return 40; },
                   //   paddingRight: function(i, node) { return 40; },
                   //   paddingTop: function(i, node) { return 20; },
                   // paddingBottom: function(i, node) { return 20; }
                }

        ,

        defaultStyle: {
            // alignment: 'justify'
        }
    }
}