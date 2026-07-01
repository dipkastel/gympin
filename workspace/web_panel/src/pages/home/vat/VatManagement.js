import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader} from "../../partials/content/Portlet";
import {getPsVatManagement, getRppVatManagement, SetPsVatManagement, SetRppVatManagement} from "../../../helper/pocket/pocket";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {serial_vatQuery} from "../../../network/api/serial.api";
import {
    Collapse,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip
} from "@mui/material";
import PopoverUser from "../../../components/popover/PopoverUser";
import {toPriceWithComma} from "../../../helper";
import {ExpandLess, ExpandMore, Info} from "@mui/icons-material";

const VatManagement = () => {

    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppVatManagement());
    const [sells, SetSells] = useState([]);
    const [hideItems, setHideItems] = useState(getPsVatManagement()?.HideItems||[]);
    const [showPageSettings, setShowPageSettings] = useState(false);

    useEffect(() => {
        console.log("getPsVatManagement()",getPsVatManagement());
        getVats()
    }, [page, rowsPerPage]);

    function getVats() {
        serial_vatQuery({
            queryType: "FILTER",
            InvoiceStatus: "COMPLETED",
            ProcessType: "TRA_CHECKOUT_BASKET",
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((result) => {
            SetSells(result.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    function changeHideItems(item,value){
        var newHideItems = value ? hideItems?.filter(p => p != item) :[...hideItems, item];
        setHideItems(newHideItems);
        SetPsVatManagement({HideItems:newHideItems})
    }

    function getCheck(value, title) {
        console.log("hideItems",hideItems);
        return <Grid size={4}>
            <FormControlLabel
                checked={!hideItems?.includes(value)}
                onChange={(e) => changeHideItems(value,e.target.checked)}
                control={<Switch/>}
                label={title}
            />
        </Grid>
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">
                <Grid container justifyContent={"space-between"}>
                    <Grid><p>تمام فروش های مراکز به همراه ارزش افزوده با جزییات</p></Grid>
                    <Grid>تنظیمات صفحه<IconButton>{showPageSettings ?
                        <ExpandLess onClick={(e) => setShowPageSettings(!showPageSettings)}/> :
                        <ExpandMore onClick={(e) => setShowPageSettings(!showPageSettings)}/>}</IconButton></Grid>
                </Grid>
                <Collapse in={showPageSettings} timeout="auto" unmountOnExit>
                    <Grid container direction={"row"} columns={12}>
                        {getCheck("Id", "نمایش آی دی")}
                        {getCheck("CreatedDate", "نمایش تاریخ")}
                        {getCheck("TicketName", "نمایش بلیط ها")}
                        {getCheck("PlaceName", "نمایش مجموعه ها")}
                        {getCheck("Customer", "نمایش خریدار")}
                        {getCheck("PlacePrice", "نمایش قیمت مرکز")}
                        {getCheck("SellPrice", "نمایش قیمت فروش")}
                        {getCheck("BeneficiaryPayment", "نمایش پرداختی به ذینفع")}
                        {getCheck("Discount", "نمایش تخفیف")}
                        {getCheck("CorporatePay", "نمایش پرداختی سازمان")}
                        {getCheck("UserPay", "نمایش پرداختی کاربر")}
                        {getCheck("CommissionFee", "نمایش درصد کمیسیون")}
                        {getCheck("Beneficiary", "نمایش ذینفع")}
                        {getCheck("CommissionAll", "نمایش کمیسیون (کل)")}
                        {getCheck("CommissionByCorporate", "نمایش کمیسیون (پرداختی شرکت)")}
                        {getCheck("CommissionByUser", "نمایش کمیسیون (پرداختی کاربر)")}
                        {getCheck("VatByCorporate", "نمایش ارزش افزوده سازمان")}
                        {getCheck("VatByUser", "نمایش ارزش افزوده کاربر")}
                        {getCheck("Error", "نمایش خطا ها")}
                    </Grid> </Collapse> </Notice> <Portlet> <PortletHeader title="ارزش افزوده"/> <PortletBody>
            <TableContainer>
                <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("Id")}
                                       sortDirection={false}>Id</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("CreatedDate")}
                                       sortDirection={false}>تاریخ</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("TicketName")}
                                       sortDirection={false}>بلیط ها</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("PlaceName")}
                                       sortDirection={false}>مجموعه ها</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("Customer")}
                                       sortDirection={false}>خریدار</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("PlacePrice")}
                                       sortDirection={false}>قیمت مرکز</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("SellPrice")}
                                       sortDirection={false}>قیمت فروش</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("BeneficiaryPayment")}
                                       sortDirection={false}>پرداختی به ذینفع</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("Discount")}
                                       sortDirection={false}>تخفیف</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("CorporatePay")}
                                       sortDirection={false}>پرداختی سازمان</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("UserPay")} sortDirection={false}>پرداختی
                                کاربر</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("CommissionFee")}
                                       sortDirection={false}>درصد قرارداد</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("Beneficiary")}
                                       sortDirection={false}>ذینفع بلیط</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("CommissionAll")}
                                       sortDirection={false}>کمیسیون کل</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("CommissionByCorporate")}
                                       sortDirection={false}>کمیسیون سهم شرکت</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("CommissionByUser")}
                                       sortDirection={false}>کمیسیون سهم کاربر</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("VatByCorporate")}
                                       sortDirection={false}>ارزش افزوده شرکت</TableCell>
                            <TableCell align="right" padding="normal" hidden={hideItems?.includes("VatByUser")}
                                       sortDirection={false}>ارزش افزوده کاربر</TableCell>
                            <TableCell align="left" padding="normal" hidden={hideItems?.includes("Error")}
                                       sortDirection={false}>خطا</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sells.content && sells.content.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("Id")} align="right">{row.Id}</TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("CreatedDate")}
                                               align="right">{new Date(row.CreatedDate).toLocaleDateString('fa-IR', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("TicketName")} align="right">{row.TicketName}</TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("PlaceName")} align="right">{row.PlaceName}</TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("Customer")} align="right"><PopoverUser
                                        user={row.Customer}/> </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("PlacePrice")}
                                               align="right"> {toPriceWithComma(row.PlacePrice)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("SellPrice")}
                                               align="right"> {toPriceWithComma(row.SellPrice)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("BeneficiaryPayment")}
                                               align="right"> {toPriceWithComma(row.BeneficiaryPayment)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("Discount")}
                                               align="right"> {toPriceWithComma(row.Discount)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("CorporatePay")}
                                               align="right"> {toPriceWithComma(row.CorporatePay)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("UserPay")}
                                               align="right"> {toPriceWithComma(row.UserPay)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("CommissionFee")}
                                               align="right"> {row.CommissionFee} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("Beneficiary")} align="right"><PopoverUser
                                        user={row.Beneficiary}/> </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("CommissionAll")}
                                               align="right"> {toPriceWithComma(row.CommissionAll)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("CommissionByCorporate")}
                                               align="right"> {toPriceWithComma(row.CommissionByCorporate)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("CommissionByUser")}
                                               align="right"> {toPriceWithComma(row.CommissionByUser)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("VatByCorporate")}
                                               align="right"> {toPriceWithComma(row.VatByCorporate)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("VatByUser")}
                                               align="right"> {toPriceWithComma(row.VatByUser)} </TableCell>
                                    <TableCell component="th" id={labelId} scope="row" padding="normal"
                                               hidden={hideItems?.includes("Error")} align="left">
                                        <Tooltip title={row.Error} placement="top">
                                            <Info/>
                                        </Tooltip>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {(sells.totalElements > 0) && <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                component="div"
                sx={{direction: "rtl"}}
                count={sells.totalElements || 0}
                labelRowsPerPage={"تعداد نمایش"}
                labelDisplayedRows={(param) => {
                    return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                }}
                rowsPerPage={parseInt(rowsPerPage)}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    SetRppVatManagement(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />}
        </PortletBody>
        </Portlet>
        </>
    );
};

export default VatManagement;
