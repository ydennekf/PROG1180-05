export let createModal = (targetID, title, message, onClose) => {
    const modal = `
    <div id="modal" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" style="display: block;">
        <div>
            <h2 id="modalTitle">${title}</h2>
            <p>${message}</p>
            <button id="closeModal">Close</button>
        </div>
    </div>
    `;

    document.getElementById(targetID).innerHTML = modal;

    document.getElementById('closeModal').addEventListener('click', () => { onClose(); });
}