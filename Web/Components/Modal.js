import { trapFocus } from "./utils/utils.js";

export let createModal = (targetID, title, message, autoCloseDelay) => {
    const modal = `
    <div id="modal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" style="display: block;">
        <div>
            <h2 id="modalTitle">${title}</h2>
            <p>${message}</p>
            
        </div>
    </div>
    `;
    let ResetErrorPanel = (delay) => {
        
            setTimeout(() => {
                
                    document.getElementById('errorPanel').innerHTML = '';
                    document.getElementById("loginForm").reset();
                
            }, delay)
 
    }

    if(autoCloseDelay){
        ResetErrorPanel(autoCloseDelay);
    }

    document.getElementById(targetID).innerHTML = modal;
    let component = document.getElementById(targetID);
    trapFocus(component);

    document.getElementById('closeModal').addEventListener('click', () => {  document.getElementById('errorPanel').innerHTML = '';
        document.getElementById("loginForm").reset(); });
    document.getElementById('closeModal').addEventListener('keydown', (event) => {
        if(event.key === 'Escape' || (event.key === 'Enter' && document.activeElement === document.getElementById('closeModal'))){
            document.getElementById('errorPanel').innerHTML = '';
            document.getElementById("loginForm").reset();
        }
    })
}