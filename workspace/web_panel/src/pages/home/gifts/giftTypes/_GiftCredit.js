import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Button, FormControlLabel, FormGroup, IconButton, Switch, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import {Modal, Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Edit, InsertLink} from "@mui/icons-material";
import {GiftCredit_add, GiftCredit_query} from "../../../../network/api/GiftCredits.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import TablePagination from "@mui/material/TablePagination";
import {getCorporateFixedName, getUserFixedName, toPriceWithComma, toPriceWithoutComma} from "../../../../helper";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from '@mui/x-date-pickers/AdapterDateFnsJalali';
import {DatePicker} from "@mui/x-date-pickers";
import __SelectUser from "../../../partials/selector/__SelectUser";
import __SelectCorporate from "../../../partials/selector/__SelectCorporate";

const _GiftCredit = () => {

    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [giftCredits, setGiftCredits] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [addFormData,setAddFormData] = useState({CanRegister:true,CheckCorporateDeposit:true})

    useEffect(() => {
        getGifts();
    }, [page,rowsPerPage]);
    useEffect(() => {
        var Edate = new Date();
        Edate.setDate(Edate.getDate()+13);
        var CEdate = new Date();
        CEdate.setDate(CEdate.getDate()+43);
        setAddFormData({...addFormData,ExpireDate:Edate,CreditExpireDate:CEdate,Count:1})
    }, [openModalAdd]);

    function getGifts() {
        GiftCredit_query({
            queryType: "FILTER",
            paging: {Page: page, Size: (rowsPerPage), Desc: true}
        }).then(data => {
            setGiftCredits(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalAdd() {
        function addGiftCredit(e) {
            e.preventDefault()
            GiftCredit_add(addFormData).then(result => {
                setOpenModalAdd(false)
                setPage(0);
                getGifts();
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
                            <Modal.Title>{"افزودن شارژ به سازمان "}</Modal.Title>
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
                                    value={addFormData.ExpireDate}
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


    function copyToClipboard(item) {
        navigator.clipboard.writeText("https://web.gympin.ir/code/"+item.Code);
        error.showError({message: "کپی شد",});
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={"کارت های هدیه ایحاد شده"}
                    toolbar={
                        <PortletHeaderToolbar>
                            <IconButton onClick={()=>setOpenModalAdd(true)} size={"small"} color={"primary"}><AddIcon/></IconButton>
                        </PortletHeaderToolbar>}
                />

                <PortletBody>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام هدیه یا کمپین</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کد کارت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کد ثبت نام</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>سازمان</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>امکان ثبت نام</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تاریخ انقضا</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تاریخ انقضا اعتبار</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت کارت</TableCell>
                                    <TableCell align="left" padding="normal" sortDirection={false}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {giftCredits?.content?.map((row, index) => {
                                    return (
                                        <TableRow hover role={"checkbox"}>
                                            <TableCell component="th" align="right">{row.Id}</TableCell>
                                            <TableCell component="th" align="right">{row.Name}</TableCell>
                                            <TableCell component="th" align="right">{row.Code}</TableCell>
                                            <TableCell component="th" align="right">{row.RegisterCode}</TableCell>
                                            <TableCell component="th" align="right">{row?.User?.Id?getUserFixedName(row.User):"ثبت شده"}</TableCell>
                                            <TableCell component="th" align="right">{row?.Corporate?.Id?getCorporateFixedName(row.Corporate):"ثبت شده"}</TableCell>
                                            <TableCell component="th" align="right">{row.CanRegister?"دارد":"ندارد"}</TableCell>
                                            <TableCell component="th" align="right">{toPriceWithComma(row.Amount)}</TableCell>
                                            <TableCell component="th" align="right">{new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell component="th" align="right">{new Date(row.CreditExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell component="th" align="right">{row.Status}</TableCell>
                                            <TableCell component="th" align="left">
                                                <IconButton size={"small"} color={"success"} onClick={()=>copyToClipboard(row)}><InsertLink/></IconButton>
                                                <IconButton size={"small"} color={"primary"}><Edit/></IconButton>
                                            </TableCell>

                                        </TableRow>
                                    )})}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(giftCredits?.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={giftCredits.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
            {renderModalAdd()}
        </>
    );
};

export default _GiftCredit;
