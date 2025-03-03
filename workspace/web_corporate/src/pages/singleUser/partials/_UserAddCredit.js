import React, {useContext, useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {corporatePersonnel_addPersonnelCredit} from "../../../network/api/corporatePersonnel.api";
import {toPriceWithComma, toPriceWithoutComma} from "../../../helper/utils";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {format} from "date-fns";

const _UserAddCredit = ({getCorporatePerson,personnelId}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [formData,setFormData] = useState({})

    useEffect(() => {
            if(corporate?.ContractType=="PRO"||corporate?.ContractType=="NEO"){
                setFormData({...formData , ExpireDate : new Date().setDate(new Date().getDate()+corporate?.DefaultExpireDuration) })
            }
    }, [corporate]);



    function renderModalAddCredit() {
        function addCredit(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: personnelId},
                ...formData
            })
                .then(result => {
                    getCorporatePerson();
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => addCredit(e)}>
                    <DialogTitle>افزودن اعتبار</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن اعتبار مبلغ را وارد کنید
                        </DialogContentText>


                        <TextField
                            autoFocus
                            sx={{mt:2}}
                            name={"CreditAmount"}
                            label="نام اعتبار"
                            type="text"
                            value={formData.Name}
                            onChange={(e) => setFormData({...formData,Name:e.target.value})}
                            fullWidth
                            variant={"outlined"}
                        />

                        {(corporate.ContractType!="ALPHA")&&<LocalizationProvider dateAdapter={AdapterDateFnsJalali} >
                            <DatePicker
                                value={formData?.ExpireDate}
                                sx={{mt: 2, mb: 1}}
                                name={"ExpireDate"}
                                label={"تاریخ انقضا"}
                                onChange={(e)=>setFormData({...formData,ExpireDate:e})}
                                className="w-100"
                            />
                        </LocalizationProvider>}
                        <TextField
                            autoFocus
                            margin="dense"
                            name={"CreditAmount"}
                            label="تومان"
                            type="text"
                            value={toPriceWithComma(formData.CreditAmount)}
                            onChange={(e) => setFormData({...formData,CreditAmount:toPriceWithoutComma(e.target.value)})}
                            fullWidth
                            variant={"outlined"}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button variant={"contained"} color={"success"} type={"submit"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }


    return (
        <>
            <Button onClick={() => setOpenModalAdd(true)} variant={"contained"}>افزایش اعتبار</Button>

            {renderModalAddCredit()}
        </>
    );
};

export default _UserAddCredit;
