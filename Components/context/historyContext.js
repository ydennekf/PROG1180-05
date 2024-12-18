import { insert, injectOrReturn } from "../utils/utils.js";

import { DetailsNcrView } from "../NcrFormView/DetailsNcrView.js";
import '../../node_modules/popstate-direction/index.js'
import { ReportList } from "../ReportList.js";
import { app } from "../../AppState.js";
import Index from "../Views/Index.js";
import {ReportView} from "../NcrFormView/ReportView.js";
import { createFAQ } from "../FAQ.js";



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

    return { // not using lambdas because you cannot access "this" with lambdas ( shit language )
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
            this.push(s);
            bindBreadCrumbs()
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
        },
        branchPath:function (s){
            // remove everything ahead of our current idx
            // push this new state 
            state = state.slice(0, currentIDX+1)
            console.log(state)
            this.push(s)
        }
    }
}



function BreadCrumbs(data, current, targetID=null){
    // TODO refresh current page each time this is called.
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

    "DetailsNcrView":DetailsNcrView,
    'ReportList':ReportList,
    "Index": Index,
    "ReportView": ReportView,
    'createFAQ': createFAQ
}

function breadCrumbText(historyState){
    switch(historyState.component){
        case 'ReportView':
            console.log(historyState.data + "WOW")
            return historyState.data[1]

        case "DetailsNcrView":
            return "View";

        case "ReportList":
            return "List"

        case "Index":
            return "Home"

        case "createFAQ":
            return "FAQ"
    }
}

