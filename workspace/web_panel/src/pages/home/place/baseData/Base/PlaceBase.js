import React, {useEffect, useState} from "react";
import {Button, FormControlLabel, FormGroup, FormLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {Location_query} from "../../../../../network/api/location.api";
import PlaceMap from "./PlaceMap";

function PlaceBase({place, updatePlace}) {

    const [location, SetLocations] = useState(null)
    const [inPlace, SetInPlace] = useState(place)

    useEffect(() => {
        Location_query({
            queryType:"FILTER",
            Type:"REGION",
            paging:{Page:0,Size:1000}
        }).then(data => {
            SetInPlace(place);
            SetLocations(data.data.Data.content)
        }).catch(e => console.log(e))
    }, []);

    function setFormValues(lable, Value) {
        console.log(lable, Value)
        SetInPlace({...inPlace, [lable]: Value})
    }

    function submitForm() {
        console.log(inPlace)
        updatePlace(inPlace)
    }

    function getLocationOptions() {
       return location?location.map(o => {
            return {
                value: o.Id,
                label: o.Name
            }
        }):[]
    }

    function getStatusOptions() {
        return [
            {value: "ACTIVE", label: "فعال"},
            {value: "INACTIVE", label: "غیر فعال"},
            {value: "PREREGISTER", label: "پیش ثبت نام"}
        ]
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title={"مکان " + place.Name}
                />

                <PortletBody>


                    <Form.Group>

                        <TextField
                            id="standard-full-width"
                            label="نام مجموعه"
                            style={{margin: 8}}
                            placeholder="نام مجموعه"
                            value={inPlace.Name}
                            onChange={(e) => setFormValues("Name", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <PlaceMap place={inPlace} setFormValues={setFormValues}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>وضعیت</Form.Label>
                        <Select
                            className={"dropdown"}
                            name="formStatus"
                            value={
                                getStatusOptions().filter(option =>
                                    option.value === inPlace.Status)
                            }
                            options={getStatusOptions()}
                            onChange={(e) => setFormValues("Status",  e.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>منطقه</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="react-select-single"
                            name="formState"
                            value={
                                inPlace.Location?getLocationOptions().filter(option =>
                                    option.value === inPlace.Location.Id):0
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
                            value={inPlace.Address}
                            onChange={(e) => setFormValues("Address", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>کمیسیون</Form.Label>
                        <TextField
                            id="standard-full-width"
                            label="درصد کمیسیون"
                            style={{margin: 8}}
                            placeholder="0"
                            value={inPlace.CommissionFee}
                            type={"number"}
                            onChange={(e) => setFormValues("CommissionFee", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
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

export default PlaceBase;