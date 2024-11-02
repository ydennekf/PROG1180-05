import { swapListener } from "./AccesibilityPanel.js";
import {SearchBar} from "./NavBar.js"
export function Page(content){
    if(typeof content !== "string"){
        content = content()
    } // pass it a function or html string.


    const html = `
    <div class="content-wrapper">
        <div id="nav-wrapper"></div>
        
        <div id="bread-crumbs"></div>
        <main class="page-container">
            ${content}
        </main>
    </div>
     <div aria-labelledby="errorPanel" id="errorPanel" role="alert">
        <!-- Error content here -->
    </div>
    <footer id="footer" class="abs-btm">
        
        <p>&copy; 2024 Crossfire. All rights reserved.</p>

        <button id="accessibility-toggle" aria-label="Open-Accesibility-Menu">Accessibility</button>
        <div id="accessibility-menu" >

        </div>
        </section>
    </footer>
    `


    document.getElementById("root").innerHTML = html;
    SearchBar("nav-wrapper")
    swapListener()
}

// TODO's


export class PageContext{
    static initialized = false;

    static init(content){
    
        Page(content)
        PageContext.initialized = true;
    }


    static rehydrate(content){
        PageContext.getContainer().innerHTML = 
            typeof content !== string ? content() : content;
    }

    static getContainer(){
        return document.getElementById('page-container')
    }
}