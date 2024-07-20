import React, {useContext, useEffect, useState} from 'react';
import {Badge, Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import purchasedTypes from "../../../helper/data/purchasedTypes";
import getAccessOf from "../../../helper/accessManager";
import {useSelector} from "react-redux";
import {purchased_query} from "../../../network/api/purchased.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";


const SellsOfPlace = ({selectedSubscribe}) => {

    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [purchasedBase,setPurchasedBase] = useState([]);

    useEffect(() => {
        console.log(purchasedBase);
    },[purchasedBase]);

    useEffect(() => {
        purchased_query({
                queryType: "FILTER",
                PlaceId: place.Id,
                paging: {Page: 0, Size: 100, Desc: true}
            }).then((data) => {
                console.log(data.data.Data);
                setPurchasedBase(data.data.Data.content.filter(p=>p.Status!="READY_TO_ACTIVE").reduce(function(rv, x) {
                    (rv[x["PurchasedType"].toLowerCase()] = rv[x["PurchasedType"].toLowerCase()] || []).push(x);
                    return rv;
                }, {}))
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, []);



    return (
        <Grid className={"rtl"} container alignContent={"space-around"} justifyContent={"space-around"} direction={"row"}>
                {purchasedTypes.map(item=>(

                    <Grid hidden={!getAccessOf(item.Access)} key={item.Id} item xs={4}>
                        <Card onClick={(e)=>item.Status=="Active"?navigate(item.Destination, {replace: true}):{}}  sx={{m:1}} elevation={3}>
                            <CardContent className={"row"}>
                                <div className={"col-sm-12 col-md-6"}>
                                    <Badge badgeContent={purchasedBase[item?.Type?.toLowerCase()]?.length} color="primary">
                                        {item.Icon}
                                    </Badge>
                                </div>
                                <div className={"col-sm-12 col-md-6"}>
                                    <Typography variant={"subtitle2"} textAlign={"center"}>
                                        {item.Name}
                                    </Typography>
                                    <Typography variant={"caption"} component={"h6"} textAlign={"center"}>
                                        {item.Status=="Active"?"مدیریت":"به زودی"}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
    );
};

export default SellsOfPlace;
