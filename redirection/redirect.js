import { ReportList } from "../Components/ReportList.js"
import { app } from "../AppState.js"
import { reportData } from "../Data/new_reportData.js"
import { ModifyNcrView } from "../Components/NcrFormView/ModifyNcrView.js"
import {ReportView} from "../Components/NcrFormView/ReportView.js";

export function redirectHome(){
    Index()
    app.history.flush()
}
// Ask me about new path before u try and use it
export function redirectViewAllReports(newPath = true){
    ReportList('root', app.employee, reportData)
    newPath ? 
        app.history.newPath({component:'ReportList', data:['root', app.employee, reportData]})
        :
        app.history.push({component:'ReportList', data:['root', app.employee, reportData]})
}

export function redirectNewReport(newPath=true){
    ReportView(null, "Create")
    newPath ? 
        app.history.newPath({component:'ReportView', data:[null, "Create"]})
        :
        app.history.push({component:'ReportView', data:[null, "Create"]})
}