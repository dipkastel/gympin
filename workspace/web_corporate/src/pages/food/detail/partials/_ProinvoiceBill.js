import React from 'react';
import {Divider, Typography} from "@mui/material";
import {toPriceWithComma} from "../../../../helper/utils";

const _ProinvoiceBill = ({CurrentBasket}) => {

    function getCalculatedBill(){

        return  CurrentBasket.InvoiceBuyables.reduce( function(a, b){
            return a + (b.Count*b.Buyable.Price);
        }, 0);
    }
    function getItemFoodCounts(){

        return  CurrentBasket.InvoiceBuyables.reduce( function(a, b){
            return a + b.Count;
        }, 0);
    }
    function getCalculatedBillTax(){
        return  getCalculatedBill()*0.1;
    }
    function getPlatesPrice(){
        return  getItemFoodCounts()*14800;
    }
    return (
        <>
            <Typography variant={"body2"} >{"جمع غذا "+toPriceWithComma(getCalculatedBill())+" تومان"}</Typography>
            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,my:1, width: "100%"}}
                     component="div"/>
            <Typography variant={"body2"} >{"ارزش افزوده "+toPriceWithComma(getCalculatedBillTax())+" تومان"}</Typography>
            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,my:1, width: "100%"}}
                     component="div"/>
            <Typography variant={"body2"} >{"ظروف "+toPriceWithComma(getPlatesPrice())+" تومان"}</Typography>
            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,my:1, width: "100%"}}
                     component="div"/>
            <Typography variant={"body2"} >ارسال 300,000 تومان</Typography>
            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,my:1, width: "100%"}}
                     component="div"/>
            <Typography variant={"subtitle1"} >قابل پرداخت 43,780,000 تومان</Typography>
        </>
    );
};

export default _ProinvoiceBill;
