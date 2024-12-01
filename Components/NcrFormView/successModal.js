import { redirectHome } from "../../redirection/redirect.js";
import { createModal } from "../Modal.js";
export function RedirectWithSuccessModal(action, report){
    redirectHome()
    if(["Edit", "Create", "Save"].includes(action)){
        let msg = "Successfully ";
        if(action === "Create"){
            msg += "created report."
         
        }
        else if(action === "Edit" || action =="Save"){
            msg += "edited report " + report.ncrNumber
            
        }
        
        createModal('errorPanel', "Success", msg, 10000)
    }
}