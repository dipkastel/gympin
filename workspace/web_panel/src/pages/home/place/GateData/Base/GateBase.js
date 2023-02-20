import React, {useEffect, useState} from "react";
import {Button, FormControlLabel, FormGroup, FormLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import GateTrafficManagement from "./GateTrafficManage";
import {Location_query} from "../../../../../network/api/location.api";

function GateBase({gate,updateGate}){

    const [regions,SetRegions] = useState([])
    const [inGate,SetInGate] = useState(gate)

    useEffect(() => {
        Location_query({
            type:"REGION",
            paging:{Page:0,Size:10}
        }).then(data=>{
            SetRegions(data.data.Data)
        }).catch(e=>console.log(e))
    }, []);

    function setFormValues(lable,Value){
        SetInGate({...inGate,[lable]:Value})
    }

    function submitForm(){
        updateGate(inGate)
    }
    function getLocationOptions() {
       return regions.map(o=>{
            return {
            value: o.Id,
            label: o.City.State.Name+" - "+o.City.Name+" - "+o.Name

        }})
    }
    return (
            <>
                <Portlet>
                    <PortletHeader
                        title={"مشخصات " + gate.Name}
                    />

                    <PortletBody>

                        <TextField
                            id="standard-full-width"
                            label="نام گیت"
                            style={{ margin: 8 }}
                            placeholder="نام گیت"
                            value={inGate.Name}
                            onChange={(e)=>setFormValues("Name",e.target.value)}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormGroup>

                            <FormLabel component="legend">وضعیت :</FormLabel>
                            <FormControlLabel
                                checked={inGate.Enable}
                                onChange={(e)=>setFormValues("Enable",e.target.checked)}
                                control={<Switch
                                    value="gilad" />}
                                label="فعال"
                            />
                        </FormGroup>

                        <FormGroup>

                            <FormLabel component="legend">مدیریت ترافیک :</FormLabel>
                            <FormControlLabel
                                checked={inGate.TrafficManagement}
                                onChange={(e)=>setFormValues("TrafficManagement",e.target.checked)}
                                control={<Switch
                                    value="gilad" />}
                                label="فعال"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                fullWidth
                                onClick={()=>submitForm()}
                                variant="contained"
                                color="primary"
                                className={"button"}>
                                ثبت
                            </Button>
                        </FormGroup>
                    </PortletBody>
                </Portlet>
                {inGate.TrafficManagement&&<GateTrafficManagement gate={gate} />}
            </>
        );
}

export default GateBase;