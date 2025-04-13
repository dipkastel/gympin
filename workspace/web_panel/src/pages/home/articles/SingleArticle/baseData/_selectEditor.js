import React, {useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {EditorsType} from "../../../../../helper/enums/EditorsType";
import {getSelectedEditor, SetSelectedEditor} from "../../../../../helper/pocket/pocket";


const _selectEditor = () => {

    const [userSelectedEditor,setUserSelectedEditor] = useState(getSelectedEditor())


    function updateEditor(value) {
        SetSelectedEditor(value);
        setUserSelectedEditor(value);
        window.location = window.location;
    }

    return (
        <>
            <Portlet >
                <PortletHeader
                    title={"انتخاب ویرایشگر"}
                />
                <PortletBody>
                    <InputLabel id="status-select-label">وضعیت</InputLabel>
                    <Select
                        label="status"
                        value={userSelectedEditor || "null"}
                        onChange={e => updateEditor(e.target.value)}
                    >
                        {Object.keys(EditorsType).map((item, number) => (
                            <MenuItem key={number} value={item}>{EditorsType[item]}</MenuItem>
                        ))}
                    </Select>
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _selectEditor;
