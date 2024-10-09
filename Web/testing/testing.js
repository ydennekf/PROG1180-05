import { ReportList } from "../Components/ReportList.js";
import { reportData } from "../Data/reportData.js";


document.getElementById('ncrView-root').innerHTML = ReportList({}, reportData)