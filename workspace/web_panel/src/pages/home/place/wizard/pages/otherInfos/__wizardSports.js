import React, {useContext, useEffect, useState} from 'react';
import {Box, Chip} from "@mui/material";
import {Portlet, PortletBody, PortletHeader} from "../../../../../partials/content/Portlet";
import {useParams} from "react-router-dom";
import {placeSport_add, placeSport_delete, placeSport_getSportsByPlace} from "../../../../../../network/api/placeSport.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {sport_query} from "../../../../../../network/api/sport.api";

const __wizardSports = ({setAllowNextSport}) => {
    const error = useContext(ErrorContext);

    const [placeSports, setPlaceSports] = useState([])
    const [sports, setSports] = useState([])

    let {placeId} = useParams();


    useEffect(() => {
        getPlaceSports();
    }, []);

    function getPlaceSports() {
        placeSport_getSportsByPlace({Id: placeId})
            .then((data) => {
                setPlaceSports(data.data.Data)
                setAllowNextSport(data.data.Data.length>0)
                getAllSports();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getAllSports() {
        sport_query({
            queryType: "FILTER",
            paging: {Page: 0, Size: 150,orderBy:"Name", Desc: false}
        })
            .then((data) => {
                setSports(data.data.Data.content)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function ToggleSport(e, sport,itemToDelete) {
        if(!itemToDelete){
            placeSport_add({place:{Id:placeId},sport:{Id:sport.Id}})
                .then(data=>{
                    getPlaceSports();
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }else{
            placeSport_delete({Id:itemToDelete.Id}).then(data=>{
                getPlaceSports()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
    }

    return (
        <div className={"col-md-6"}>
            <Portlet>

                <PortletHeader
                    title="ورزش ها"
                />
                <PortletBody>
                    <Box>
                        {sports.map((sport =>
                                <Chip key={"sport" + sport.Id} label={sport.Name} sx={{margin: 1}}
                                      color={placeSports.map(ps=>ps.sport.Id).includes(sport.Id)?"success":"default" }
                                      onClick={(e)=>ToggleSport(e,sport,placeSports.find(p=>p.sport.Id==sport.Id))}
                                />
                        ))}
                    </Box>
                </PortletBody>
            </Portlet>
        </div>
    );
};

export default __wizardSports;
