import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {Form} from "reactstrap";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {TransactionStatus} from "../../../helper/enums/TransactionStatus";
import {TransactionTypes} from "../../../helper/enums/TransactionTypes";
import {TicketStatus} from "../../../helper/enums/TicketStatus";
import AsyncSelect from "react-select/async";
import {user_query} from "../../../network/api/user.api";
import {Place_query} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Plans_query} from "../../../network/api/plans.api";

export const defaultFilterTicket = {
    queryType: "FILTER",
    userId:null,
    planId:null,
    status:null,
};

const _ticketFilter = ({openModal, setOpenModal,filter,setFilter}) => {

    const error = useContext(ErrorContext);
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
    const promisePlanOptions = (inputValue) => {
        return new Promise((resolve) => {

            Plans_query({
                queryType: "SEARCH",
                Name: inputValue,
                paging: {Page: 0, Size: 50, Desc: true}
            }).then((data) => {
                resolve(data.data.Data.content.map(itm => {
                    return {label: itm.Place.Name+" - "+itm.Name, value: itm.Id}
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

            Place_query({
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
                        <Modal.Title>{"فیلتر بلیط ها"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel id="status-select-label">وضعیت</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                name={"status"}
                                label="status"
                                value={modalFilter.status || "null"}
                                onChange={e => SetModalFilter({
                                    ...modalFilter,
                                    status: e.target.value == "null" ? null : e.target.value
                                })}
                            >
                                <MenuItem value={"null"}>بدون فیلتر</MenuItem>
                                {Object.keys(TicketStatus).map((item, number) => (
                                    <MenuItem key={number} value={item}>{TicketStatus[item]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{mt: 2}}>

                            <AsyncSelect cacheOptions defaultOptions
                                         name={"Select_user"}
                                         label="کاربر"
                                         placeholder="کاربر"
                                         onChange={e => SetModalFilter({
                                             ...modalFilter,
                                             userId: e.value
                                         })}
                                         loadOptions={promiseUserOptions}/>
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <AsyncSelect cacheOptions defaultOptions
                                         name={"Select_plan"}
                                         label="پلن"
                                         placeholder="پلن"
                                         onChange={e => SetModalFilter({
                                             ...modalFilter,
                                             planId: e.value
                                         })}
                                         loadOptions={promisePlanOptions}/>
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <AsyncSelect cacheOptions defaultOptions
                                         name={"Select_place"}
                                         label="مرکز"
                                         placeholder="مرکز"
                                         onChange={e => SetModalFilter({
                                             ...modalFilter,
                                             placeId: e.value
                                         })}
                                         loadOptions={promisePlaceOptions}/>
                        </FormControl>
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

export default _ticketFilter;
