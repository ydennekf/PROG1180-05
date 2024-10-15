export function mapComponents(
    data, // obj array
    component, // component ( each component is passed an object from the data array )
    additionalArgs=[] 
){
    if(!data || data.length === 0){
        return "<tr><td>No results found</td></tr>"
    }
    return data.reduce((prev, cur)=> {
        return prev + component(cur, ...additionalArgs)
    }, "")
}
// Made this because using array.map to create components from an array of objects adds commas to each one.
// Since we're just converting to string/innerHTML thought this might be convenient. 
// Basically its just wrapping array.reduce to clean up the html markup in components.



// this function lets you pass it a component to trap the user's focus targets to.
// target is the component.
export function trapFocus(target) {
    // this defines what items are focusable within the component
    let focusableElements = target.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    let firstFocus = focusableElements[0];
    let lastFocus = focusableElements[focusableElements.length - 1];

    if(focusableElements.length === 0){
        return;
    }
    

    target.addEventListener('keydown', (event) => {
        let isTabPressed = (event.key === 'Tab');

        if(!isTabPressed){
            return;
        }

        if(event.shiftKey){
            // if you hit shift + tab it will set the focus to the last item in the focus list

            if(document.activeElement === firstFocus){
                event.preventDefault();
                lastFocus.focus();
            }
        } else {
            // if we are just hitting tab and have reached the end of the list
            // go back to the first item in the list
            if(document.activeElement === lastFocus){
                event.preventDefault();
                firstFocus.focus();
            }
        }
    });

    // when the component if first loaded set the focus to the first focus item
    if(focusableElements.length > 0){
        firstFocus.focus();
    }
    
}

// simple function to reset a form as a callback function from an error message
export function resetForm() {
    document.getElementById('errorPanel').innerHTML = '';
    document.getElementById("loginForm").reset();
}


export function safeOr(value, _default){
    // or that accepts empty strings and numbers <= 0
    // made because report?.ncrNumber ( 0 ) || '' will always return the empty string
    if(value === null || value === false || value === undefined){
        return _default;
    }

    return value;


}


export function injectOrReturn(html, targetID=null,){
    // Made this, so you can just return the HTML string from functions and not supply a targetID when convenient
    if(targetID){
        if(typeof targetID=== 'string' && !['', ' '].includes(targetID)){ // TODO empty/' ' string throws error
            document.getElementById(targetID).innerHTML = html;
        }
    }else{
        return html;
    }
}





export function insert(targetID, html){
    document.getElementById(targetID).innerHTML = html;
}


export function append(targetID, html){
    document.getElementById(targetID).innerHTML += html;
}