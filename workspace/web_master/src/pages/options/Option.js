import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardHeader, Chip} from "@mui/material";
import Select from "react-select";
import _OptionItem from "./_OptionItem";
import {Form, Modal} from "react-bootstrap";
import {placeOption_getAll} from "../../network/api/placeOptions.api";
import {optionOfPlace_add, optionOfPlace_delete, optionOfPlace_getByPlaceId} from "../../network/api/optionOfPlace.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";

const Option = () => {
    const error = useContext(ErrorContext);

    const place = useSelector(({place}) => place.place)

    const [options, SetOptions] = useState([])
    const [placeOptions, SetPlaceOption] = useState([])
    const [itemToProgress,SetItemToProgress] = useState(null);

    useEffect(() => {
        placeOption_getAll().then(result => {
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
        optionOfPlace_getByPlaceId({id: place.Id}).then(result => {
            SetPlaceOption(result.data.Data)
            SetItemToProgress(null);
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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"مدیریت امکانات"}/>
            </Card>

            <div className={"container"}>
            <div className={"row"}>
                {placeOptions.map(option=>option.Id==itemToProgress?(
                    <Chip label={"لطفا صبر کنید"}  key={"placeOption"+option.PlaceOption.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                ):(
                    <Chip label={option.PlaceOption.Name}  key={"placeOption"+option.PlaceOption.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>DeletePlaceOption(e,option)} />
                ))}
                {options.filter(op=>!placeOptions.map(po=>po.PlaceOption.Id).includes(op.Id)).map(option=>option.Id==itemToProgress?(
                    <Chip label={"لطفا صبر کنید"}  key={"placeOption"+option.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                ):(
                    <Chip label={option.Name} key={"option"+option.Id} sx={{m:1,width:"inherit"}} onClick={(e)=>{addPlaceOption(e,option)}} />
                ))}
            </div>
            </div>

        </>

    );
};
export default Option;
