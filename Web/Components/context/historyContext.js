import { insert, injectOrReturn } from "../utils/utils.js";
import { ModifyNcrView } from "../NcrFormView/ModifyNcrView.js";
import { DetailsNcrView } from "../NcrFormView/DetailsNcrView.js";
import '../../../node_modules/popstate-direction/index.js'
import { ReportList } from "../ReportList.js";



export function _HistoryContext(){ 
    let currentIDX = 0;
    let state=[]
  
    // Injects the breadcrumb component
    // Returns an object with a method to update the breadcrumbs whenever we move to a new view ( Called at the top of all view functions )
    // Also listens for back/forward button clicks and returns the user to their previous/next view.
    window.addEventListener('forward', () => {
       
        if(currentIDX < state.length -1){
            currentIDX++;
            console.log('forward ' + currentIDX + ' ' + state.length)
            const s = state[currentIDX]
            const component= viewMap[s.component];
            component(...s.data) 
            insert('bread-crumbs', BreadCrumbs(state, currentIDX))
        }
        
    }) 
    window.addEventListener('back', () => { 
        
        if(currentIDX > 0){
            currentIDX--;
            console.log('back ' + currentIDX + ' ' + state.length)
            const s = state[currentIDX]
            const component= viewMap[s.component];
            component(...s.data) 
            insert('bread-crumbs', BreadCrumbs(state, currentIDX))
        }
    })

    return { // not using lambdas because you cannot access this with lambdas ( shit language )
        setInitialView:function (view) { // called once to set the index
            state.push(view);      
            insert('bread-crumbs', BreadCrumbs(state, currentIDX))
        },
        push:function (s){ // Refreshes ( This is called each time we move to a new view )
            state.push(s);
            history.pushState(s, '')
            currentIDX++;
            insert('bread-crumbs', BreadCrumbs(state, currentIDX))
        },
        flush:function (){ // clears the history state besides the initial view
            state = [state[0]]
            currentIDX = 0;
        },
        newPath:function (s){ // combines flush and push to create a new path from the index
            // use example: 
            // select a report preview detail view.
            // go back to the report index
            // select a new report detail view ( we want this one to be the new path so the history
            // will lead to the proper report if the forward command is called from the index view again)
            this.flush();
            this.push(s)
        }
    }
}



function BreadCrumbs(data, current, targetID=null){

    let mapped = ""
    data.forEach((element, idx) => {
        mapped += idx === current ? `<li className="selected-view">${breadCrumbText(element)}</li>` : `<li>${breadCrumbText(element)}</li>`
    });

    const html = `
        <ul>
            ${mapped}
        </ul>
    `

    return injectOrReturn(html, targetID)
}


const viewMap = {
    'ModifyNcrView':ModifyNcrView,
    "DetailsNcrView":DetailsNcrView,
    'ReportList':ReportList
}

function breadCrumbText(historyState){
    switch(historyState.component){
        case 'ModifyNcrView':
            if(!historyState.data[2]){
                return "Start New Report" 
            }else{
                return "Edit NCR #" + historyState.data[2].ncrNumber
            }

        case "DetailsNcrView":
            return "View NCR #" + historyState.data[1].ncrNumber;

        case "ReportList":
            return "Index | Report View"
    }
}