import { trapFocus } from "./utils/utils.js";

export let createModal = (targetID, title, message, autoCloseDelay = null ,onClose) => {
    const modal = `
    <div id="modal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" style="display: block;">
        <div>
            <h2 id="modalTitle">${title}</h2>
            <p>${message}</p>
            <button id="closeModal">Close</button>
        </div>
    </div>
    `;
    let ResetErrorPanel = (delay) => {
        
            setTimeout(() => {
                if (onClose){
                    onClose();
                }
            }, delay)
 
    }

    if(autoCloseDelay){
        ResetErrorPanel(autoCloseDelay);
    }

    document.getElementById(targetID).innerHTML = modal;
    let component = document.getElementById(targetID);
    trapFocus(component);

    document.getElementById('closeModal').addEventListener('click', () => { onClose(); });
    document.getElementById('closeModal').addEventListener('keydown', (event) => {
        if(event.key === 'Escape' || (event.key === 'Enter' && document.activeElement === document.getElementById('closeModal'))){
            onClose();
        }
    })
}