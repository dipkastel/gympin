import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Form, Modal} from "react-bootstrap";
import {Button, Chip, FormControlLabel, FormGroup, FormLabel, Switch, TableCell, TextField} from "@mui/material";
import Select from "react-select";
import {ApplicationEnum} from "../../../../helper/enums/ApplicationEnum";
import {
    GatewayApplication_add,
    GatewayApplication_delete,
    GatewayApplication_query
} from "../../../../network/api/gatewayApplication.api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import {Gateway_query} from "../../../../network/api/gateway.api";

const __SettingsApplicationGateways = () => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [gatewayApplication, setGatewayApplication] = useState({})
    const [gateways, setGateways] = useState({})
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        getApplicationGateways();
        getGateways();
    }, []);

    function getGateways() {
        Gateway_query({
            queryType: "FILTER",
            paging: {Page: 0, Size: 50, Desc: true}
        }).then((result) => {
            setGateways(result.data.Data);
        }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function getApplicationGateways() {
        GatewayApplication_query({
            queryType: "FILTER",
            paging: {Page: 0, Size: 50, Desc: true}
        }).then((result) => {
            setGatewayApplication(result.data.Data);
        }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function renderModalAdd() {

        function addApplicationGateway(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            GatewayApplication_add({
                Application: e.target.application.value,
                Gateway: {Id:e.target.gateway.value},
                IsDefault: e.target.default.checked
            }).then((result) => {
                getApplicationGateways();
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
                    <form onSubmit={(e) => addApplicationGateway(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن درگاه به اپلیکیشن"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>اپلیکیشن</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    name="application"
                                    options={Object.keys(ApplicationEnum).map(g => {
                                        return {label: ApplicationEnum[g], value: g}
                                    })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>درگاه</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    name="gateway"
                                    options={gateways.content&&gateways.content.map(g => {
                                        return {label: g.Name, value: g.Id}
                                    })}
                                />
                            </Form.Group>

                            <FormGroup>
                                <FormLabel component="legend">پیشفرض :</FormLabel>
                                <FormControlLabel
                                    name={"default"}
                                    control={<Switch
                                        value="gilad" />}
                                    label="فعال"
                                />
                            </FormGroup>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button sx={{m: 1}} variant={"contained"} color={"secondary"} type={"submit"}>
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            setItemToDelete(null)
            GatewayApplication_delete({
                Id: itemToDelete.Id,
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    getApplicationGateways();
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={itemToDelete} onHide={() => setItemToDelete(null)}>
                    <form onSubmit={(e) => DeleteItem(e)}>


                        <Modal.Header closeButton>
                            <Modal.Title>{"حذف پیشنهاد"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {itemToDelete && ("حذف " + itemToDelete.Gateway.Name)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"error"}
                            >
                                حذف
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function getStatusCollor(row) {
        switch (row.Application) {
            case "ANDROID":
                return "secondary";
            case "IOS":
                return "primary";
            case "WEBPANEL":
                return "error";
            case "WEBAPP":
                return "info";
            case "WEBMASTER":
                return "success";
            case "WEBCORPORATE":
                return "default";

        }
    }

    return (<>

            <Portlet>
                <PortletHeader
                    title="درگاه های اپلیکیشن ها"
                    toolbar={
                        <PortletHeaderToolbar>
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

                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">اپلیکیشن</TableCell>
                                <TableCell align="right">درگاه</TableCell>
                                <TableCell align="right">default</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {gatewayApplication.content && gatewayApplication.content.map(item => (
                                <TableRow key={"transaction-" + item.Id}>
                                    <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>

                                    <TableCell align="right" component="th" scope="row">
                                        <Chip label={ApplicationEnum[item.Application]}
                                              color={getStatusCollor(item)}/>
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">{item.Gateway.Name}</TableCell>
                                    <TableCell align="right" component="th" scope="row">{item.IsDefault && <DoneIcon color={"success"}/>}</TableCell>
                                    <TableCell align="left" component="th" scope="row">
                                        <DeleteIcon fontSize={"medium"} color={"error"} sx={{mx: 1}}
                                                    onClick={(e) => setItemToDelete(item)}/>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalDelete()}
        </>
    );
};

export default __SettingsApplicationGateways;
