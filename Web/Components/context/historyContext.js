import { insert, injectOrReturn } from "../utils/utils.js";
import { ModifyNcrView } from "../NcrFormView/ModifyNcrView.js";
import { DetailsNcrView } from "../NcrFormView/DetailsNcrView.js";
import  "../../../node_modules/popstate-direction/index.js";

/*
    If you want your view to function with History you must:
    1. include a _history.push() call to your function;
    2. pass the function ALL its arguments don't leave any out ( pass their defaults )
*/
export function _HistoryContext(){ // For now just using this as a global state
    // TODO pass an initial state for the starting viewpoint 
    const state = []
    let currentIDX = 0

    // Inject the breadcrumb component
    // Return an object with a method to update the breadcrumbs whenever we move to a new view ( Called at the top of all view functions )
    window.addEventListener('forward', () => {
        if(currentIDX < state.length -1){
            currentIDX++;
            const s = state[currentIDX]
            const component= viewMap[s.component];
            component(...s.data, false) // pass false to prevent recursively adding a to history
        }
        
    }) 
    window.addEventListener('back', () => { 
        console.log(state.length + 'back')
        if(currentIDX > 0){
            currentIDX--;
            const s = state[currentIDX]
            const component= viewMap[s.component];
            component(...s.data, false) // pass false to prevent recursively adding a to history
        }
    })

    return {
        push:(s) => { // Refreshes ( This is called each time we move to a new view )
            if(state.length === 0){
                state.push(s);
                insert('bread-crumbs', BreadCrumbs(state.map(s => s.component), currentIDX))
                return;
            }
            state.push(s);
            currentIDX++;
            insert('bread-crumbs', BreadCrumbs(state.map(s => s.component), currentIDX))
        },
    }
}

function BreadCrumbs(data, current, targetID=null){

    let mapped = ""
    data.forEach((element, idx) => {
        mapped += idx === current ? `<li className="selected-view">${element}</li>` : `<li>${element}</li>`
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
    "DetailsNcrView":DetailsNcrView
}