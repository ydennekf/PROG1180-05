import { trapFocus } from "./utils/utils.js";

export let createLogin = (targetID, onLogin) => {

    
    let login =
        `
        <figure>
            
            <h2>Cross Fire</h2>
        </figure>
        <form id="loginForm" action="#" method="post" aria-label="loginForm" role="form" class="login-form">
            <div class="col-1 input-effect">
                

                <div class="input-wrapper">
                    <input type="text" id="username" name="username" required aria-required="true" aria-describedby="usernameHelp" tabindex="2" class="effect-1"/>
                    <label for="username">Username</label>
                    <span class="focus-border"></span>

                </div>

                <div class="input-wrapper">
                    
                    <input type="password" id="password" name="password" required aria-required="true" aria-describedby="passwordHelp" tabindex="2" class="effect-1"/>
                    <label for="password">Password</label>
                    <span class="focus-border"></span>

                </div>
                <div class="remember-me">
                        <input type="checkbox" id="rememberMe">
                        <label for="rememberMe">Remember Me</label>
                    </div>
                <div>
                    <button type="submit" class="login-btn">LOG IN</button>
                </div>
          </div>  
        </form>
        <div class="forgot-password">
            <a href="#">Forgot Password?</a>
        </div>`;
    document.getElementById(targetID).className.replace()
    document.getElementById(targetID).innerHTML = login;
    let component = document.getElementById(targetID);
    trapFocus(component);

    document.getElementById('loginForm').addEventListener('submit', (event) => onLogin(event));

   
}