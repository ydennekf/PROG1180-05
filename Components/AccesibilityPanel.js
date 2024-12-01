import { append, injectOrReturn } from "./utils/utils.js"



export let revealed = false;

swapListener()
function reveal(){
        revealed = !revealed;
        AccessibilityPanel()
}

function swapTheme(){
    let theme = localStorage.getItem('theme')
    if(!theme){
        localStorage.setItem('theme', "light")
        theme = localStorage.getItem('theme')
    }
    const e = document.getElementById("accessibility-toggle")

    if(theme === "light"){
        localStorage.setItem('theme', "dark")
        e.innerText = "Enable Light Mode"
        document.documentElement.setAttribute('data-theme', "dark");
    }else{
        localStorage.setItem('theme', "light")
        e.innerText = "Enable Dark Mode"
        document.documentElement.setAttribute('data-theme', "light"); 
    }
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
            <h3 id="accessibilityControllsTitle"></h3>
            <div class="chkBox">
                <label class="white" for="darkModeToggle">Enable Mode</label>
                <input type="checkbox" id="darkModeToggle" aria-label="Dark Mode Toggle" ${theme === "light" ? '' : 'checked'}>
            </div>
        </section>`
        append('accessibility-menu', html)
    }else{
        try{
            document.getElementById("accessibilityControls").remove()
            document.getElementById('accessibility-toggle').innerText = "Dark Mode"
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
    e.removeEventListener('click', swapTheme)
    e.addEventListener('click',swapTheme)
}
