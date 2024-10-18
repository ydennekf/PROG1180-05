// just doing this because passing extra variables to each component is time consuming nd I just wanna get this working for now. Can do it / clean up l8r

import { _HistoryContext } from "./Components/context/historyContext.js";

export let app;

export function initApp(employee, initialView, initialArgs=[]){ // call after login 

    app ={
        history:_HistoryContext(),
        employee
    }

    initialView(...initialArgs)
    app.history.setInitialView({component:initialView.name, data:initialArgs})
}


