import { ReportList } from "../Components/ReportList.js"
import { app } from "../AppState.js"
import { reportData } from "../Data/new_reportData.js"
import Index from "../Components/Views/Index.js";
import {ReportView} from "../Components/NcrFormView/ReportView.js";
import {createFAQ} from "../Components/FAQ.js";



export function redirectHome(){
    Index()
    app.history.flush()
    app.currentView = "Index"
}
// Ask me about new path before u try and use it
export function redirectViewAllReports(newPath = true){
    ReportList('root', app.employee, reportData)
    newPath ? 
        app.history.newPath({component:'ReportList', data:['root', app.employee, reportData]})
        :
        app.history.push({component:'ReportList', data:['root', app.employee, reportData]})

    app.currentView = "ReportList"
}

export function redirectNewReport(newPath=true){
    ReportView(null, "Create")
    newPath ? 
        app.history.newPath({component:'ReportView', data:[null, "Create"]})
        :
        app.history.push({component:'ReportView', data:[null, "Create"]})

    app.currentView = "ReportView"
}

export function redirectFAQ(newPath=true){
    createFAQ()
    newPath ?
        app.history.newPath({component:'createFAQ', data:[]})
        :
        app.history.push({component: 'createFAQ', data:[]})
    app.currentView = "FAQ"
}