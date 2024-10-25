import { app } from "../AppState.js";
import { reportPreview } from "./ReportPreview.js";
import { injectOrReturn, mapComponents } from "./utils/utils.js";

let showRecent = true;


export function RecentReports(targetID = null){
    if(!showRecent){
        injectOrReturn(targetID, '')
    }

    const recent = app.storage.getRecentReports()
    const html = `
        <tbody class="epic">
        <tr><button>Recent Reports</button></tr>
        ${mapComponents(recent, reportPreview)}
        </tbody>
    `

    return injectOrReturn(html, targetID)
}