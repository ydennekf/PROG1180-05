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
                document.getElementById(targetID).innerHTML = '';
                if (onClose){
                    onClose();
                }
            }, delay)
 
    }

    let trapFocus = () => {
        document.getElementById('closeModal').focus();

    }
    

    

    if(autoCloseDelay){
        ResetErrorPanel(autoCloseDelay);
    }

    document.getElementById(targetID).innerHTML = modal;
    trapFocus();

    document.getElementById('closeModal').addEventListener('click', () => { onClose(); });
    document.getElementById('closeModal').addEventListener('keydown', (event) => {
        if(event.key === 'Escape' || (event.key === 'Enter' && document.activeElement === closeModalButton)){
            onClose();
        } else if (event.key === 'Tab') {
            trapFocus();
        }
    })
}