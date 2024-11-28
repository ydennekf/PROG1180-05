import {app} from "../../AppState.js";
import * as SVG from "../svgs.js";

export function notificationItem(notification) {
    return `
    <li class="notification-list-item">
        
        <button>${notification.ncrNumber}</button>
        <button class="icon remove-item">${SVG.minusSVG()}</button>
    </li>
    `
}