import {encodeId, getStorage, randomSerialNum, setStorage} from "./utils";


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

const po_selected_theme = "po_selected_theme";

export function getSelectedTheme() {
    try {
        var result = getStorage(po_selected_theme);
        if (result)
            return result;
        else return "light";
    } catch (e) {
        return "light";
    }
}

export function setSelectedTheme(value) {
    setStorage(po_selected_theme, value);
}

const po_wizard_complete = "po_wizard_complete";

export function getWizardComplete() {
    try {
        var result = getStorage(po_wizard_complete);
        if (result == "true")
            return result;
        else return false;
    } catch (e) {
        return false;
    }
}

export function setWizardComplete(value) {
    setStorage(po_wizard_complete, value);
}

const po_wizard_level = "po_wizard_level";

export function getWizardLevel() {
    try {
        var result = getStorage(po_wizard_level);
        if (result) {
            return result;
        } else {
            return 1;
        }
    } catch (e) {
        return 1;
    }
}

export function setWizardLevel(value) {
    setStorage(po_wizard_level, value);
}
