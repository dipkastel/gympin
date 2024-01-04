import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../../../partials/content/Portlet";
import {Button, Divider, Grid, Typography} from "@mui/material";
import {getUserFixedName} from "../../../../../../helper";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal} from "react-bootstrap";
import {
    purchasedSubscribe_acceptEnterRequested,
    purchasedSubscribe_addEnterRequest,
    purchasedSubscribe_addEnterToSubscribe,
    purchasedSubscribe_exitUserOfPlace
} from "../../../../../../network/api/purchasedSubscribes.api";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import DynamicFormIcon from '@mui/icons-material/DynamicForm';

const _SubscribeEntryList = ({subscribe, updatePage}) => {

    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [entryList, setEntryList] = useState(subscribe.EntryList);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalAddRequest, setOpenModalAddRequest] = useState(false)
    const [openModalAcceptRequest, setOpenModalAcceptRequest] = useState(false)
    const [itemToExit, setItemToExit] = useState(null)
    useEffect(() => {
        setEntryList(subscribe.EntryList)
    }, [subscribe]);

    function renderModalAdd() {
        function addEnterUser(e) {
            e.preventDefault();
            purchasedSubscribe_addEnterToSubscribe({
                Id: subscribe.Id,
                User: {Id: user.Id}
            }).then(result => {
                updatePage();
                setOpenModalAdd(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => addEnterUser(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن ورود کاربر به بلیط "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {subscribe && "آیا از ورود " + getUserFixedName(subscribe?.User) + " به مجموعه " + subscribe?.TicketSubscribe?.Place?.Name + " اطمینان دارید؟"}
                            </p>
                            <p>
                                {entryList?.length < 1 && "افزودن اولین ورود به منزله تسویه حساب با مرکز مربوطه می باشد"}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                                variant={"contained"}
                            >
                                ثبت ورود
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function renderModalAddRequest() {
        function addEnterRequestUser(e) {
            e.preventDefault();
            purchasedSubscribe_addEnterRequest({
                Id: subscribe.Id,
                User: {Id: user.Id}
            }).then(result => {
                updatePage();
                setOpenModalAddRequest(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }

        return (
            <>
                <Modal show={openModalAddRequest} onHide={() => setOpenModalAddRequest(false)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => addEnterRequestUser(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن درخواست ورود کاربر به بلیط "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {subscribe && "آیا از درخواست ورود " + getUserFixedName(subscribe?.User) + " به مجموعه " + subscribe?.TicketSubscribe?.Place?.Name + " اطمینان دارید؟"}
                            </p>
                            <p>
                                {entryList?.length < 1 && "اولین ورود نمی تواند درخواست باشد"}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                                variant={"contained"}
                            >
                                ثبت درخواست
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function renderModalAcceptRequest() {
        function AcceptRequestUser(e) {
            e.preventDefault();
            purchasedSubscribe_acceptEnterRequested({
                Id: subscribe.Id,
                User: {Id: user.Id}
            }).then(result => {
                updatePage();
                setOpenModalAcceptRequest(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }

        return (
            <>
                <Modal show={openModalAcceptRequest} onHide={() => setOpenModalAcceptRequest(false)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => AcceptRequestUser(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"تایید درخواست ورود کاربر به بلیط "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {subscribe && "آیا از ورود " + getUserFixedName(subscribe?.User) + " به مجموعه " + subscribe?.TicketSubscribe?.Place?.Name + " اطمینان دارید؟"}
                            </p>
                            <p>
                                {entryList?.length < 1 && "اولین ورود نمی تواند درخواست باشد"}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                                variant={"contained"}
                            >
                                ثبت تایید
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    function renderModalExit() {
        function exitEnterUser(e) {
            e.preventDefault();
            purchasedSubscribe_exitUserOfPlace({
                id: itemToExit.Id
            }).then(result => {
                setItemToExit(null);
                updatePage();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });


        }

        return (
            <>
                <Modal show={!!itemToExit} onHide={() => setItemToExit(null)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => exitEnterUser(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"خروج کاربر از مرکز"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                {subscribe && "آیا از خروج " + getUserFixedName(subscribe?.User) + " از مجموعه " + subscribe?.TicketSubscribe?.Place?.Name + " اطمینان دارید؟"}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                                variant={"contained"}
                            >
                                ثبت خروج
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <Portlet>
                <PortletHeader
                    title="ورود های کاربر"
                    toolbar={
                        <PortletHeaderToolbar>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAddRequest(true)}
                            >
                                <DynamicFormIcon/>
                            </button>
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => setOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
                        </PortletHeaderToolbar>
                    }
                />
                <PortletBody>
                    {entryList && entryList.map((item, Number) => (
                        <div key={Number}>
                            <Grid container direction="row" justifyContent={"space-between"}>
                                <Typography variant={"body2"} component={"span"}>
                                    {"ورود : " + new Date(item.EnterDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </Typography>
                                <Typography variant={"body2"} component={"span"}>
                                    {item.SubscribeEntryStatus=="REQUESTED"?<Button variant={"contained"} size={"small"} color={"warning"}
                                                                                     onClick={(e) => setOpenModalAcceptRequest(true)}>تایید ورود</Button>:
                                        (item.ExitDate? ("  خروج : " + new Date(item.ExitDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })) : (<Button variant={"contained"} size={"small"} color={"error"}
                                                   onClick={(e) => setItemToExit(item)}>خروج</Button>))}
                                </Typography>
                            </Grid>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="p"/>
                        </div>

                    ))}
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalAddRequest()}
            {renderModalAcceptRequest()}
            {renderModalExit()}
        </>

    );
};

export default _SubscribeEntryList;
