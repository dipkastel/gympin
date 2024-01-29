import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {BuyableType} from "../../../../../helper/enums/BuyableType";
import {Portlet, PortletBody, PortletHeader} from "../../../../partials/content/Portlet";
import {useHistory} from "react-router-dom";

const _InvoicePurchaseds = ({PurchasedBases}) => {
    const history = useHistory();

    function goToPurchased(row) {
        switch(row.PurchasedType){
            case "SUBSCRIBE":return  history.push({pathname: "/subscribe/data/" + row.Id});
            case "COURSE":return  history.push({pathname: "/course/data/" + row.Id});
        }
    }

    return (
        <>
            {PurchasedBases && <Portlet>
                <PortletHeader title="بلیط های خریداری شده"/>
                <PortletBody>
                    <Table className={"table"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Id</TableCell>
                                <TableCell align="right">نوع</TableCell>
                                <TableCell align="right">خرید</TableCell>
                                <TableCell align="right">مرکز</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {PurchasedBases.map((row, number) => (
                                <TableRow key={"purchased-" + number} hover onClick={(event) => goToPurchased(row)}>
                                    <TableCell align="right">{row.Id}</TableCell>
                                    <TableCell align="right">{BuyableType[row.PurchasedType]}</TableCell>
                                    <TableCell align="right">{row.Name}</TableCell>
                                    <TableCell align="right">{row.Place.Name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </PortletBody>
            </Portlet>}
        </>
    );
};

export default _InvoicePurchaseds;
