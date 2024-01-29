import React, {useContext, useEffect, useState} from 'react';
import {Card, CardHeader, Chip} from "@mui/material";
import {placeOption_getAll} from "../../network/api/placeOptions.api";
import {optionOfPlace_add, optionOfPlace_delete, optionOfPlace_getByPlaceId} from "../../network/api/optionOfPlace.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../components/GympinPagesProvider";
import getAccessOf from "../../helper/accessManager";
import {personnelAccessEnumT} from "../../helper/enums/personnelAccessEnum";
import AccessDenied from "../../components/AccessDenied";
import {
    placeSport_add,
    placeSport_delete,
    placeSport_getAll,
    placeSport_getSportsByPlace
} from "../../network/api/placeSport.api";
import {sport_getAll} from "../../network/api/sport.api";

const Sport = () => {
    const error = useContext(ErrorContext);

    const place = useSelector(({place}) => place.place)

    const [sports, SetSports] = useState([])
    const [placeSports, SetPlaceSports] = useState([])
    const [itemToProgress,SetItemToProgress] = useState(null);

    useEffect(() => {
        sport_getAll({size:100}).then(result => {
            SetSports(result.data.Data)
            console.log("sports",result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, []);
    useEffect(() => {
        getPlaceSports()
    }, []);

    if(!getAccessOf(personnelAccessEnumT.ManagementSports))
        return <AccessDenied/>;

    function getPlaceSports(){
        placeSport_getSportsByPlace({id: place.Id}).then(result => {
            SetPlaceSports(result.data.Data)
            SetItemToProgress(null);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function addPlaceSports(e,sport) {
        if(!!itemToProgress)return;
        SetItemToProgress(sport.Id);
        placeSport_add({
            Place: {
                Id: place.Id
            },
            sport: {
                Id: sport.Id
            }
        }).then(result=>{
            getPlaceSports()
        }).catch(e => {
            try {
                SetItemToProgress(null);
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function DeletePlaceSport(e,sport) {
        if(!!itemToProgress)return;
        SetItemToProgress(sport.Id);
        placeSport_delete({Id: sport.Id}).then(result=>{
            getPlaceSports()
        }).catch(e => {
            try {
                SetItemToProgress(null);
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
                    title={"مدیریت ورزش ها"}/>
            </Card>

            <div className={"container"}>
            <div className={"row"}>
                {placeSports.map(placeSport=>placeSport?.Id==itemToProgress?(
                    <Chip label={"لطفا صبر کنید"}  key={"placeSport"+placeSport?.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                ):(
                    <Chip label={placeSport?.sport?.Name}  key={"placeOption"+placeSport?.Id} sx={{m:1,width:"inherit"}} color={"success"} onClick={(e)=>DeletePlaceSport(e,placeSport)} />
                ))}
                {sports.filter(sport=>!placeSports.map(ps=>ps.sport.Id).includes(sport.Id)).map(sport=>sport.Id==itemToProgress?(
                    <Chip label={"لطفا صبر کنید"}  key={"placeSports"+sport.Id} sx={{m:1,width:"inherit"}} color={"warning"} />
                ):(
                    <Chip label={sport.Name} key={"option"+sport.Id} sx={{m:1,width:"inherit"}} onClick={(e)=>{addPlaceSports(e,sport)}} />
                ))}
            </div>
            </div>

        </>

    );
};
export default Sport;
