import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Chip, TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName, toPriceWithComma} from "../../../../../helper";
import {genders} from "../../../../../helper/enums/genders";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import {BuyableType} from "../../../../../helper/enums/BuyableType";
import {Purchased_query} from "../../../../../network/api/purchased.api";
import TablePagination from "@mui/material/TablePagination";
import {getRppPlaceSells, SetRppPlaceSells} from "../../../../../helper/pocket/pocket";
import PopoverUser from "../../../../../components/popover/PopoverUser";
import _TicketStatus from "../../../purchased/partials/_TicketStatus";

const PlaceSells = ({place}) => {


    const error = useContext(ErrorContext);
    const history = useHistory();
    const [buyables, setBuyables] = useState([]);


    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(getRppPlaceSells());
    const [searchText, SetSearchText] = useState(null);


    useEffect(() => {
        getPurchased();
    }, [searchText, page, perPage]);

    function getPurchased() {
        Purchased_query({
            queryType: "SEARCH",
            Name: searchText,
            PlaceId:place.Id,
            paging: {
                Page: page,
                Size: perPage,
                Desc: true
            }
        }).then((result) => {
            setBuyables(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }
    function getStatusCollor(row) {
        switch (row.PurchasedStatus) {
            case "PAYMENT_WAIT":
                return "info";
            case "READY_TO_ACTIVE":
                return "default";
            case "CANCEL":
                return "error";
            case "EXPIRE":
                return "warning";
            case "ACTIVE":
                return "success";
            case "PROCESSING":
                return "secondary";
            case "COMPLETE":
                return "primary";
        }
    }

    return (
        <>
            <Portlet>
                <PortletHeader title={"فروش های مرکز " + place.Name}/>
                <PortletBody>
                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">مرکز</TableCell>
                                <TableCell align="right">نام</TableCell>
                                <TableCell align="right">خریدار</TableCell>
                                <TableCell align="right">قیمت فروش</TableCell>
                                <TableCell align="right">قیمت مرکز</TableCell>
                                <TableCell align="right">نوع بلیط</TableCell>
                                <TableCell align="right">جنسیت</TableCell>
                                <TableCell align="right">وضعیت</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {buyables.content && buyables.content.map((item, number) => (
                                <TableRow hover role={"checkbox"} tabIndex={-1}
                                          key={"searched" + item.Id.toString()}>
                                    <TableCell align="right">{item.Place.Name}</TableCell>
                                    <TableCell align="right">{item.Name}</TableCell>
                                    <TableCell align="right">{<PopoverUser user ={item.Customer} />}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(item.SellPrice)}</TableCell>
                                    <TableCell align="right">{toPriceWithComma(item.PlacePrice)}</TableCell>
                                    <TableCell align="right">{BuyableType[item.PurchasedType]}</TableCell>
                                    <TableCell align="right">{genders[item.Gender]}</TableCell>
                                    <TableCell align="right"><Chip color={getStatusCollor(item)} size={"small"} label={[item.PurchasedStatus]}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {(buyables.totalElements>0) &&<TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={buyables.totalElements||0}
                        labelRowsPerPage={"تعداد نمایش"}
                        labelDisplayedRows={(param)=>{
                            return `${param.from} تا ${param.to} از ${param.count !== -1 ? param.count : `بیش از ${param.to}`}`
                        }}
                        rowsPerPage={parseInt(perPage)}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setPerPage(parseInt(event.target.value, 10));
                            SetRppPlaceSells(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default PlaceSells;
