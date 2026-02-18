import axios from "axios";
import { Api_url } from "../network/api/NETWORKCONSTS";

export function getHomeId(settings) {
  try {
    var userSetting = settings?.settings?.server?.UserSettings?.find(
      (s) => s.Key === "PLACE_HOME_PAGE_ID",
    )?.Value;
    if (userSetting && userSetting != "") return userSetting;
    var publicSettings = settings?.settings?.server?.Settings?.find(
      (s) => s.Key === "WEB_MASTER_HOMEPAGE_ID",
    )?.Value;
    if (publicSettings && publicSettings != "") return publicSettings;
    return 2;
  } catch (e) {
    return 2;
  }
}

export function getTax(settings) {
  try {
    var publicSettings = settings?.settings?.server?.Settings?.find(
      (s) => s.Key === "CORPORATE_GENERAL_TAX",
    )?.Value;
    if (publicSettings && publicSettings != "") return publicSettings;
    return 0;
  } catch (e) {
    return 0;
  }
}

export function getUserCanSetEnter(settings) {
  try {
    var publicSettings = settings?.settings?.server?.UserSettings?.find(
      (s) => s.Key === "PLACE_CAN_ENTER_USER",
    )?.Value;
    if (publicSettings && publicSettings != "") return publicSettings;
    return false;
  } catch (e) {
    return false;
  }
}


