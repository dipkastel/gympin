import axios from "axios";
import {ReportSettings} from "./const_api";

export function reportSettings_getAll(data) {
    return axios.get(ReportSettings.getAll,{params:data});
}

export function reportSettings_update(data) {
    return axios.put(ReportSettings.update, data);
}
