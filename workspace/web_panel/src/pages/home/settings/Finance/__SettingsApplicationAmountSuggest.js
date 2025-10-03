import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {Form, Modal} from "react-bootstrap";
import {Button, Chip, TableCell, TextField} from "@mui/material";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper";
import Select from "react-select";
import {ApplicationEnum} from "../../../../helper/enums/ApplicationEnum";
import {Suggest_add, Suggest_delete, Suggest_query, Suggest_update} from "../../../../network/api/suggest.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from "@mui/icons-material/Delete";

const __SettingsApplicationAmountSuggest = () => {

    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [suggest, setSuggest] = useState({})
    const [itemToEdit, setItemToEdit] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        getApplicationSuggests();
    }, []);


    function getApplicationSuggests() {
        Suggest_query({
            queryType: "FILTER",
            paging: {Page: 0, Size: 50, Desc: true}
        }).then((result) => {
            setSuggest(result.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }
    function renderModalAdd() {

        function addAmountSuggest(e) {
            e.preventDefault()
            if (e.target.amount.value < 100){
                error.showError({message: "حداقل مبلغ رعایت نشده",});
                return;
            }
            setOpenModalAdd(false);
            Suggest_add({
                Application:e.target.application.value,
                Amount:toPriceWithoutComma(e.target.amount.value),
                Priority:e.target.priority.value
            })
                .then((result) => {
                    getApplicationSuggests();
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
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addAmountSuggest(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن پیشنهاد قیمت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="اولویت"
                                type={"number"}
                                fullWidth
                                name="priority"
                                margin="normal"
                                defaultValue={0}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="standard-full-width"
                                label="مبلغ"
                                type={"text"}
                                name="amount"
                                defaultValue={0}
                                onChange={(e) => e.target.value = toPriceWithComma(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
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
                        </Modal.Body>
                        <Modal.Footer>
                            <Button sx={{m: 1}} variant={"contained"} color={"error"}
                                    onClick={() => setOpenModalAdd(false)}>
                                خیر
                            </Button>
                            <Button sx={{m: 1}} variant={"contained"} color={"secondary"} type={"submit"}>
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }
    function renderModalEdit(){
        if(!itemToEdit) return ;
        function EditItem(e) {
            e.preventDefault()
            setItemToEdit(null);
            Suggest_update({
                Id:itemToEdit.Id,
                Application:e.target.application.value,
                Amount:toPriceWithoutComma(e.target.amount.value),
                Priority:e.target.priority.value
            })
                .then((result) => {
                    getApplicationSuggests();
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
                <Modal show={itemToEdit} onHide={() => setItemToEdit(null)}>
                    <form onSubmit={(e) => EditItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش پیشنهاد قیمت "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="اولویت"
                                type={"number"}
                                fullWidth
                                name="priority"
                                margin="normal"
                                defaultValue={itemToEdit.Priority}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="standard-full-width"
                                label="مبلغ"
                                type={"text"}
                                name="amount"
                                defaultValue={toPriceWithComma(itemToEdit.Amount)}
                                onChange={(e) => e.target.value = toPriceWithComma(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Form.Group>
                                <Form.Label>اپلیکیشن</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    name="application"
                                    defaultValue={itemToEdit.Application}
                                    options={Object.keys(ApplicationEnum).map(g => {
                                        return {label: ApplicationEnum[g], value: g}
                                    })}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button sx={{m: 1}} variant={"contained"} color={"secondary"} type={"submit"}>
                                ویرایش
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
            Suggest_delete({
                Id: itemToDelete.Id,
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    getApplicationSuggests();
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
                            {itemToDelete && ("حذف " + itemToDelete.Amount)}
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
                    title="پیشنهادات قیمت اپلیکیشن ها"
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
                                <TableCell align="right">اولویت</TableCell>
                                <TableCell align="right">مبلغ</TableCell>
                                <TableCell align="right">اپلیکیشن</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {suggest.content && suggest.content.map(item => (
                                <TableRow key={"transaction-" + item.Id}>
                                    <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>
                                    <TableCell align="right" component="th" scope="row">{item.Priority}</TableCell>
                                    <TableCell align="right" component="th"
                                               scope="row">{toPriceWithComma(item.Amount || 0)}</TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Chip label= {ApplicationEnum[item.Application]}
                                              color={getStatusCollor(item)}/>
                                    </TableCell>
                                    <TableCell align="left" component="th" scope="row">
                                        <Button variant={"contained"} color={"secondary"} size={"small"}
                                                onClick={(e)=>setItemToEdit(item)}>ویرایش</Button>
                                        <DeleteIcon fontSize={"medium"} color={"error"} sx={{mx:1}}
                                                    onClick={(e) => setItemToDelete(item)}/>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </PortletBody>
            </Portlet>
            {renderModalAdd()}
            {renderModalEdit()}
            {renderModalDelete()}
        </>
    );
};

export default __SettingsApplicationAmountSuggest;
