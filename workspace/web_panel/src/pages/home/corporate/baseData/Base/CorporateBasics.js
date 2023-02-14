import React from "react";
import {Portlet, PortletBody, PortletFooter, PortletHeader,} from "../../../../partials/content/Portlet";
import {TextField} from "@mui/material";
import {corporate_update} from "../../../../../network/api/corporate.api";
import {Form} from "react-bootstrap";
import Select from "react-select";

export default function CorporateBasics({currentCorporate}) {
    const [values, setValues] = React.useState(currentCorporate);
    const handleChange = (name) => (event) => {
        console.log(values);
        setValues({...values, [name]: event.target.value});
    };

    function ChangeCorporateBaseData() {
        corporate_update(values).then(result => {
            console.log(result);
        }).catch(e => console.log(e))
    }


    return (
        <Portlet>
            <PortletHeader title="اطلاعات اولیه"/>

            <PortletBody>

                    <Form.Group>

                    <TextField
                        label="نام"
                        className="textField"
                        value={values.Name || ""}
                        onChange={handleChange("Name")}
                        margin="normal"
                        variant="outlined"
                    />
                    </Form.Group>

                    <Form.Group>

                    <TextField
                        label="آدرس"
                        className="textField"
                        value={values.Address || ""}
                        multiline
                        minRows={3}
                        onChange={handleChange("Address")}
                        margin="normal"
                        variant="outlined"
                    />
                    </Form.Group>
            </PortletBody>
            <PortletFooter>
                <div className="text-right">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm "
                        onClick={ChangeCorporateBaseData}
                    >
                        ویرایش
                    </button>
                </div>
            </PortletFooter>
        </Portlet>
    );
}
