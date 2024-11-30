import {getStorage, setStorage} from "./utils";


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
