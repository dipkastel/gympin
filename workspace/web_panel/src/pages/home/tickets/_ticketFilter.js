import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Form} from "reactstrap";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {TransactionStatus} from "../../../helper/enums/TransactionStatus";
import {TransactionTypes} from "../../../helper/enums/TransactionTypes";

export const defaultFilterTicket = {
    queryType: "FILTER",
    TransactionStatus: null,
    TransactionType: null,
    Serial: null
};

const _financeFilter = ({openModal, setOpenModal,filter,setFilter}) => {

    const [modalFilter, SetModalFilter] = useState(defaultFilterTicket);
    useEffect(() => {
        if (!openModal) return;
        SetModalFilter(filter);
    }, [openModal]);

    function submitForm(e){
        e.preventDefault()
        setFilter(modalFilter);
        setOpenModal(false);
    }

    return (<>

            <Modal show={openModal} onHide={() => setOpenModal(false)}>
                <Form onSubmit={(e) => submitForm(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"فیلتر تراکنش ها"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel id="status-select-label">وضعیت</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                name={"status"}
                                label="status"
                                value={modalFilter.TransactionStatus || "null"}
                                onChange={e => SetModalFilter({
                                    ...modalFilter,
                                    TransactionStatus: e.target.value == "null" ? null : e.target.value
                                })}
                            >
                                <MenuItem value={"null"}>بدون فیلتر</MenuItem>
                                {Object.keys(TransactionStatus).map((item, number) => (
                                    <MenuItem key={number} value={item}>{TransactionStatus[item]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel id="type-select-label">نوع</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-select"
                                name={"Type"}
                                label="Type"
                                value={modalFilter.TransactionType || "null"}
                                onChange={e => SetModalFilter({
                                    ...modalFilter,
                                    TransactionType: e.target.value == "null" ? null : e.target.value
                                })}
                            >
                                <MenuItem value={"null"}>بدون فیلتر</MenuItem>
                                {Object.keys(TransactionTypes).map((item, number) => (
                                    <MenuItem key={number} value={item}>{TransactionTypes[item]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            id="serial-filter"
                            label="سریال"
                            sx={{mt:2}}
                            placeholder="سریال"
                            value={modalFilter.Serial}
                            onChange={(e)=>SetModalFilter({...modalFilter,Serial:e.target.value})}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={"outlined"} color={"error"} onClick={() => setOpenModal(false)}>لغو</Button>
                        <Button variant={"outlined"}  color={"success"} type={"submit"}> فیلتر </Button>
                        <Button variant={"outlined"}  color={"info"} onClick={()=>{
                            setOpenModal(false);
                            setFilter(defaultFilterTicket);
                            SetModalFilter(defaultFilterTicket);
                        }}>خالی کردن فیلتر</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default _financeFilter;