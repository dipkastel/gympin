import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../../partials/content/Portlet";
import {Form} from "react-bootstrap";
import {Button, IconButton} from "@mui/material";
import {useParams} from "react-router-dom";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {
    TicketSubscribes_add,
    TicketSubscribes_delete,
    TicketSubscribes_getByPlace,
    TicketSubscribes_update
} from "../../../../../../../network/api/ticketSubscribes.api";
import __wizardTicketSubscribesDetails from "./__wizardTicketSubscribesDetails";
import __wizardTicketSubscribesHalls from "./__wizardTicketSubscribesHalls";
import __wizardTicketSubscribesSports from "./__wizardTicketSubscribesSports";
import DeleteIcon from '@mui/icons-material/Delete';
import __wizardTicketBuyableBeneficiary from "./__wizardTicketBuyableBeneficiary";

const _wizardSubscribe = () => {

    const error = useContext(ErrorContext);
    let {placeId} = useParams();
    const [placeTicketSubscribe, SetPlaceTicketSubscribe] = useState([])
    const [canGoNext, SetCanGoNext] = useState([])

    useEffect(() => {
        getTicketSubscribeOfPlace()
    }, []);

    function getTicketSubscribeOfPlace() {
        TicketSubscribes_getByPlace({Id: placeId}).then(data => {
            SetPlaceTicketSubscribe(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function addTicketSubscribe(e) {
        e.preventDefault()
        if (!e.target.Name.value) {
            error.showError({message: "ورود اطلاعات الزامی",});
            return;
        }
        TicketSubscribes_add({Place: {Id: placeId}, Name: e.target.Name.value, EntryTotalCount: 1})
            .then(data => {
                getTicketSubscribeOfPlace()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
        e.target.Name.value = "";
    }


    function deleteTicketSubscribe(e, ticketSubscribe) {
        e.preventDefault()
        TicketSubscribes_delete({Id: ticketSubscribe.Id})
            .then(data => {
                getTicketSubscribeOfPlace()
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function updateTicketSubscribe(e, ticketSubscribe) {
        e.preventDefault();

        TicketSubscribes_update(ticketSubscribe).then(data => {
            getTicketSubscribeOfPlace();
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
                        title={"افزودن عضویت"}
                    />
                    <PortletBody>
                        <form onSubmit={(e) => addTicketSubscribe(e)}>
                            <Form.Group controlId="formPlaceName">
                                <Form.Control
                                    name="Name"
                                    type="text"
                                    placeholder="نام عضویت"
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
            {placeTicketSubscribe.map(ticketSubscribe => (
                <div key={"ticketSubscribe" + ticketSubscribe.Id} className={"col-md-4"}>
                    <Portlet>
                        <PortletHeader
                            title={ticketSubscribe.Name}

                            toolbar={<PortletHeaderToolbar>
                                <IconButton aria-label="delete"
                                            color={"error"}
                                            onClick={(e) => deleteTicketSubscribe(e, ticketSubscribe)}>
                                    <DeleteIcon fontSize={"large"}/>
                                </IconButton>
                            </PortletHeaderToolbar>}
                        />
                        <PortletBody>
                            <__wizardTicketSubscribesDetails ticketSubscribe={ticketSubscribe}
                                                             updateTicketSubscribe={updateTicketSubscribe}/>
                            <__wizardTicketSubscribesHalls ticketSubscribe={ticketSubscribe} setCanGoNext={e => SetCanGoNext({
                                ...canGoNext,
                                [ticketSubscribe.Id]: {...canGoNext[ticketSubscribe.Id], "ticketSubscribe": e}
                            })}/>
                            <__wizardTicketSubscribesSports ticketSubscribe={ticketSubscribe} setCanGoNext={e => SetCanGoNext({
                                ...canGoNext,
                                [ticketSubscribe.Id]: {...canGoNext[ticketSubscribe.Id], "sport": e}
                            })}/>
                            <__wizardTicketBuyableBeneficiary ticketSubscribe={ticketSubscribe} setCanGoNext={e => SetCanGoNext({
                                ...canGoNext,
                                [ticketSubscribe.Id]: {...canGoNext[ticketSubscribe.Id], "sport": e}
                            })}/>
                        </PortletBody>
                    </Portlet>
                </div>

            ))}
        </div>
    );

};

export default _wizardSubscribe;
