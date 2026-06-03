import React, {useContext, useEffect, useState} from "react";
import {Button, FormControlLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {Location_query} from "../../../../../network/api/location.api";
import PlaceMap from "./PlaceMap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import _PlacePhones from "./_PlacePhones";

function PlaceBase({place, updatePlace}) {
    const error = useContext(ErrorContext);

    const [location, SetLocations] = useState(null)
    const [inPlace, SetInPlace] = useState(place)

    useEffect(() => {
        Location_query({
            queryType: "FILTER",
            Type: "REGION",
            paging: {Page: 0, Size: 1000}
        }).then(data => {
            SetInPlace(place);
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
        SetInPlace({...inPlace, [lable]: Value})
    }

    function submitForm() {
        updatePlace(inPlace)
    }

    function getLocationOptions() {
        return location ? location.map(o => {
            return {
                value: o.Id,
                label: o.Name
            }
        }) : []
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
                    <_PlacePhones
                        initialValue={inPlace.Tell}
                        onChange={(e) => setFormValues("Tell", e)}
                    />
                    <Form.Group>
                        <FormControlLabel
                            control={<Switch
                                defaultChecked={inPlace.CallUs}
                                onChange={(e) => setFormValues("CallUs", e.target.checked)}/>}
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
                            value={inPlace.ActiveTimes ? inPlace.ActiveTimes : ""}
                            onChange={(e) => setFormValues("ActiveTimes", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <PlaceMap place={inPlace} setFormValues={setFormValues}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>منطقه</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="react-select-single"
                            name="formState"
                            value={
                                inPlace.Location ? getLocationOptions().filter(option =>
                                    option.value === inPlace.Location.Id) : 0
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
                            value={inPlace.Address ? inPlace.Address : ""}
                            onChange={(e) => setFormValues("Address", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>تخفیف اتوماتیک</Form.Label>
                        <Switch
                            edge="end"
                            onChange={(e) => setFormValues("AutoDiscount", e.target.checked)}
                            checked={inPlace.AutoDiscount}
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
