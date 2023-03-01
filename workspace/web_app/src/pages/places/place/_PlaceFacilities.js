import React, {useEffect, useState} from 'react';
import {Card, CardHeader, Chip, Grid} from "@mui/material";
import {PlaceOptions_getByPlace} from "../../../network/api/placeOptions.api";

const data = [{
    name:"دوش"
},{
    name:"کمد(locker)"
},{
    name:"سشوار"
},{
    name:"آب سردکن"
},{
    name:"مربی"
},{
    name:"ماساژ"
}]
const _PlaceFacilities = ({place}) => {

    const [placeOptions,SetPlaceOptions] = useState([])
    useEffect(() => {
        PlaceOptions_getByPlace({Id:place.Id}).then(result=>{
            SetPlaceOptions(result.data.Data)
        }).catch(e=>console.log(e))
    }, [place]);


    return (
        <div className={"nopadding"}>
            <Card elevation={3} sx={{margin: 1, padding: 1}}>
                <CardHeader
                    title="امکانات مجموعه"
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    {placeOptions.map((item,number)=>(
                        <Chip key={number} sx={{padding:1,margin:1}} label={item.PlaceOption.Name} />
                    ))}
                </Grid>
            </Card>
        </div>
    );
};

export default _PlaceFacilities;
