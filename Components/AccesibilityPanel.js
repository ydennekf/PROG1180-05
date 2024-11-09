import { append, injectOrReturn } from "./utils/utils.js"



export let revealed = false;

swapListener()
function reveal(){
        revealed = !revealed;
        AccessibilityPanel()
}

export function AccessibilityPanel(){
    let theme = localStorage.getItem('theme')
    if(!theme){
        localStorage.setItem('theme', "light")
        theme = localStorage.getItem('theme')
    }

    console.log(revealed)
    if(revealed){
        document.getElementById('accessibility-toggle').innerText = "Close"
        const html = `
    <section id="accessibilityControls" role="region">
            <h3 id="accessibilityControllsTitle">Accessibility Controls</h3>
            <div class="chkBox">
                <label class="white" for="darkModeToggle">Enable Dark Mode</label>
                <input type="checkbox" id="darkModeToggle" aria-label="Dark Mode Toggle" ${theme === "light" ? '' : 'checked'}>
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
            document.getElementById('accessibility-toggle').innerText = "Accessibility"
        } catch{
            // this only happens on startup since the div has never been created yet
        }
    
    }
    let currentImage = document.getElementById('login-logo');
  
    
    

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');

        if(currentImage !== null){
            currentImage.src = '../image/crossfire-logo-no-bkg-darkmode.png';
        }
        
        
    }

   let toggle = document.getElementById("darkModeToggle");

   toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const newImage = currentTheme === 'dark' ? '../image/crossfire-logo-no-bkg.png' : '../image/crossfire-logo-no-bkg-darkmode.png'
    
    
    if(currentImage !== null){
        currentImage.src = newImage;
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
});

    swapListener()
}



export function swapListener(){
    const e= document.getElementById("accessibility-toggle")
    e.removeEventListener('click', reveal)
    e.addEventListener('click',reveal)
}
