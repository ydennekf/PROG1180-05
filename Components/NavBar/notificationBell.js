import {app} from "../../AppState.js";
import * as SVG from "../svgs.js";

export function notificationBell(){
    const count =  app.storage.getNewReports().length;

    return`
        <span class="notification-count">${count}<span>
        ${SVG.bellSVG()}
    `
}