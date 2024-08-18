import {getStorage, setStorage} from "./storedData/useStorage";



const po_last_notif_id = "po_last_notif_id";

export function getLastNotifId() {
    try{
        var result = getStorage(po_last_notif_id);
        if(result){
            return result;
        }
        else{
            return 0;
        }
    }catch (e){
        return 0;
    }
}
export function setLastNotifId(value) {
    setStorage(po_last_notif_id,value);
}


const po_last_notif = "po_last_notif";

export function getLastNotif() {
    try{
        var result = getStorage(po_last_notif);
        if(result){
            return result;
        }
        else{
            return null;
        }
    }catch (e){
        return null;
    }
}
export function setLastNotif(value) {
    setLastNotifId(parseInt(getLastNotifId())+1);
    setStorage(po_last_notif,value);
}

