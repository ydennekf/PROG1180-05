
import { handleLogin } from "../app.js";
import { bindLogin, createLogin } from "../Components/Login.js";
import { Page, PageContext } from "../Components/Page.js";



PageContext.init(createLogin());
bindLogin("loginForm", handleLogin)
