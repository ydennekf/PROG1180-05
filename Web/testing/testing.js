import { ReportList } from "../Components/ReportList.js";
import {  reportData } from "../Data/reportData.js";
import {ModifyNcrView} from "../Components/NcrFormView/ModifyNcrView.js";
import {employees, getEmployeeByUsername} from "../Data/employeeData.js";
import { DetailsNcrView } from "../Components/NcrFormView/DetailsNcrView.js";
import { injectOrReturn } from "../Components/utils/utils.js";
import { getReport } from "../Data/new_reportData.js";
import { _HistoryContext } from "../Components/context/historyContext.js";
import { initApp, app } from "../AppState.js";
import '../../node_modules/popstate-direction/index.js'


//DetailsNcrView('root', reportData[0])

function LocationTesting(targetID =null){
    

    const html = `
        <div>
            <button id="click-button">Click Me</button>
            <button id="clicker-button">Click Me</button>
            <button id="clicky-button">Click Me</button>
            <button id="clickery-button">Click Me</button>
        </div>
    `

    return injectOrReturn(html, targetID)
}

initApp(getEmployeeByUsername('btaylor'), ReportList, ['root', getEmployeeByUsername('btaylor'), reportData])


// function click(){
//     const data = ['root', getReport(17)]
//     DetailsNcrView(...data)
//     app.history.push({component:'DetailsNcrView', data})
    
   
// }

// function clickAgain(){
//     const data = ['root', getEmployeeByUsername('btaylor'), getReport(17)]
//     ModifyNcrView(...data)
//     app.history.push({component:'ModifyNcrView', data:['root', getEmployeeByUsername('btaylor'), getReport(17)]})
    
// }

// function clickerAgain(){
//     const data = ['root', getEmployeeByUsername('btaylor'), getReport(12)]
//     ModifyNcrView(...data)
//     app.history.push({component:'ModifyNcrView', data:['root', getEmployeeByUsername('btaylor'), getReport(12)]})
    
// }

// function clickererAgain(){
//     const data = ['root', getReport(12)]
//     DetailsNcrView(...data)
//     app.history.push({component:'DetailsNcrView', data})
    
// }


function bindLocationClicker(){
    document.getElementById('click-button').addEventListener('click', click)
    document.getElementById('clicker-button').addEventListener('click', clickAgain)
    document.getElementById('clicky-button').addEventListener('click', clickerAgain)
    document.getElementById('clickery-button').addEventListener('click', clickererAgain)
}




//LocationTesting('nav')

//bindLocationClicker()

export class Views{
    static toBreadCrumbText(){

    }
}

// doing this with the history causes a new problem to arise/ if we include a url parameter the links wont actually lead anywhere without mking our own router 



