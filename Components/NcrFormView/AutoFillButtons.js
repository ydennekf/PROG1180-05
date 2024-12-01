import { reportData } from "../../Data/new_reportData.js"
import { insert } from "../utils/utils.js"

export function AutoFillButtons(targetID){
    const html = `
        <div>
            <button id="fill-qa">Fill QA</button>
            <button id="fill-eng">Fill Engineering</button>
            <button id="fill-pur">Fill Purchasing</button>
        </div>
    `

    insert(targetID, html)

    document.getElementById("fill-qa").addEventListener('click', (e)=> {
        // fill it with one static reports data
    })

    document.getElementById("fill-eng").addEventListener('click', (e)=> {
        const r = getRandomReport()
    })

    document.getElementById("fill-pur").addEventListener('click', (e)=> {
        const r = getRandomReport()
    })
}

function getRandomReport(){
    return reportData[Math.floor(Math.random() * array.length)];
}

