import {injectOrReturn} from "../utils/utils.js";

export function DetailsNcrView(targetID, report){

    const html = `
        ${DetailsHeader(report)}
    `

    document.getElementById(targetID).innerHTML = html;
}

function DetailsHeader(report, targetID=null){
    const html = `
        <div>
            <dl>
                <dt>Title</dt>
                <dd>${report.title}</dd>
            </dl>
        </div>
    `

    return injectOrReturn(html, targetID)
}