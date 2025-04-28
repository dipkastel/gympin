import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {getRppAffiliateManagement, SetRppAffiliateManagement, SetRppArticlesManagement} from "../../../helper/pocket/pocket";
import {Article_query} from "../../../network/api/article.api";
import {affiliate_query} from "../../../network/api/affiliate.api";
import Notice from "../../partials/content/Notice";
import {Button, Card, CardContent, CardHeader, Chip, Grid, TextField} from "@mui/material";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import AddIcon from "@mui/icons-material/Add";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Image} from "react-bootstrap";
import {ArticleStatus} from "../../../helper/enums/ArticleStatus";
import TablePagination from "@mui/material/TablePagination";
import {getUserFixedName} from "../../../helper";

const AffiliateManagement = () => {


    const error = useContext(ErrorContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppAffiliateManagement());
    const [affiliatorsList, setAffiliatorsList] = useState([]);


    useEffect(() => {
        getAffiliators();
    }, []);


    function getAffiliators() {

        affiliate_query({
            queryType: "SEARCH",
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((data) => {
            setAffiliatorsList(data.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }

    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">مدیریت همکاران فروش</Notice>

            <Portlet>
                <PortletHeader
                    title="همکاران فروش"

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
                                    <TableCell align="right" padding="normal" sortDirection={false}>کاربر</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کمیسیون</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام کاربری</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>درامد</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تعداد شرکت ها</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تعداد مراکز</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {affiliatorsList.content && affiliatorsList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover  role="checkbox" tabIndex={-1} key={row.Id.toString()}>

                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.Id}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{getUserFixedName(row.User)}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.CommissionFee}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.Username}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.Income}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.CorporateCount}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right">{row.PlaceCount}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal" align="right"></TableCell>


                                            {/*<TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} component="th" id={labelId} scope="row" padding="normal"*/}
                                            {/*           align="right">{row.Id}</TableCell>*/}
                                            {/*<TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} align="right">*/}
                                            {/*    <Image width={"35px"}*/}
                                            {/*           src={row.ArticleImage ? row.ArticleImage.Url : "https://api.gympin.ir/resource/image?Id=11"}/>*/}
                                            {/*</TableCell>*/}
                                            {/*<TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} align="right">{row.Title}</TableCell>*/}
                                            {/*<TableCell onClick={(event) => {history.push({pathname: "/articles/details/" + row.Id});}} align="right">*/}
                                            {/*    <Chip label={ArticleStatus[row.ArticleStatus]}*/}
                                            {/*          color={(row.ArticleStatus ? (row.ArticleStatus.startsWith("PUBLISHED") ? "success" : "error") : "error")}/>*/}
                                            {/*</TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {affiliatorsList.content && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={affiliatorsList.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppAffiliateManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default AffiliateManagement;
