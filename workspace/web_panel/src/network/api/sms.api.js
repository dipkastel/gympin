import axios from "axios";
import {SmsApi, UserApi} from "./const_api";

//sms
export function sms_addSms(sms) {
  return axios.post(SmsApi.add, sms);
}
export function sms_deleteSms(sms) {
  return axios.put(SmsApi.delete,  sms )
}
export function sms_getAllSms() {
  return axios.get(SmsApi.getAll);
}
export function sms_query(data) {
  return axios.post(SmsApi.query, data);
}

export function sms_updatePattern(data) {
  return axios.post(SmsApi.updatePattern, data);
}

export function sms_AddPattern(data) {
  return axios.post(SmsApi.addPattern, data);
}

export function sms_getSmsById(sms) {
  return axios.get(SmsApi.getById, { params: sms });
}
export function sms_getAllPatterns() {
  return axios.get(SmsApi.getAllPatterns);
}
export function sms_updateSms(sms) {
  return axios.put(SmsApi.update, sms);
}

export function sms_ChangeStatus(data) {
  return axios.post(SmsApi.changeSmsStatus, data);
}
