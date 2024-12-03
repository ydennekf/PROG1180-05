import {app} from "../../AppState.js";
import * as SVG from "../svgs.js";

export function notificationItem(notification) {
    const listItem = document.createElement("li");
    listItem.className = "notification-list-item";

    listItem.innerHTML = `
        <button class="notify-ncr-number" data-ncr="${notification.ncrNumber}">${notification.ncrNumber}</button>
        <button class="icon remove-item" data-minus-ncr="${notification.ncrNumber}">${SVG.minusSVG()}</button>
    `;

    return listItem;
}