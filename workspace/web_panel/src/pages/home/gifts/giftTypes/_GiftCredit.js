import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {IconButton} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {InsertLink} from "@mui/icons-material";
import {GiftCredit_query} from "../../../../network/api/GiftCredits.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import TablePagination from "@mui/material/TablePagination";
import {getCorporateFixedName, getUserFixedName, toPriceWithComma} from "../../../../helper";
import _GiftAddItem from "../partials/_GiftAddItem";
import _GiftEditItem from "../partials/_GiftEditItem";
import _GiftDeleteItem from "../partials/_GiftDeleteItem";
import {GiftCreditStatus} from "../../../../helper/enums/GiftCreditStatus";

const _GiftCredit = () => {

    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [giftCredits, setGiftCredits] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    useEffect(() => {
        getGifts();
    }, [page, rowsPerPage]);

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


    function copyToClipboard(item) {
        navigator.clipboard.writeText("https://web.gympin.ir/code/" + item.Code);
        error.showError({message: "کپی شد",});
    }

    return (
        <>

            <Portlet>
                <PortletHeader
                    title={"کارت های هدیه ایجاد شده"}
                    toolbar={
                        <PortletHeaderToolbar>
                            <_GiftAddItem openModalAdd={openModalAdd} setOpenModalAdd={setOpenModalAdd} reloadList={getGifts}/>
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
                                        <TableRow hover role={"checkbox"} key={"i-i-"+index}>
                                            <TableCell component="th" align="right">{row.Id}</TableCell>
                                            <TableCell component="th" align="right">{row.Name}</TableCell>
                                            <TableCell component="th" align="right">{row.Code}</TableCell>
                                            <TableCell component="th" align="right">{row.RegisterCode}</TableCell>
                                            <TableCell component="th"
                                                       align="right">{row?.User?.Id ? getUserFixedName(row.User) : "ثبت نشده"}</TableCell>
                                            <TableCell component="th"
                                                       align="right">{row?.Corporate?.Id ? getCorporateFixedName(row.Corporate) : "ثبت نشده"}</TableCell>
                                            <TableCell component="th" align="right">{row.CanRegister ? "دارد" : "ندارد"}</TableCell>
                                            <TableCell component="th" align="right">{toPriceWithComma(row.Amount)}</TableCell>
                                            <TableCell component="th" align="right">{row.ExpireDate&&new Date(row.ExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell component="th"
                                                       align="right">{row.CreditExpireDate&&new Date(row.CreditExpireDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</TableCell>
                                            <TableCell component="th" align="right">{GiftCreditStatus[row.Status]}</TableCell>
                                            <TableCell component="th" align="left">
                                                <IconButton size={"small"} color={"success"}
                                                            onClick={() => copyToClipboard(row)}><InsertLink/></IconButton>
                                                <_GiftEditItem item={row} reloadList={getGifts} />
                                                <_GiftDeleteItem item={row} reloadList={getGifts}/>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(giftCredits?.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={giftCredits.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>

        </>
    );
};

export default _GiftCredit;
