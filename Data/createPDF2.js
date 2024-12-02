function purchasingPreliminaryDecision(report){
    return [{canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ], margin:[0, 5, 0, 40]},
        {text:"Purchasings Preliminary Decision", style:"header", fontSize:16, color:blue},
        {columns:[
            {table:{body:[
                        [{text:"Use As-Is",fillColor:blue}, report.purchaseDecision === "useAsIs" ? checkBox() : ""]
                    ]}},
            {table:{body:[
                        [{text:"Repair",fillColor:blue}, report.purchaseDecision === "Repair" ? checkBox() : ""]
                    ]}},
            {table:{body:[
                        [{text:"Rework",fillColor:blue}, report.purchaseDecision === "Rework" ? checkBox() : ""]
                    ]}},
            {table:{body:[
                        [{text:"Scrap",fillColor:blue}, report.purchaseDecision === "Scrap" ? checkBox() : ""]
                    ]}}
        ], margin:[0, 5, 0, 0]}
    ]
}


function purchasingFollowUpType(report){
if(report.followUpRequired){
    console.log(report.followUpDate)
    console.log(report.followUpType)
    console.log(report.followUpRequired)
    return [
        {text:"Followup Required: Yes", style:"header"},
        {table:{body:[
            [{text:"Followup Date",fillColor:blue}, report.followUpDate]
        ]}},
        {table:{body:[
            [{text:"Followup Type",fillColor:blue}, report.followUpType]
        ]}},
        {table:{body:[
            [{text:"Purchase Date",fillColor:blue}, report.purchaseDate]
        ]}},
       
    ]
}
else{
    return [
        {text:"Followup Required: No" },
    ]
}
}