import axios from "axios";
import {Api_url} from "./NETWORKCONSTS";

export  function Report_useCorporateCharge(corporateId){
    return axios.get(Api_url.report.useCorporateCharge,{params:corporateId})
}


export  function Report_ticketBuyCountThisWeek(corporateId){
    return axios.get(Api_url.report.ticketBuyCountThisWeek,{params:corporateId})
}


export  function Report_getGenderCompetition(corporateId){
    return axios.get(Api_url.report.getGenderCompetition,{params:corporateId})
}

export  function Report_getPopularSports(corporateId){
    return axios.get(Api_url.report.getPopularSports,{params:corporateId})
}

export  function Report_getActivePersonnel(corporateId){
    return axios.get(Api_url.report.getActivePersonnel,{params:corporateId})
}



export  function Report_getActiveInEnterPlacePersonnel(corporateId){
    return axios.get(Api_url.report.getActiveInEnterPlacePersonnel,{params:corporateId})
}




export  function Report_getBalanceChangedReport(corporateId){
    return axios.get(Api_url.report.getBalanceChangedReport,{params:corporateId})
}



export  function Report_getAiReport(corporateId){
    return axios.get(Api_url.report.getAiReport,{params:corporateId})
}

