import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {Form, Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {SmsTypes} from "../../../../helper/enums/SmsTypes";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {sms_AddPattern, sms_getAllPatterns, sms_updatePattern} from "../../../../network/api/sms.api";
import AddIcon from "@mui/icons-material/Add";

const __SettingSmsPattern = ({updatePage}) => {

    const error = useContext(ErrorContext);

    const [patterns, setPatterns] = useState([]);
    const [itemToAdd, setItemToAdd] = useState({});
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        getAllPatterns();
    }, []);


    function getAllPatterns() {
        sms_getAllPatterns().then(result => {
            setPatterns(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function renderModalEdit() {
        function UpdatePattern(e) {
            e.preventDefault()
            sms_updatePattern(itemToEdit)
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    setItemToEdit(null)
                    getAllPatterns();
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        function setFormValues(lable,Value){
            setItemToEdit({...itemToEdit,[lable]:Value})
        }

        return (
            <>

                <Modal show={itemToEdit!=null} onHide={() => setItemToEdit(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"ویرایش یادداشت جایگزین qr"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form.Group>
                            <Form.Label>نام پترن</Form.Label>
                            <Form.Control
                                name="Name"
                                type="text"
                                placeholder="نام"
                                value={itemToEdit?.Name||""}
                                onChange={(e)=>setFormValues("Name",e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>کد پترن</Form.Label>
                            <Form.Control
                                name="PatternCode"
                                type="text"
                                placeholder="کد پترن"
                                value={itemToEdit?.PatternCode}
                                onChange={(e)=>setFormValues("PatternCode",e.target.value)}
                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>کلید پترن</Form.Label>
                            <Form.Control
                                name="PatternKey"
                                type="text"
                                placeholder="کلید"
                                value={itemToEdit?.PatternKey}
                                onChange={(e)=>setFormValues("PatternKey",e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>

                            <FormControl fullWidth>
                                <InputLabel id="status-select-label">سرویس دهنده</InputLabel>
                                <Select
                                    label="سرویس دهنده"
                                    value={itemToEdit?.Provider || ""}
                                >
                                    <MenuItem value={"FARAZ"}>فراز</MenuItem>
                                </Select>
                            </FormControl>
                        </Form.Group>
                        <Form.Group>
                            <FormControl fullWidth>
                                <InputLabel id="status-select-label">نوع پیامک</InputLabel>
                                <Select
                                    label="نوع پیامک"
                                    value={itemToEdit?.SmsType || ""}
                                    onChange={e => setFormValues("SmsType",e.target.value)}
                                >
                                    {Object.keys(SmsTypes).map((item, number) => (
                                        <MenuItem key={number} value={item}>{SmsTypes[item]}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Form.Group>

                        <Form.Group>
                            <TextField
                                id="standard-full-width"
                                label="متن"
                                value={itemToEdit?.Template || ""}
                                type={"Text"}
                                multiline
                                minRows={3}
                                onChange={(e) => setFormValues("Template", e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>تاخیر در ارسال</Form.Label>
                            <Form.Control
                                name="PatternKey"
                                type="number"
                                placeholder="تاخیر در ارسال"
                                value={itemToEdit?.DelayInMin}
                                onChange={(e)=>setFormValues("DelayInMin",e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            className={"button_edit"}
                            onClick={() => setItemToEdit(null)}
                        >
                            خیر
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"success"}
                            className={"button_danger"}
                            onClick={e=>UpdatePattern(e)}
                        >
                            ویرایش
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    function renderModalAdd() {
        function addPattern(e) {
            e.preventDefault()
            sms_AddPattern(itemToAdd)
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    getAllPatterns();
                    setOpenModalAdd(false);
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        function setFormValues(lable,Value){
            setItemToAdd({...itemToAdd,[lable]:Value})
        }

        return (
            <>

                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"ویرایش یادداشت جایگزین qr"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group>
                            <Form.Label>نام پترن</Form.Label>
                            <Form.Control
                                name="Name"
                                type="text"
                                placeholder="نام"
                                value={itemToAdd?.Name||""}
                                onChange={(e)=>setFormValues("Name",e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>کد پترن</Form.Label>
                            <Form.Control
                                name="PatternCode"
                                type="text"
                                placeholder="کد پترن"
                                value={itemToAdd?.PatternCode}
                                onChange={(e)=>setFormValues("PatternCode",e.target.value)}
                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>کلید پترن</Form.Label>
                            <Form.Control
                                name="PatternKey"
                                type="text"
                                placeholder="کلید"
                                value={itemToAdd?.PatternKey}
                                onChange={(e)=>setFormValues("PatternKey",e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>

                            <FormControl fullWidth>
                                <InputLabel id="status-select-label">سرویس دهنده</InputLabel>
                                <Select
                                    label="سرویس دهنده"
                                    value={"FARAZ"}
                                >
                                    <MenuItem value={"FARAZ"}>فراز</MenuItem>
                                </Select>
                            </FormControl>
                        </Form.Group>
                        <Form.Group>
                            <FormControl fullWidth>
                                <InputLabel id="status-select-label">نوع پیامک</InputLabel>
                                <Select
                                    label="نوع پیامک"
                                    value={itemToAdd?.SmsType || ""}
                                    onChange={e => setFormValues("SmsType",e.target.value)}
                                >
                                    {Object.keys(SmsTypes).map((item, number) => (
                                        <MenuItem key={number} value={item}>{SmsTypes[item]}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Form.Group>

                        <Form.Group>
                            <TextField
                                id="standard-full-width"
                                label="متن"
                                value={itemToAdd?.Template || ""}
                                type={"Text"}
                                multiline
                                minRows={3}
                                onChange={(e) => setFormValues("Template", e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>تاخیر در ارسال</Form.Label>
                            <Form.Control
                                name="PatternKey"
                                type="number"
                                placeholder="تاخیر در ارسال"
                                value={itemToAdd?.DelayInMin}
                                onChange={(e)=>setFormValues("DelayInMin",e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            className={"button_edit"}
                            onClick={() => setOpenModalAdd(false)}
                        >
                            خیر
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"success"}
                            className={"button_danger"}
                            onClick={e=>addPattern(e)}
                        >
                            افزودن
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    return (
        <>
            <Portlet>
                <PortletHeader
                    title={<>
                        <Typography variant={"subtitle1"}>لیست پترن ها</Typography>
                    </>}


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

                <PortletBody className={"p-2"}>

                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size={"small"}
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام پترن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کد پترن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کلید پترن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>سرویس دهنده</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>توع پیامک</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نمونه</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تاخیر در ارسال</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {patterns?.map((row, index) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index.toString()}>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.Id}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.Name}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.PatternCode}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.PatternKey}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.Provider}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{SmsTypes[row?.SmsType]}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.Template}</TableCell>
                                        <TableCell component="th" scope="row" padding="normal" align="right">{row?.DelayInMin}</TableCell>
                                        <TableCell align="left">
                                            <Button variant={"contained"} size={"small"}
                                                    color={"primary"}
                                                    onClick={(e) => setItemToEdit(row)}>وبرایش</Button>
                                            <Button variant={"contained"} size={"small"} color={"error"}
                                            onClick={(e) => setItemToDelete(row)}>حذف</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PortletBody>

            </Portlet>
            {renderModalEdit()}
            {renderModalAdd()}
        </>
    );
};

export default __SettingSmsPattern;
