import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export  function Report_useCorporateCharge(corporateId){
    return axios.get(Api_url.report.useCorporateCharge,{params:corporateId})
}

