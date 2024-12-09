import {app} from "../../AppState.js";
import * as SVG from "../svgs.js";
import {notificationItem} from "./notificationItem.js";
import {openReportEditor} from "../ReportPreview.js";
import {employees} from "../../Data/employeeData.js";

export function notificationBell(){
    const count =  app.storage.getNewReports().length;
    document.getElementById("dropdownTrigger").innerHTML = `       
        ${SVG.bellSVG()}
        New
        ${count === 0 ? "" : `<strong class="notification-count">${count}</strong>`}
        <div class="tooltip bottom-tooltip">Notifications</div>
    `
}

export function setNotifyListeners(){
    const dropdown = document.getElementById("_notifications");
    const dropdownTrigger = document.getElementById("dropdownTrigger");
    const theList = document.getElementById("notificationList");

    dropdownTrigger.addEventListener("click", () => {
        dropdown.classList.toggle("active");
        if(dropdown.classList.contains("active")){
            populateNotifications(theList);
        }
        else{
            theList.innerHTML = "";
        }

        const ncrNumberBtn = document.querySelectorAll('.notify-ncr-number');
        const closeBtns = document.querySelectorAll('.remove-item');

        ncrNumberBtn.forEach(e => {
            e.addEventListener('click', (ev) => openReportEditor(ev.target.dataset.ncr))
        })
        closeBtns.forEach(e => {
            e.addEventListener('click', (ev) => {
                const targetA = ev.target.parentElement;
                targetA.parentElement.remove();
                let notes = app.storage.getNewReports();
                notes = notes.filter(r => r.ncrNumber === ev.target.dataset.ncr);
                let empPref = localStorage.getItem('preferences')
                const index = employees.findIndex((c) => c.username === app.employee.username);
                console.log(index);
                console.log(empPref[index]);
                console.log(ev.target)
                app.storage.removeNewReport(ev.target.dataset.ncr)
                populateNotifications(theList)
                // also remove this report from the newReport list in emp prefs
            })
        })
    })

}

function populateNotifications(notificationList) {
    console.log("clicked the bell")
    notificationBell();
    const notifications = app.storage.getNewReports();
    notificationList.innerHTML = "";
    notifications.forEach((notification) => {
        notificationList.appendChild(notificationItem(notification))
    })

}