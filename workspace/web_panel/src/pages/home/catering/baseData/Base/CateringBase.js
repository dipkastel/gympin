import React, {useContext, useEffect, useState} from "react";
import {Button, FormControlLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {Location_query} from "../../../../../network/api/location.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import CateringMap from "./CateringMap";

function CateringBase({catering, updateCatering}) {
    const error = useContext(ErrorContext);

    const [location, SetLocations] = useState(null)
    const [inCatering, SetInCatering] = useState(catering)

    useEffect(() => {
        Location_query({
            queryType:"FILTER",
            Type:"REGION",
            paging:{Page:0,Size:1000}
        }).then(data => {
            SetInCatering(catering);
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
        SetInCatering({...inCatering, [lable]: Value})
    }

    function submitForm() {
        updateCatering(inCatering)
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
                    title={"مکان " + catering.Name}
                />

                <PortletBody>


                    <Form.Group>

                        <TextField
                            id="standard-full-width"
                            label="نام مجموعه"
                            style={{margin: 8}}
                            placeholder="نام مجموعه"
                            value={inCatering.Name}
                            onChange={(e) => setFormValues("Name", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Form.Group>
                    <Form.Group>

                        <TextField
                            id="standard-full-width"
                            label="تلفن"
                            style={{margin: 8}}
                            placeholder="تلفن"
                            value={inCatering.Tell}
                            onChange={(e) => setFormValues("Tell", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Form.Group>
                        <Form.Group>
                            <FormControlLabel
                                control={<Switch
                                    defaultChecked={inCatering.CallUs}
                                    onChange={(e)=>setFormValues("CallUs",e.target.checked)} />}
                                label="تماس قبل از خرید"
                            />
                        </Form.Group>

                    <Form.Group>
                        <Form.Label>ساعات فعالیت مجموعه</Form.Label>
                        <textarea
                            className="form-control"
                            id="exampleTextarea"
                            rows="4"
                            name="formActiveTimes"
                            value={inCatering.ActiveTimes?inCatering.ActiveTimes:""}
                            onChange={(e) => setFormValues("ActiveTimes", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <CateringMap catering={inCatering} setFormValues={setFormValues}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>منطقه</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="react-select-single"
                            name="formState"
                            value={
                                inCatering.Location?getLocationOptions().filter(option =>
                                    option.value === inCatering.Location.Id):0
                            }
                            options={getLocationOptions()}
                            onChange={(e) => setFormValues("Location", {Id: e.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>آدرس کامل</Form.Label>
                        <textarea
                            className="form-control"
                            id="exampleTextarea"
                            rows="3"
                            name="formAddress"
                            value={inCatering.Address?inCatering.Address:""}
                            onChange={(e) => setFormValues("Address", e.target.value)}
                        />
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

export default CateringBase;
