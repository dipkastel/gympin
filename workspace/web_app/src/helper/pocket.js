import {getStorage, setStorage} from "./storedData/useStorage";
import {encodeId, randomSerialNum} from "./utils";


const po_driver_id = "po_driver_id";

export function getDriverId(userId) {
    try {
        var result = getStorage(po_driver_id);
        if (result)
            return result;
        else {
            if(userId)
                result = encodeId(userId);
            else{
                result = randomSerialNum();
            }
            setStorage(po_driver_id, result);
            return result;
        };
    } catch (e) {
        result = randomSerialNum();
        setStorage(po_driver_id, result);
        return result;
    }
}

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

