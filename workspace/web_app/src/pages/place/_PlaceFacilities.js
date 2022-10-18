import React from 'react';
import {Card, CardHeader, Chip, Grid} from "@mui/material";
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
const _PlaceFacilities = () => {
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
                    {data.map((item,number)=>(
                        <Chip key={number} sx={{padding:1,margin:1}} label={item.name} />
                    ))}
                </Grid>
            </Card>
        </div>
    );
};

export default _PlaceFacilities;
