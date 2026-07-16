import React, {useContext, useEffect, useState} from "react";
import {Button, FormControlLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {Location_query} from "../../../../../network/api/location.api";
import CounselingMap from "./CounselingMap";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import _CounselingPhones from "./_CounselingPhones";

function CounselingBase({counseling, updateCounseling}) {
    const error = useContext(ErrorContext);

    const [location, SetLocations] = useState(null)
    const [inCounseling, SetInCounseling] = useState(counseling)

    useEffect(() => {
        Location_query({
            queryType: "FILTER",
            Type: "REGION",
            paging: {Page: 0, Size: 1000}
        }).then(data => {
            SetInCounseling(counseling);
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
        console.log(lable,Value);
        SetInCounseling({...inCounseling, [lable]: Value})
    }

    function submitForm() {
        updateCounseling(inCounseling)
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
                    title={counseling.Name}
                />

                <PortletBody>


                    <Form.Group>

                        <TextField
                            id="standard-full-width"
                            label="نام مشاور"
                            placeholder="نام مجموعه"
                            value={inCounseling.Name}
                            onChange={(e) => setFormValues("Name", e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Form.Group>
                    <_CounselingPhones
                        initialValue={inCounseling.Tell}
                        onChange={(e) => setFormValues("Tell", e)}
                    />
                    <Form.Group>
                        <FormControlLabel
                            control={<Switch
                                defaultChecked={inCounseling.CallUs}
                                onChange={(e) => setFormValues("CallUs", e.target.checked)}/>}
                            label="تماس قبل از خرید"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>ساعات فعالیت</Form.Label>
                        <textarea
                            className="form-control"
                            id="exampleTextarea"
                            rows="4"
                            name="formActiveTimes"
                            value={inCounseling.ActiveTimes ? inCounseling.ActiveTimes : ""}
                            onChange={(e) => setFormValues("ActiveTimes", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <CounselingMap counseling={inCounseling} setFormValues={setFormValues}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>منطقه</Form.Label>
                        <Select
                            className={"dropdown"}
                            inputId="react-select-single"
                            name="formState"
                            value={
                                inCounseling.Location ? getLocationOptions().filter(option =>
                                    option.value === inCounseling.Location.Id) : 0
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
                            value={inCounseling.Address ? inCounseling.Address : ""}
                            onChange={(e) => setFormValues("Address", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>تخفیف اتوماتیک</Form.Label>
                        <Switch
                            edge="end"
                            onChange={(e) => setFormValues("AutoDiscount", e.target.checked)}
                            checked={inCounseling.AutoDiscount}
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

export default CounselingBase;
