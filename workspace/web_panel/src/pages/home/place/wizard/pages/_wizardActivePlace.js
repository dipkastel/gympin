import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Button, Typography} from "@mui/material";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory, useParams} from "react-router-dom";
import {place_changeStatus, Place_getPlaceById} from "../../../../../network/api/place.api";

const _wizardActivePlace = ({allowNext}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [inPlace, SetInPlace] = useState(null)



    useEffect(() => {
        getPlace(placeId);
    }, []);

    useEffect(() => {
        allowNext(inPlace&&inPlace.Status=="ACTIVE");
    }, [inPlace]);

    function getPlace(placeId){
        Place_getPlaceById({id:placeId}).then(result=>{
            SetInPlace(result.data.Data);
            console.log(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function ActivePlace(e) {
        e.preventDefault();
        if(inPlace){
            place_changeStatus({
                Id:inPlace.Id,
                Status:"ACTIVE"
            }).then(result=>{
                SetInPlace(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={"افزودن پلن"}
                />
                <PortletBody>
                    {(inPlace&&inPlace.Status=="ACTIVE")?(<>
                            <Typography variant={"h4"} align={"center"} sx={{m:2}} >مرکز فعال است</Typography>
                        <div className={"row"}>
                            <div className={"col-md-6"}>

                                <Button
                                    sx={{height:50}}
                                    variant={"contained"}
                                    size={"large"}
                                    color={"primary"}
                                    fullWidth
                                    href="/place/wizard/0"
                                >
                                    ثبت مرکز جدید
                                </Button>
                            </div>
                            <div className={"col-md-6"}>
                                <Button
                                    sx={{height:50}}
                                    variant={"contained"}
                                    size={"large"}
                                    color={"secondary"}
                                    fullWidth
                                    href={"/place/data/"+placeId}
                                >
                                    برو به مرکز
                                </Button>
                            </div>
                        </div>
                    </>):(<Button
                            sx={{height:80,fontSize:25}}
                            variant={"contained"}
                            size={"large"}
                            color={"success"}
                            fullWidth
                            onClick={(e)=>ActivePlace(e)}
                        >
                            فعالسازی
                        </Button>)}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default _wizardActivePlace;