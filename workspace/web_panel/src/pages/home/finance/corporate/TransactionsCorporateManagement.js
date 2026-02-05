import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import TableContainer from "@mui/material/TableContainer";
import {Table} from "react-bootstrap";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {getUserFixedName, toPriceWithComma} from "../../../../helper";
import {TransactionStatus} from "../../../../helper/enums/TransactionStatus";
import {transactionCorporate_query} from "../../../../network/api/transactionsCorporate.api";
import {TransactionCorporateTypes} from "../../../../helper/enums/TransactionCorporateTypes";
import {getRppTransactionCorporateManagement, SetRppTransactionCorporateManagement} from "../../../../helper/pocket/pocket";
import PopoverUser from "../../../../components/popover/PopoverUser";

const TransactionsCorporateManagement = () => {
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppTransactionCorporateManagement());
    const [transactions, SetTransactions] = useState({});


    useEffect(() => {
        getTransactions()
    }, [page, rowsPerPage]);

    function getTransactions() {
        transactionCorporate_query({
            queryType: "FILTER",
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((result) => {
            SetTransactions(result.data.Data)
        });
    }


    function getCorporate(row) {
       var corporateName ;
       if(row.CorporatePersonnel)
           corporateName = row.CorporatePersonnel.Corporate.Name
       if(row.CorporateFinance)
           corporateName = row.CorporateFinance.Corporate.Name

       return corporateName;
    }

    return (
        <>

            <Portlet>
                <PortletHeader title="تراکنش های سازمان"/>
                <PortletBody>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium">

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مربوط</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>مبلغ</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>حساب قبل از تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نوع تراکنش</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>یادداشت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>ایجاد کننده</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.content && transactions.content.map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox"
                                                  sx={{backgroundColor: (row.Amount > 0) ? "#d3fcef" : "#f5d2d2"}}
                                                  key={row.Id.toString()}>

                                            <TableCell component="th" id={`transaction-${index}`} scope="row"
                                                       padding="normal" align="right">{row.Id}</TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {(row.CorporatePersonnel!=null)?
                                                    (<PopoverUser user ={row.CorporatePersonnel?.User} /> + " از سازمان " + getCorporate(row))
                                                :getCorporate(row)}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {toPriceWithComma(row.Amount)}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {toPriceWithComma(row.LatestBalance)}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {TransactionStatus[row.TransactionStatus]}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {TransactionCorporateTypes[row.TransactionType]}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {row.Description}
                                            </TableCell>
                                            <TableCell component="th" padding="normal" align="right">
                                                {<PopoverUser user ={row.CreatorUser} />}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {(transactions.totalElements > 0) && <TablePagination
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={transactions.totalElements || 0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param) => {
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(rowsPerPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppTransactionCorporateManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default TransactionsCorporateManagement;
