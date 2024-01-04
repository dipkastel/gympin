import React, {useContext, useEffect, useState} from "react";
import {Button, FormControlLabel, FormGroup, FormLabel, Switch, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader,} from "../../../../partials/content/Portlet";
import HallTrafficManagement from "./HallTrafficManage";
import {Location_query} from "../../../../../network/api/location.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";

function HallBase({hall,updateHall}){
    const error = useContext(ErrorContext);

    const [regions,SetRegions] = useState([])
    const [inHall,SetInHall] = useState(hall)

    useEffect(() => {
        Location_query({
            type:"REGION",
            paging:{Page:0,Size:10}
        }).then(data=>{
            SetRegions(data.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);

    function setFormValues(lable,Value){
        SetInHall({...inHall,[lable]:Value})
    }

    function submitForm(){
        updateHall(inHall)
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
                        title={"مشخصات " + hall.Name}
                    />

                    <PortletBody>

                        <TextField
                            id="standard-full-width"
                            label="نام سالن"
                            style={{ margin: 8 }}
                            placeholder="نام سالن"
                            value={inHall.Name}
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
                                checked={inHall.Enable}
                                onChange={(e)=>setFormValues("Enable",e.target.checked)}
                                control={<Switch
                                    value="gilad" />}
                                label="فعال"
                            />
                        </FormGroup>

                        <FormGroup>

                            <FormLabel component="legend">مدیریت ترافیک :</FormLabel>
                            <FormControlLabel
                                checked={inHall.TrafficManagement}
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
                {inHall.TrafficManagement&&<HallTrafficManagement hall={hall} />}
            </>
        );
}

export default HallBase;
