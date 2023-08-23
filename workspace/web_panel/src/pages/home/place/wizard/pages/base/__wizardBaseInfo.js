import React, {useContext, useState} from 'react';
import {Portlet, PortletBody} from "../../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import Select from "react-select";
import {Button, TextField} from "@mui/material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import __ModalCalculator from "./__ModalCalculator";
import __wizardMap from "./__wizardMap";

const __wizardBaseInfo = ({inPlace, setInPlace, locations,updateInPlace}) => {
    const error = useContext(ErrorContext);
    const [openModalCalculator, setOpenModalCalculator] = useState(false);

    function getLocationOptions() {
        return locations ? locations.map(o => {
            return {
                value: o.Id,
                label: o.Name
            }
        }) : []
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6 col-xs-12">
                    <Portlet>
                        <PortletBody>
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
                                    onChange={(e) => setInPlace({...inPlace, Location: {Id: e.value}})}
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
                                    onChange={(e) => setInPlace({...inPlace, Address: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>کمیسیون</Form.Label>

                                <div className="row">
                                    <div className="col-md-8">
                                        <TextField
                                            id="standard-full-width"
                                            label="درصد کمیسیون"
                                            style={{margin: 8}}
                                            placeholder="0"
                                            value={inPlace.CommissionFee}
                                            type={"number"}
                                            onChange={(e) => setInPlace({...inPlace,CommissionFee: e.target.value})}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </div>
                                    <div className={"col-md-4"}>
                                        <Button
                                            fullWidth
                                            onClick={() => setOpenModalCalculator(true)}
                                            variant="contained"
                                            sx={{height: "80%"}}
                                            color={"success"}
                                            className={"button"}>
                                            محاسبه گر کمسیون
                                        </Button>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group>
                                <Button
                                    fullWidth
                                    onClick={() => updateInPlace()}
                                    variant="contained"
                                    color="primary"
                                    className={"button"}>
                                    ثبت
                                </Button>
                            </Form.Group>
                        </PortletBody>
                    </Portlet>
                </div>
                <div className="col-md-6  col-xs-12">
                    <__wizardMap  inPlace={inPlace} setInPlace={setInPlace} updateInPlace={updateInPlace}/>
                </div>
            </div>
            <__ModalCalculator inPlace={inPlace} setInPlace={setInPlace} openModalCalculator={openModalCalculator}
                               setOpenModalCalculator={setOpenModalCalculator} setCommision={(value)=>setInPlace({...inPlace, CommissionFee: value})}/>
        </>
    );
};

export default __wizardBaseInfo;
