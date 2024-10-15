import { app } from "../AppState.js"
import { injectOrReturn } from "./utils/utils.js"

export function NavBar(targetID=null){ 
    let html = `
    <nav id="navbar" role="navigation" aria-label="main navigation">
        <div>
      
            <span id="user-info">
                <span id="user-name-label">Logged in as: <strong id="user-name">${app?.employee.username}</strong></span>
                <span id="user-department">- ${app?.employee.department}</span>
            </span>
         <div>
        <div>
            <button id="create-report-btn" aria-label="create New Report">New Report</button>
            <label for="report-search">Search NCR Reports</label>
            <input type="text" id="report-search" placeholder="search ncr reports ..."
                aria-labelledby="search-description" aria-autocomplete="list" aria-controls="search-listbox"
                aria-expanded="false" tabindex="1">
            <div id="search-listbox" role="listbox" aria-live="polite"></div>
        </div>
    </nav>
    `

    return injectOrReturn(targetID)
}