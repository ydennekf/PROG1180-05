// just doing this because passing extra variables to each component is time consuming nd I just wanna get this working for now. Can do it / clean up l8r
import { clearNavOnLogout, NavBar } from "./Components/NavBar.js";
import { createLogin } from "./Components/Login.js";
import { handleLogin } from "./app.js";
import { _HistoryContext } from "./Components/context/historyContext.js";
import _StorageContext from "./Components/context/storageContext.js";
import { loadNavOnLogin } from "./Components/NavBar.js";
import * as SVG from "./Components/svgs.js";



export let app;

export function initApp(employee, initialView, initialArgs=[]){ // call after login 

    
    app ={
        history:_HistoryContext(),
        employee,
        currentView:"Index",

    }
    const storage = _StorageContext(app.employee)
    app["storage"] = storage;

    initialView(...initialArgs)
  
    app.history.setInitialView({component:initialView.name, data:initialArgs})
    loadNavOnLogin()
    toggleLogout()

    
}




function logout(){
    if(!app){
        return;
    }

    //NavBar();
    createLogin("root", handleLogin);
   document.getElementById('root').classList.remove('ncr-view')
   document.getElementById('footer').classList.add('abs-btm')
    app= null;
    clearNavOnLogout()
}

function toggleLogout(){
    if(app){
        document.getElementById('logout').innerHTML = `<div id="logout-btn" class="nav-icon">${SVG.logoutSVG()}</div>`;
        document.getElementById('logout-btn').addEventListener('click', logout)
    }
    else{
        document.getElementById('logout').innerHTML = ''
       
    }
}