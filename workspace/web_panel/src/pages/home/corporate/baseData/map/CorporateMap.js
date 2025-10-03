import React, {useContext, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Location_query} from "../../../../../network/api/location.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import _CMap from "./_CMap";
import {corporate_update} from "../../../../../network/api/corporate.api";

function CorporateMap({corporate,pUpdatePage}) {
    const error = useContext(ErrorContext);

    const [location, SetLocations] = useState(null)
    const [inCorporate, SetInCorporate] = useState(corporate)
    useEffect(()=>{
        SetInCorporate(corporate);
    },pUpdatePage)

    useEffect(() => {
        Location_query({
            queryType:"FILTER",
            Type:"REGION",
            paging:{Page:0,Size:1000}
        }).then(data => {
            SetInCorporate(corporate);
            SetLocations(data.data.Data.content)
        }).catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
    }, []);

    function setFormValues(lable, Value) {
        SetInCorporate({...inCorporate, [lable]: Value})
    }

    function submitForm() {

        corporate_update(inCorporate).then(result => {
            pUpdatePage();
            error.showError({message: "عملیات موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getLocationOptions() {
       return location?location.map(o => {
            return {
                value: o.Id,
                label: o.Name
            }
        }):[]
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"مکان " + corporate.Name}
                />

                <PortletBody>


                    <Form.Group>
                        <_CMap corporate={inCorporate} setFormValues={setFormValues}/>
                    </Form.Group>


                    <Form.Group>
                        <Button
                            fullWidth
                            onClick={() => submitForm()}
                            variant="contained"
                            color="primary"
                            className={"button"}>
                            ثبت
                        </Button>
                    </Form.Group>
                </PortletBody>
            </Portlet>

        </>
    );
}

export default CorporateMap;
