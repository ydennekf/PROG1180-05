import { ReportList } from "../Components/ReportList.js";
import { reportData } from "../Data/reportData.js";
import {ModifyNcrView} from "../Components/NcrFormView/ModifyNcrView.js";
import {employees} from "../Data/employeeData.js";


ModifyNcrView('root', employees[0], reportData[0])