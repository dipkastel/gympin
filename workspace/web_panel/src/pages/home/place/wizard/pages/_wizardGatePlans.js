import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import {Form, Modal} from "react-bootstrap";
import {Button, Grid, IconButton, Typography} from "@mui/material";
import {gates_add, gates_getByPlaceId} from "../../../../../network/api/gates.api";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Plans_add, Plans_delete, Plans_getByPlaceId, Plans_update} from "../../../../../network/api/plans.api";
import __wizardPlanDetails from "./gatePlans/__wizardPlanDetails";
import {AddCircle, CheckBox, ExpandLess, ExpandMore, FilterAlt, QuestionMark} from "@mui/icons-material";
import __wizardPlanGates from "./gatePlans/__wizardPlanGates";
import __wizardPlanSports from "./gatePlans/__wizardPlanSports";
import DeleteIcon from '@mui/icons-material/Delete';
import {defaultFilterFinance} from "../../../finance/_financeFilter";

const _wizardGatePlans = ({allowNext}) => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();
    const [placePlans, SetPlacePlans] = useState([])
    const [canGoNext, SetCanGoNext] = useState([])

    function checkDetails(plan) {
        return(
            plan.PlacePrice&&
            plan.ValuePrice&&
            plan.EntryTotalCount&&
            plan.Ticket_Capacity&&
            (plan.Expire_date||plan.Expire_duration)&&
            !!plan.Gender);
    }
    useEffect(() => {
        if(placePlans.length<1)return;
        var result = true;


        try{
            Object.keys(canGoNext).map(item=>{
                if(!checkDetails(placePlans.find(pp=>pp.Id==item))||!canGoNext[item].gate||!canGoNext[item].sport){
                    result = false;
                }
            });
        }catch (e){
            result = false;
        }
        allowNext(result);
    }, [canGoNext]);



    useEffect(() => {
        getPlansOfPlace()
    }, []);


    function createCanGoNext(Data) {
        var result = {} ;
        Data.map(e=>{
            result = {...result,[e.Id]:{gate:false,sport:false}}
        });
        SetCanGoNext(result);
    }

    function getPlansOfPlace() {
        Plans_getByPlaceId({Id:placeId}).then(data=>{
            SetPlacePlans(data.data.Data);
            createCanGoNext(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function addPlan(e) {
        e.preventDefault()
            if(!e.target.Name.value){
                error.showError({message: "ورود اطلاعات الزامی",});
                return;
            }
        Plans_add({Place:{Id:placeId},Name:e.target.Name.value,EntryTotalCount:1})
            .then(data=>{
                getPlansOfPlace()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        e.target.Name.value = "";
    }


    function deletePlan(e,plan) {
        e.preventDefault()
        Plans_delete({Id:plan.Id})
            .then(data=>{
                getPlansOfPlace()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function updatePlan(e,thisPlan){
        e.preventDefault();

        Plans_update(thisPlan).then(data => {
            getPlansOfPlace();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    return (
        <div className={"row"}>

            <div className={"col-md-4"}>
                <Portlet>
                    <PortletHeader
                        title={"افزودن پلن"}
                    />
                    <PortletBody>
                        <form onSubmit={(e) => addPlan(e)}>
                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام پلن"
                                />
                            </Form.Group>
                            <Button
                                variant={"contained"}
                                fullWidth
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </form>
                    </PortletBody>
                </Portlet>
            </div>
            {placePlans.map(plan=>(
                    <div key={"gate"+plan.Id} className={"col-md-4"}>
                        <Portlet>
                            <PortletHeader
                                title={plan.Name}

                                toolbar={<PortletHeaderToolbar>
                                    <IconButton aria-label="delete"
                                                color={"error"}
                                                onClick={(e) => deletePlan(e,plan)}>
                                        <DeleteIcon fontSize={"large"}/>
                                    </IconButton>
                                </PortletHeaderToolbar>}
                            />
                            <PortletBody>
                                <__wizardPlanDetails plan={plan} updatePlan={updatePlan} />
                                <__wizardPlanGates plan={plan} setCanGoNext={e=>SetCanGoNext({...canGoNext,[plan.Id]:{...canGoNext[plan.Id],"gate":e}})}/>
                                <__wizardPlanSports plan={plan} setCanGoNext={e=>SetCanGoNext({...canGoNext,[plan.Id]:{...canGoNext[plan.Id],"sport":e}})}/>
                            </PortletBody>
                        </Portlet>
                    </div>

            ))}
        </div>
    );












};

export default _wizardGatePlans;
