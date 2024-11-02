import { ReportList } from "../Components/ReportList.js"
import { app } from "../AppState.js"
import { reportData } from "../Data/new_reportData.js"
import { ModifyNcrView } from "../Components/NcrFormView/ModifyNcrView.js"
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
    ModifyNcrView("root", app.employee, null)
    newPath ? 
        app.history.newPath({component:'ModifyNcrView', data:['root', app.employee, null]})
        :
        app.history.push({component:'ModifyNcrView', data:['root', app.employee, null]})
}