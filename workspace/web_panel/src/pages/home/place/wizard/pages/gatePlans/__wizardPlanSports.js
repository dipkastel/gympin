import React, {useContext, useEffect, useState} from 'react';
import {Box, Chip, Collapse, Grid, IconButton, Typography} from "@mui/material";
import {AddCircle, CheckBox, ExpandLess, ExpandMore, QuestionMark} from "@mui/icons-material";
import {placeSport_getSportsByPlace} from "../../../../../../network/api/placeSport.api";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {Plans_addSport, Plans_deleteSport, Plans_getPlanSports} from "../../../../../../network/api/plans.api";

const __wizardPlanSports = ({plan,setCanGoNext}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();

    const [sportsComplete,setSportsComplete] = useState(false)
    const [openCollapsableSports,setOpenCollapsableSports] = useState(false)
    const [placeSports,setPlaceSports] = useState([])
    const [planSports,setPlanSports] = useState([])



    useEffect(() => {
        if(openCollapsableSports)
            getPlaceSports()
    }, [openCollapsableSports]);




    function getPlanSports() {
        Plans_getPlanSports({PlanId: plan.Id}).then(data => {
            setPlanSports(data.data.Data);

            setSportsComplete(data.data.Data.length>0);
            setCanGoNext(data.data.Data.length>0)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function getPlaceSports() {
        placeSport_getSportsByPlace({Id: placeId})
            .then((data) => {
                setPlaceSports(data.data.Data)
                getPlanSports();
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function ToggleSport(e, placeSport, planSports) {
        console.log({Plan: {Id: plan.Id}, SportPlace: Array.of(placeSport.Id)})
        if(!planSports){
            Plans_addSport({Plan: {Id: plan.Id}, SportPlace: Array.of({Id:placeSport.Id})})
                .then(data => {
                    getPlaceSports()
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }else{
            Plans_deleteSport({Plan:{Id: plan.Id},SportPlace:[{Id:planSports.Id}]})
                .then(data => {
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
        <>

            <Grid container alignItems={"center"} justifyContent={"space-between"} direction={"row"}
            >
                <Grid item onClick={() => setOpenCollapsableSports(!openCollapsableSports)} >
                    <Typography variant={"subtitle1"}>ورزش ها</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                        {!sportsComplete?<QuestionMark color={"warning"} />:<CheckBox color="success"/>}
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenCollapsableSports(!openCollapsableSports)}>
                        {!openCollapsableSports ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </Grid>
            </Grid>

            <Collapse in={openCollapsableSports} timeout="auto" unmountOnExit>

                <Box>
                    {placeSports.map((placeSport =>
                            <Chip key={"sport" + placeSport.Id} label={placeSport.sport.Name} sx={{margin: 1}}
                                  color={planSports.map(ps=>ps.sport.Id).includes(placeSport.sport.Id)?"success":"default" }
                                  onClick={(e)=>ToggleSport(e,placeSport,planSports.find(p=>p.sport.Id==placeSport.sport.Id))}
                            />
                    ))}
                </Box>

            </Collapse>
        </>
    );
};

export default __wizardPlanSports;
