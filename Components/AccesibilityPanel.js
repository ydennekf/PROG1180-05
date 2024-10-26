import { append, injectOrReturn } from "./utils/utils.js"



export let revealed = false;

swapListener()

function reveal(){
        revealed = !revealed;
        AccessibilityPanel()
}

export function AccessibilityPanel(){
    console.log(revealed)
    if(revealed){
        const html = `
    <section id="accessibilityControls" role="region">
            <h3 id="accessibilityControllsTitle">Accessibility Controls</h3>
            <div class="chkBox">
                <label for="darkModeToggle">Enable Dark Mode</label>
                <input type="checkbox" id="darkModeToggle" aria-label="Dark Mode Toggle">
            </div>
    
            <div class="select-container">
                <label for="languageSelect">Language Select</label>
                <select class="select-box" id="languageSelect" name="language" aria-label="Language Select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </div>
        
        </section>`
        append('accessibility-menu', html)
    }else{
        try{
            document.getElementById("accessibilityControls").remove()
        } catch{
            // this only happens on startup since the div has never been created yet
        }
    
    }

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

   let toggle = document.getElementById("darkModeToggle");

   toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
});

    swapListener()
}



function swapListener(){
    const e= document.getElementById("accessibility-toggle")
    document.getElementById("accessibility-toggle").removeEventListener('click', reveal)
    document.getElementById("accessibility-toggle").addEventListener('click',reveal)
}
