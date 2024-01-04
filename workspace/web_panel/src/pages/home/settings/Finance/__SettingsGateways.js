import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Gateway_add, Gateway_query, Gateway_update, Gateway_updateImage} from "../../../../network/api/gateway.api";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Avatar, Button, Grid, TableCell, TextField, Tooltip, Typography} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper";
import {ApplicationEnum} from "../../../../helper/enums/ApplicationEnum";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import MessageIcon from '@mui/icons-material/Message';
import {Form, Modal} from "react-bootstrap";
import Select from "react-select";
import {GatewayType} from "../../../../helper/enums/GatewayType";
import ImagePicker from "../../media/Pickers/ImagePicker";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

//todo complete this add , update , delete
const __SettingsGateways = () => {

    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [gateways, setGateways] = useState({})
    const [itemToEdit, setItemToEdit] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [itemToChangeImage, setItemToChangeImage] = useState(null)
    const [expandAdd, setExpandAdd] = useState(false)
    const [expandEdit, setExpandEdit] = useState(false)


    useEffect(() => {
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

    function renderModalAdd() {
        function addAmountSuggest(e) {
            e.preventDefault()
            if (e.target.amount.value < 100) {
                error.showError({message: "حداقل مبلغ رعایت نشده",});
                return;
            }
            setOpenModalAdd(false);
            Gateway_add({
                Application: e.target.application.value,
                Amount: toPriceWithoutComma(e.target.amount.value),
                Priority: e.target.priority.value
            })
                .then((result) => {
                    getGateways();
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
                            <Modal.Title>{"افزودن درگاه جدید "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="نام"
                                type={"text"}
                                fullWidth
                                name="name"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Form.Group>
                                <Form.Label>type</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    name="type"
                                    options={Object.keys(GatewayType).map(g => {
                                        return {label: GatewayType[g], value: g}
                                    })}
                                />
                            </Form.Group>
                            <TextField
                                id="standard-full-width"
                                label="توضیح"
                                type={"text"}
                                fullWidth
                                multiline
                                rows="4"
                                name="description"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="پسورد"
                                type={"text"}
                                fullWidth
                                name="password"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="توکن"
                                type={"text"}
                                fullWidth
                                name="token"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="سریال"
                                type={"text"}
                                fullWidth
                                name="serial"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="دیتا 1"
                                type={"text"}
                                fullWidth
                                name="data1"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="دیتا 2"
                                type={"text"}
                                fullWidth
                                name="data2"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                label="دیتا 3"
                                type={"text"}
                                fullWidth
                                name="data3"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
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

    function renderModalEdit() {
        if (!itemToEdit) return;

        function EditItem(e) {
            e.preventDefault()
            setItemToEdit(null);
            console.log({
                Id:itemToEdit.Id,
                Name:e.target.name.value,
                GatewayType:e.target.type.value,
                Description:e.target.description.value,
                Password:e.target.password.value,
                Token:e.target.token.value,
                Serial:e.target.serial.value,
                Data1:e.target.data1.value,
                Data2:e.target.data2.value,
                Data3:e.target.data3.value,

            })
            Gateway_update({
                Id:itemToEdit.Id,
                Name:e.target.name.value,
                GatewayType:e.target.type.value,
                Description:e.target.description.value,
                Password:e.target.password.value,
                Token:e.target.token.value,
                Serial:e.target.serial.value,
                Data1:e.target.data1.value,
                Data2:e.target.data2.value,
                Data3:e.target.data3.value,

            }).then((result) => {
                     getGateways();
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
                <Modal show={itemToEdit} onHide={() => setItemToEdit(null)}>
                    <form onSubmit={(e) => EditItem(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش درگاه پرداخت"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField
                                id="standard-full-width"
                                label="نام"
                                type={"text"}
                                fullWidth
                                name="name"
                                defaultValue={itemToEdit.Name}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Form.Group>
                                <Form.Label>type</Form.Label>
                                <Select
                                    className={"dropdown"}
                                    name="type"
                                    defaultValue={{label: GatewayType[itemToEdit.GatewayType], value: itemToEdit.GatewayType}}
                                    options={Object.keys(GatewayType).map(g => {
                                        return {label: GatewayType[g], value: g}
                                    })}
                                />
                            </Form.Group>

                            <TextField
                                id="standard-full-width"
                                label="توضیح"
                                type={"text"}
                                fullWidth
                                multiline
                                rows="4"
                                defaultValue={itemToEdit.Description}
                                name="description"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Grid container direction={"row"} justifyContent={"space-between"} alignContent={"center"} onClick={(e)=>setExpandEdit(!expandEdit)}>
                                <Typography variant={"body1"}>
                                    پیشرفته
                                </Typography>
                                {!expandEdit?<ExpandMore/>:<ExpandLess/>}
                            </Grid>
                            <div hidden={!expandEdit}>
                                <TextField
                                    label="پسورد"
                                    type={"text"}
                                    fullWidth
                                    defaultValue={itemToEdit.Password}
                                    name="password"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="توکن"
                                    type={"text"}
                                    fullWidth
                                    defaultValue={itemToEdit.Token}
                                    name="token"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="سریال"
                                    type={"text"}
                                    fullWidth
                                    name="serial"
                                    margin="normal"
                                    defaultValue={itemToEdit.Serial}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="دیتا 1"
                                    type={"text"}
                                    fullWidth
                                    name="data1"
                                    defaultValue={itemToEdit.Data1}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="دیتا 2"
                                    type={"text"}
                                    fullWidth
                                    name="data2"
                                    margin="normal"
                                    defaultValue={itemToEdit.Data2}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="دیتا 3"
                                    type={"text"}
                                    fullWidth
                                    name="data3"
                                    margin="normal"
                                    defaultValue={itemToEdit.Data3}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button sx={{m: 1}} variant={"contained"} color={"secondary"} type={"submit"}>ویرایش</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    function renderModalDelete() {

        function DeleteItem(e) {
            e.preventDefault()
            // setItemToDelete(null)
            // Suggest_delete({
            //     Id: itemToDelete.Id,
            // })
            //     .then((data) => {
            //         error.showError({message: "عملیات موفق",});
            //         getApplicationSuggests();
            //     })
            //     .catch(e => {
            //         try {
            //             error.showError({message: e.response.data.Message,});
            //         } catch (f) {
            //             error.showError({message: "خطا نا مشخص",});
            //         }
            //     });
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

    function selectImage(image) {
        Gateway_updateImage({
            Id:itemToChangeImage.Id,
            ImageId: image.Id
        })
            .then(result => {
                getGateways();
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
        <>
            <Portlet>
                <PortletHeader
                    title="درگاه های پرداخت"
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
                                <TableCell align="right">image</TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">توضیح</TableCell>
                                <TableCell align="right">Advance</TableCell>
                                <TableCell align="left">action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {gateways.content && gateways.content.map(item => (
                                <TableRow key={"transaction-" + item.Id}>
                                    <TableCell align="right" component="th" scope="row">{item.Id}</TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Avatar alt="gatewayImage" src={(item.Image?.Url) ? (item.Image?.Url || "") : ""}
                                                onClick={(e)=>setItemToChangeImage(item)}
                                                sx={{width: 40, height: 40}}/>
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">{item.Name}</TableCell>
                                    <TableCell align="right" component="th"
                                               scope="row">{GatewayType[item.GatewayType]}</TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Tooltip title={item?.Description || ""} placement="top">{item?.Description ?
                                            <MessageIcon/> : <div></div>}</Tooltip>

                                    </TableCell>

                                    <TableCell align="right" component="th" scope="row">
                                        {(item.Password || item.Token || item.Serial || item.Data1 || item.Data2 || item.Data3) ?
                                            <DoneIcon color={"success"}/> : <RemoveDoneIcon color={"error"}/>
                                        }


                                    </TableCell>
                                    <TableCell align="left" component="th" scope="row">
                                        <Button variant={"contained"} color={"secondary"} size={"small"}
                                                onClick={(e) => setItemToEdit(item)}>ویرایش</Button>
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
            {renderModalEdit()}
            {renderModalDelete()}

            {!!itemToChangeImage && <ImagePicker
                setClose={() => setItemToChangeImage(null)}
                onSelect={selectImage}
                options={{rowCount: 6, isSingle: true, filters: {CategoryId: 4}}}/>}
        </>
    );
};

export default __SettingsGateways;
