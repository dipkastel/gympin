import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip, Container, Grid2 as Grid, Typography} from "@mui/material";
import {placeOption_getAll} from "../../network/api/placeOptions.api";
import {optionOfPlace_add, optionOfPlace_delete, optionOfPlace_getByPlaceId} from "../../network/api/optionOfPlace.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {getWizardComplete} from "../../helper/pocket";
import SupportIcon from "@mui/icons-material/Support";
import _AddAbout from "../about/_AddAbout";
import _AboutItem from "../about/_AboutItem";

const Option = ({introCanGoNext}) => {
    const error = useContext(ErrorContext);

    const place = useSelector(({place}) => place.place)

    const [options, SetOptions] = useState([])
    const [placeOptions, SetPlaceOption] = useState([])
    const [itemToProgress,SetItemToProgress] = useState(null);
    const introMode=!getWizardComplete()

    useEffect(() => {
        document.title = 'مدیریت امکانات';
        placeOption_getAll({size:100}).then(result => {
            SetOptions(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);
    useEffect(() => {
        getPlaceOptions()
    }, []);

    if(!getAccessOf(personnelAccessEnumT.ManagementOptions))
        return <AccessDenied/>;

    function getPlaceOptions(){
        optionOfPlace_getByPlaceId({id: place?.Id}).then(result => {
            SetPlaceOption(result.data.Data)
            SetItemToProgress(null);
            try{ introCanGoNext(result.data.Data.length>0)}catch (e) {}

        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function addPlaceOption(e,option) {
        if(!!itemToProgress)return;
        SetItemToProgress(option.Id);
        optionOfPlace_add({
            Place: {
                Id: place.Id
            },
            PlaceOption: {
                Id: option.Id
            }
        }).then(result=>{
            getPlaceOptions()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function DeletePlaceOption(e,option) {
        if(!!itemToProgress)return;
        SetItemToProgress(option.Id);
        optionOfPlace_delete({Id: option.Id}).then(result=>{
            getPlaceOptions()
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }



    return (
        <>


            <Container>
                <title>مدیریت امکانات</title>
                <Grid container direction={"column"}>
                    <Grid sx={{p: 2}}>
                        <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                            <Grid container justifyContent={"space-between"}>
                                <Grid container direction={"row"}>
                                    <SupportIcon/>
                                    <Typography sx={{px: 1}}>{"مدیریت امکانات"}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid container columns={2} alignItems={"start"} sx={{p: 1}}>
                        <Grid sx={{p: 1}} size={{xs: 2, md: 2, lg: 2, xl: 2}}>
                            <Card sx={{ width: "100%"}} variant={"outlined"}>
                                <CardHeader
                                    title={"مدیریت امکانات"}/>
                                <CardContent >
                                    {placeOptions.map(option=>option.Id==itemToProgress?(
                                        <Chip label={"لطفا صبر کنید"}  key={"placeOption"+option.PlaceOption.Id} sx={{m:1,p:4,width:"inherit"}} color={"warning"} />
                                    ):(
                                        <Chip label={option.PlaceOption.Name}  key={"placeOption"+option.PlaceOption.Id} sx={{m:1,p:4,width:"inherit"}} color={"success"} onClick={(e)=>DeletePlaceOption(e,option)} />
                                    ))}
                                    {options.filter(op=>!placeOptions.map(po=>po.PlaceOption.Id).includes(op.Id)).map(option=>option.Id==itemToProgress?(
                                        <Chip label={"لطفا صبر کنید"}  key={"placeOption"+option.Id} sx={{m:1,p:4,width:"inherit"}} color={"warning"} />
                                    ):(
                                        <Chip label={option.Name} key={"option"+option.Id} sx={{m:1,p:4,width:"inherit"}} onClick={(e)=>{addPlaceOption(e,option)}} />
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </>

    );
};
export default Option;
