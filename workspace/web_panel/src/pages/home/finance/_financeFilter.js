import React, {useContext, useEffect, useState} from 'react';
import {Modal, Tab, Tabs} from "react-bootstrap";
import {Form} from "reactstrap";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {TransactionStatus} from "../../../helper/enums/TransactionStatus";
import {TransactionCorporateTypes} from "../../../helper/enums/TransactionCorporateTypes";
import AsyncSelect from "react-select/async";
import {user_query} from "../../../network/api/user.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {PlaceGym_query} from "../../../network/api/placeGym.api";
import {corporate_query} from "../../../network/api/corporate.api";

export const defaultFilterFinance = {
    queryType: "FILTER",
    TransactionStatus: null,
    TransactionType: null,
    UserId: null,
    PlaceId: null,
    CorporateId: null,
    Serial: null
};

const _financeFilter = ({openModal, setOpenModal,filter,setFilter}) => {
    const error = useContext(ErrorContext);

    const [modalFilter, SetModalFilter] = useState(defaultFilterFinance);
    useEffect(() => {
        if (!openModal) return;
        SetModalFilter(filter);
    }, [openModal]);

    function submitForm(e){
        e.preventDefault()
        setFilter(modalFilter);
        setOpenModal(false);
    }

    const promiseUserOptions = (inputValue) => {
        return new Promise((resolve) => {
            function getLabelOfUser(itm) {
                return (<Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"}>{itm.Username}</Typography>
                    <Typography variant={"body2"}>{((itm.FullName) ? `(${itm.FullName})` : "")}</Typography>
                    <Typography variant={"body2"}>{itm.PhoneNumber}</Typography>
                </Grid>)
            }

            user_query({
                queryType: "SEARCH",
                Username: inputValue,
                FullName: inputValue,
                PhoneNumber: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: getLabelOfUser(itm), value: itm.Id}
                }));
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        });
    }
    const promisePlaceOptions = (inputValue) => {
        return new Promise((resolve) => {

            PlaceGym_query({
                queryType: "SEARCH",
                Name: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: itm.Name, value: itm.Id}
                }));
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        });
    }
    const promiseCorporateOptions = (inputValue) => {
        return new Promise((resolve) => {
            corporate_query({
                queryType: "SEARCH",
                Name: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: itm.Name, value: itm.Id}
                }));
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        });
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
                                {Object.keys(TransactionCorporateTypes).map((item, number) => (
                                    <MenuItem key={number} value={item}>{TransactionCorporateTypes[item]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{mt: 2}}>

                            <Tabs
                                defaultActiveKey="user"
                                id="fill-tab-example"
                                className="mb-3"
                                fill
                            >
                                <Tab eventKey="user" title="کاربر">
                                    <AsyncSelect cacheOptions defaultOptions
                                                 name={"Select_user"}
                                                 label="کاربر"
                                                 placeholder="کاربر"
                                                 onChange={e => SetModalFilter({
                                                     ...modalFilter,
                                                     UserId: e.value
                                                 })}
                                                 loadOptions={promiseUserOptions}/>
                                </Tab>
                                <Tab eventKey="place" title="مجموعه">
                                    <AsyncSelect cacheOptions defaultOptions
                                                 name={"Select_place"}
                                                 label="مجموعه"
                                                 placeholder="مجموعه"
                                                 onChange={e => SetModalFilter({
                                                     ...modalFilter,
                                                     PlaceId: e.value
                                                 })}
                                                 loadOptions={promisePlaceOptions}/>
                                </Tab>
                                <Tab eventKey="corporate" title="شرکت">
                                    <AsyncSelect cacheOptions defaultOptions
                                                 name={"Select_corporate"}
                                                 label="شرکت"
                                                 placeholder="شرکت"
                                                 onChange={e => SetModalFilter({
                                                     ...modalFilter,
                                                     CorporateId: e.value
                                                 })}
                                                 loadOptions={promiseCorporateOptions}/>
                                </Tab>
                            </Tabs>
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
                            setFilter(defaultFilterFinance);
                            SetModalFilter(defaultFilterFinance);
                        }}>خالی کردن فیلتر</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default _financeFilter;
