import React, {useContext, useEffect, useState} from 'react';
import {Button, FormControlLabel, FormGroup, IconButton, Switch, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {GiftCredit_add} from "../../../../network/api/GiftCredits.api";
import {Modal} from "react-bootstrap";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalali";
import {DatePicker} from "@mui/x-date-pickers";
import __SelectCorporate from "../../../partials/selector/__SelectCorporate";
import __SelectUser from "../../../partials/selector/__SelectUser";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _GiftAddItem = ({openModalAdd,setOpenModalAdd,reloadList}) => {

    const error = useContext(ErrorContext);

    const [addFormData,setAddFormData] = useState({CanRegister:true,CheckCorporateDeposit:true})

    useEffect(() => {
        var Edate = new Date();
        Edate.setDate(Edate.getDate()+13);
        var CEdate = new Date();
        CEdate.setDate(CEdate.getDate()+43);
        setAddFormData({...addFormData,ExpireDate:Edate,CreditExpireDate:CEdate,Count:1})
    }, [openModalAdd]);


    function renderModalAdd() {
        function addGiftCredit(e) {
            e.preventDefault()
            GiftCredit_add(addFormData).then(result => {
                setOpenModalAdd(false)
                reloadList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <form onSubmit={(e) => addGiftCredit(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن هدیه "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="count"
                                value={addFormData.Name}
                                onChange={(e)=>{setAddFormData({...addFormData,Name:e.target.value})}}
                                type="text"
                                label={"نام یا دسته بندی هدیه"}
                            />


                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="count"
                                value={addFormData.Count}
                                onChange={(e)=>{setAddFormData({...addFormData,Count:e.target.value})}}
                                type="number"
                                label={"تعداد"}
                            />

                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="amount"
                                value={toPriceWithComma(addFormData.Amount)}
                                onChange={(e)=>{setAddFormData({...addFormData,Amount:toPriceWithoutComma(e.target.value)})}}
                                type="text"
                                label={"مبلغ دلخواه به تومان"}
                            />

                            <LocalizationProvider
                                dateAdapter={AdapterDateFnsJalali}>
                                <DatePicker
                                    className="w-100 mt-3"
                                    label="تاریخ انقضا"
                                    name="ExpireDate"
                                    value={new Date(addFormData.ExpireDate||"")}
                                    onChange={e => setAddFormData({...addFormData,ExpireDate:e})}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                                <DatePicker
                                    className="w-100 mt-4"
                                    label="تاریخ انقضا اعتبار"
                                    name="CreditExpireDate"
                                    value={addFormData.CreditExpireDate}
                                    onChange={e => setAddFormData({...addFormData, CreditExpireDate: e})}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </LocalizationProvider>

                            <FormGroup>
                                <FormControlLabel
                                    checked={addFormData.CheckCorporateDeposit}
                                    onChange={(e)=>{setAddFormData({...addFormData,CheckCorporateDeposit:e.target.checked})}}
                                    control={<Switch/>}
                                    label="موجودی سازمان بررسی شود"
                                />
                            </FormGroup>
                            <__SelectCorporate
                                onChange={(e)=>{setAddFormData({...addFormData,Corporate:{Id:e.value}})}}
                            />
                            <FormGroup>
                                <FormControlLabel
                                    checked={addFormData.CanRegister}
                                    onChange={(e)=>{setAddFormData({...addFormData,CanRegister:e.target.checked})}}
                                    control={<Switch />}
                                    label="امکان ثبت نام"
                                />
                            </FormGroup>
                            <__SelectUser
                                hidden={addFormData?.CanRegister}
                                onChange={(e)=>{setAddFormData({...addFormData,User:{Id:e.value}})}}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                لغو
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                ثبت
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>

            <IconButton onClick={()=>setOpenModalAdd(true)} size={"small"} color={"primary"}><AddIcon/></IconButton>

            {renderModalAdd()}
        </>
    );
};

export default _GiftAddItem;
