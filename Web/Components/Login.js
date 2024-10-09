import { trapFocus } from "./utils/utils.js";

export let createLogin = (targetID, onLogin) => {

    
    let login =
        `
        <figure>
            <img src="company-logo.png" alt="Crossfire's company logo" id="companyLogo" />
        </figure>
        <form id="loginForm" action="#" method="post" aria-label="loginForm" role="form" class="">
            <fieldset>
                <legend id="loginFormLabel">Login</legend>

                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Username" required aria-required="true" aria-describedby="usernameHelp" />

                </div>

                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required aria-required="true" aria-describedby="passwordHelp" />

                </div>

                <div>
                    <button type="submit">Log In</button>
                </div>
            </fieldset>
        </form>
        <div>
            <p>forgot your password? <a href="#">Reset it here</a></p>
        </div>`;

    document.getElementById(targetID).innerHTML = login;
    let component = document.getElementById(targetID);
    trapFocus(component);

    document.getElementById('loginForm').addEventListener('submit', (event) => onLogin(event));

   
}