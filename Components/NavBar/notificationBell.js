import {app} from "../../AppState.js";
import * as SVG from "../svgs.js";

export function notificationBell(){
    const count =  app.storage.getNewReports().length;

    return `
        ${count === 0 ? "" : `<strong className="notification-count">${count}</strong>`}
        ${SVG.bellSVG()}
    `
}