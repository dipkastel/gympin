import React, {useContext, useState} from 'react';
import {Close, Edit} from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Switch,
    TextField
} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Modal} from "react-bootstrap";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../helper";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalali";
import {DatePicker} from "@mui/x-date-pickers";
import __SelectCorporate from "../../../partials/selector/__SelectCorporate";
import __SelectUser from "../../../partials/selector/__SelectUser";
import {GiftCredit_update} from "../../../../network/api/GiftCredits.api";
import Select from "react-select";
import {UserSettingKeys} from "../../../../helper/enums/UserSettingKeys";
import {GiftCreditStatus} from "../../../../helper/enums/GiftCreditStatus";

const _GiftEditItem = ({item, reloadList}) => {


    const error = useContext(ErrorContext);
    const [itemToEdit, setItemToEdit] = useState(null);


    function renderModalEdit() {
        function editGiftCredit(e) {
            e.preventDefault()
            GiftCredit_update(itemToEdit).then(result => {
                setItemToEdit(null)
                reloadList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }


        function getStatusOprions() {
            var keys = [];
            Object.keys(GiftCreditStatus)?.map(key => {
                keys.push({value: key, label: GiftCreditStatus[key]});
            })
            return keys;
        }

        return (
            <>

                <Modal show={!!itemToEdit} onHide={() => setItemToEdit(null)}>
                    <form onSubmit={(e) => editGiftCredit(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"ویرایش هدیه "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormControl fullWidth>
                                <Select
                                    className={"dropdown"}
                                    value={getStatusOprions().find(p=>p.value==itemToEdit?.Status)}
                                    name={"status"}
                                    options={getStatusOprions()}
                                    onChange={e => {
                                        setItemToEdit({...itemToEdit, Status: e.value})
                                    }}
                                />
                            </FormControl>
                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="count"
                                value={itemToEdit?.Name}
                                onChange={(e) => {
                                    setItemToEdit({...itemToEdit, Name: e.target.value})
                                }}
                                type="text"
                                label={"نام یا دسته بندی هدیه"}
                            />

                            <TextField
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                name="amount"
                                value={toPriceWithComma(itemToEdit?.Amount)}
                                onChange={(e) => {
                                    setItemToEdit({...itemToEdit, Amount: toPriceWithoutComma(e.target.value)})
                                }}
                                type="text"
                                label={"مبلغ دلخواه به تومان"}
                            />

                            <LocalizationProvider
                                dateAdapter={AdapterDateFnsJalali}>
                                <DatePicker
                                    className="w-100 mt-3"
                                    label="تاریخ انقضا"
                                    name="ExpireDate"
                                    value={new Date(itemToEdit?.ExpireDate || "")}
                                    onChange={e => setItemToEdit({...itemToEdit, ExpireDate: e})}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                                <DatePicker
                                    className="w-100 mt-4"
                                    label="تاریخ انقضا اعتبار"
                                    name="CreditExpireDate"
                                    value={new Date(itemToEdit?.CreditExpireDate || "")}
                                    onChange={e => setItemToEdit({...itemToEdit, CreditExpireDate: e})}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </LocalizationProvider>

                            <FormGroup>
                                <FormControlLabel
                                    checked={itemToEdit?.CheckCorporateDeposit}
                                    onChange={(e) => {
                                        setItemToEdit({...itemToEdit, CheckCorporateDeposit: e.target.checked})
                                    }}
                                    control={<Switch/>}
                                    label="موجودی سازمان بررسی شود"
                                />
                            </FormGroup>
                            {itemToEdit?.Corporate?.Id && <>
                                <FormControl sx={{width: '100%'}} variant="outlined">
                                    <InputLabel htmlFor="fm-corporate">سازمان</InputLabel>
                                    <OutlinedInput
                                        className="w-100"
                                        id="fm-corporate"
                                        disabled={false}
                                        name="corporate"
                                        value={itemToEdit?.Corporate?.Name}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={(e) => setItemToEdit({...itemToEdit, Corporate: null})}
                                                    edge="end"
                                                ><Close/> </IconButton>
                                            </InputAdornment>
                                        }
                                        label={"سازمان"}
                                    />
                                </FormControl>
                            </>}
                            {!itemToEdit?.Corporate?.Id &&
                            <__SelectCorporate
                                onChange={(e) => {
                                    setItemToEdit({
                                        ...itemToEdit,
                                        Corporate: {Id: e.value, Name: e.label?.props?.children[0]?.props?.children || e.value}
                                    })
                                }}
                            />}

                            <FormGroup>
                                <FormControlLabel
                                    checked={itemToEdit?.CanRegister}
                                    onChange={(e) => {
                                        setItemToEdit({...itemToEdit, CanRegister: e.target.checked})
                                    }}
                                    control={<Switch/>}
                                    disabled={itemToEdit?.User?.Id}
                                    label="امکان ثبت نام"
                                />
                            </FormGroup>
                            {itemToEdit?.User?.Id && <>
                                <FormControl sx={{width: '100%'}} variant="outlined">
                                    <InputLabel htmlFor="fm-user">کاربر</InputLabel>
                                    <OutlinedInput
                                        className="w-100"
                                        id="fm-user"
                                        disabled={false}
                                        name="user"
                                        value={itemToEdit?.User?.FullName}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={(e) => setItemToEdit({...itemToEdit, User: null})}
                                                    edge="end"
                                                ><Close/> </IconButton>
                                            </InputAdornment>
                                        }
                                        label={"کاربر"}
                                    />
                                </FormControl>
                            </>}
                            {!itemToEdit?.User?.Id && <>
                                <__SelectUser
                                    hidden={itemToEdit?.CanRegister}
                                    onChange={(e) => {
                                        console.log(e)
                                        setItemToEdit({...itemToEdit, User: {Id: e.value,FullName:e.label?.props?.children[1]?.props?.children || e.value}})
                                    }}
                                />
                            </>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className={"button_edit"} onClick={() => setItemToEdit(null)}> لغو </Button>
                            <Button className={"button_danger"} type={"submit"}> ثبت </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </>
        );
    }

    return (
        <>
            <IconButton size={"small"} color={"primary"} onClick={(e) => setItemToEdit(item)}><Edit/></IconButton>
            {renderModalEdit()}
        </>
    );
};

export default _GiftEditItem;
