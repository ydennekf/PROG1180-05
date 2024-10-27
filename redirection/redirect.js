import { ReportList } from "../Components/ReportList.js"
import { app } from "../AppState.js"
import { reportData } from "../Data/new_reportData.js"
export function redirectHome(){
    ReportList('root', app.employee, reportData)
    app.history.flush()
}