import { insert, injectOrReturn } from "../utils/utils.js";
import { ModifyNcrView } from "../NcrFormView/ModifyNcrView.js";
import { DetailsNcrView } from "../NcrFormView/DetailsNcrView.js";
import '../../../node_modules/popstate-direction/index.js'
import { ReportList } from "../ReportList.js";
import { app } from "../../AppState.js";



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
            BreadCrumbs(state, currentIDX, 'bread-crumbs')
        }
        
    }) 
    window.addEventListener('back', () => { 
        
        if(currentIDX > 0){
            currentIDX--;
            console.log('back ' + currentIDX + ' ' + state.length)
            const s = state[currentIDX]
            const component= viewMap[s.component];
            component(...s.data) 
            BreadCrumbs(state.slice(0, currentIDX+1), currentIDX, 'bread-crumbs') // slicing the state array so the bredcrumbs only create a trail behind
        }
    })

    return { // not using lambdas because you cannot access this with lambdas ( shit language )
        setInitialView:function (view) { // called once to set the index
            state.push(view);      
            BreadCrumbs(state, currentIDX, 'bread-crumbs')
            bindBreadCrumbs()
        },
        push:function (s){ // Refreshes ( This is called each time we move to a new view )
            state.push(s);
            history.pushState(s, '')
            currentIDX++;
            BreadCrumbs(state, currentIDX, 'bread-crumbs')
            bindBreadCrumbs()
           
        },
        flush:function (){ // clears the history state besides the initial view
            state = [state[0]]
            currentIDX = 0;
            BreadCrumbs(state, currentIDX, 'bread-crumbs')
            bindBreadCrumbs()
        },
        newPath:function (s){ // combines flush and push to create a new path from the index
            // use example: 
            // select a report preview detail view.
            // go back to the report index
            // select a new report detail view ( we want this one to be the new path so the history
            // will lead to the proper report if the forward command is called from the index view again)
            this.flush();
            this.push(s)
        },
        goBack: function (idx){
                // go back to the idx given.
                // remove all previous
                if(idx <= 0){
                    idx = 0;
                }
                state = state.slice(0, idx+1)
                currentIDX = idx;
                const s = state[currentIDX]
                const component= viewMap[s.component];

                component(...s.data)
                BreadCrumbs(state, currentIDX, 'bread-crumbs')
                bindBreadCrumbs()
        },
        length:() =>{
            return state.length
        }
    }
}



function BreadCrumbs(data, current, targetID=null){

    let mapped = ""
    data.forEach((element, idx) => {
        mapped += idx === current ? `<li><a aria-current="page" class="bread-crumb selected-view" data-view-id="${idx}" href="#">${breadCrumbText(element)}</li></a>` :
         `<li><a class="bread-crumb" data-view-id="${idx}" href="#">${breadCrumbText(element)}</a></li>`
    });

    const html = `
        <ul>
            ${mapped}
        </ul>
    `

    return injectOrReturn(html, targetID)
}


function bindBreadCrumbs(){
    const li = document.querySelectorAll('.bread-crumb')
    li.forEach(e =>{
        e.addEventListener('click', () => {
            const value =parseInt(e.dataset.viewId)
            if(value !== app.history.length() -1){
                app.history.goBack(value)
            }
        })
    })
}




const viewMap = {
    'ModifyNcrView':ModifyNcrView,
    "DetailsNcrView":DetailsNcrView,
    'ReportList':ReportList
}

function breadCrumbText(historyState){
    switch(historyState.component){
        case 'ModifyNcrView':
            if(!historyState.data[1]){ // because this component handles both creating and editing
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


export function redirect(view, args){ // view should be a function or string
    if(!app){
        console.log('Error Redirecting before login ' + view.name)
        return;
    }

    app.newPath({component:view.name || view, data:args})

}