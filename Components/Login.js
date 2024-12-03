import { trapFocus } from "./utils/utils.js";

export let  createLogin = (targetID, onLogin) => {

    
    let login =
        `
        
            <form id="loginForm" action="#" method="post" aria-label="loginForm"  class="login-form">
                <div class="col-1 input-effect">
                    <div class="input-wrapper">
                        <input type="text" id="username" name="username" required aria-required="true" tabindex="2" class="effect-1"/>
                        <label for="username">Username</label>
                        <span class="focus-border"></span>
                    </div>
                    <div class="input-wrapper">
                        <input type="password" id="password" name="password" required aria-required="true" tabindex="2" class="effect-1"/>
                        <label for="password">Password</label>
                        <span class="focus-border"></span>
                    </div>
                    <div class="remember-me">
                        <input type="checkbox" id="rememberMe">
                        <label for="rememberMe">Remember Me</label>
                    </div>
                </div>
                <div class="login-btn-container">
                    <button type="submit" class="login-btn">LOG IN</button>
                </div>
                <div class="forgot-password">
                <a href="#">Forgot Password?</a>
            </div>  
            </form>
            `;
    document.getElementById(targetID).className.replace()
    document.getElementById(targetID).innerHTML = login;
    let component = document.getElementById(targetID);
    trapFocus(component);
    document.querySelectorAll('.effect-1').forEach(input => {
        input.addEventListener('input', () => {
            if(input.value.trim() !== ''){
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => onLogin(event));
    

   
}
