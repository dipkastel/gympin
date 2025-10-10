import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {corporatePersonnel_addPersonnelCredit} from "../../../../network/api/corporatePersonnel.api";
import {encodeId, toPriceWithComma, toPriceWithoutComma} from "../../../../helper/utils";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import __SelectPersonnel from "../../../../components/__SelectPersonnel";
import {useNavigate} from "react-router";

const _UserAddCredit = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [formData, setFormData] = useState({})
    const [selectedPersonnel, setSelectedPersonnel] = useState(null)

    useEffect(() => {
        if (corporate?.ContractType == "PRO" || corporate?.ContractType == "NEO") {
            setFormData({...formData, ExpireDate: new Date().setDate(new Date().getDate() + corporate?.DefaultExpireDuration)})
        }
    }, [corporate]);


    function renderModalAddCredit() {
        function addCredit(e) {
            e.preventDefault()
            if(!selectedPersonnel?.value){
                error.showError({message: "پرسنل انتخاب نشده",});
                return;
            }
            if(!formData?.Name){
                error.showError({message: "نام اعتبار انتخاب نشده",});
                return;
            }
            if(corporate.ContractType != "ALPHA"&&!formData?.ExpireDate){
                error.showError({message: "تاریخ انقضا اعتبار انتخاب نشده",});
                return;
            }
            if(!formData?.CreditAmount){
                error.showError({message: "مبلغ اعتبار انتخاب نشده",});
                return;
            }




            setOpenModalAdd(false);
            error.showError({message: "درحال ثبت..",});
            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: selectedPersonnel.value},
                ...formData
            }).then(result => {
                navigate("/personnel/detail/" + + encodeId(selectedPersonnel.value));
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
                            برای افزودن اعتبار اطلاعات و مبلغ را وارد کنید.
                        </DialogContentText>

                        <__SelectPersonnel value={selectedPersonnel} onChange={setSelectedPersonnel} hidden={false}/>

                        <TextField
                            autoFocus
                            sx={{mt: 3}}
                            name={"CreditAmount"}
                            label="نام اعتبار"
                            type="text"
                            value={formData.Name}
                            onChange={(e) => setFormData({...formData, Name: e.target.value})}
                            fullWidth
                            variant={"outlined"}
                        />

                        {(corporate.ContractType != "ALPHA") && <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                            <DatePicker
                                value={formData?.ExpireDate}
                                sx={{mt: 4, mb: 1}}
                                name={"ExpireDate"}
                                label={"تاریخ انقضا"}
                                onChange={(e) => setFormData({...formData, ExpireDate: e})}
                                className="w-100"
                            />
                        </LocalizationProvider>}
                        <TextField
                            autoFocus
                            sx={{mt: 3, mb: 3}}
                            margin="dense"
                            name={"CreditAmount"}
                            label="تومان"
                            type="text"
                            value={toPriceWithComma(formData.CreditAmount)}
                            onChange={(e) => setFormData({...formData, CreditAmount: toPriceWithoutComma(e.target.value)})}
                            fullWidth
                            variant={"outlined"}
                        />

                    </DialogContent>
                    <DialogActions sx={{mb: 2, mx: 2}}>
                        <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button variant={"contained"} color={"success"} type={"submit"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }


    return (
        <>
            <Card sx={{m: 2}}>
                <CardActionArea sx={{p: 2, textAlign: "center"}} onClick={() => setOpenModalAdd(true)}>
                    افزایش اعتبار شخصی
                </CardActionArea>
            </Card>
            {renderModalAddCredit()}
        </>
    );
};

export default _UserAddCredit;
