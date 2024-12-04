import { trapFocus } from "./utils/utils.js";
import * as SVG from "./svgs.js";

export let createModal = (targetID, title, message, autoCloseDelay) => {
    const modal = `
    <div id="modal" role="dialog" class="notify-modal" aria-labelledby="modalTitle" aria-hidden="true">
    <div id="closeModal" class="icon">${SVG.minusSVG()}</div>
        <div>
            <h2 id="modalTitle">${title}</h2>
            <p>${message}</p>
            
        </div>
    </div>
    `;
    let ResetErrorPanel = (delay) => {
        
            setTimeout(() => {
                
                    document.getElementById('errorPanel').innerHTML = '';
                    if(document.getElementById('loginForm')){
                        document.getElementById("loginForm").reset();
                    }

                
            }, delay)
 
    }



    document.getElementById(targetID).innerHTML = modal;
    let component = document.getElementById(targetID);
    trapFocus(component);

    document.getElementById('closeModal').addEventListener('click', () => {  document.getElementById('errorPanel').innerHTML = '';

    if(document.getElementById('loginForm')){
          document.getElementById("loginForm").reset();
    }
      });

    document.getElementById('closeModal').addEventListener('keydown', (event) => {
        if(event.key === 'Escape' || (event.key === 'Enter' && document.activeElement === document.getElementById('closeModal'))){
            document.getElementById('errorPanel').innerHTML = '';
            if(document.getElementById("loginForm")){
                 document.getElementById("loginForm").reset();
            }

        }
    })
    if(autoCloseDelay){
        ResetErrorPanel(autoCloseDelay);
    }
}