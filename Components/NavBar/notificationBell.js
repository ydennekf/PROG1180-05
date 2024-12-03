import {app} from "../../AppState.js";
import * as SVG from "../svgs.js";
import {notificationItem} from "./notificationItem.js";
import {openReportEditor} from "../ReportPreview.js";

export function notificationBell(){
    const count =  app.storage.getNewReports().length;

    return `
        ${count === 0 ? "" : `<strong class="notification-count">${count}</strong>`}
        ${SVG.bellSVG()}
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
                ev.target.parentElement.remove();
                // also remove this report from the newReport list in emp prefs
            })
        })
    })

}

function populateNotifications(notificationList) {
    const notifications = [
    { ncrNumber: "NCR001", details: "Issue in production line." },
    { ncrNumber: "NCR002", details: "Inventory mismatch." },
    { ncrNumber: "NCR003", details: "Supplier delay reported." },
];
    notificationList.innerHTML = "";
    notifications.forEach((notification, index) => {
        notificationList.appendChild(notificationItem(notification))
    })

}