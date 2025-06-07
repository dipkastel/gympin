import React, {useEffect, useRef, useState} from 'react';
import {Button, ButtonGroup, LinearProgress, TextField} from "@mui/material";
import {Add, Check, DeleteOutline, Remove} from "@mui/icons-material";
import {ProgressBar} from "react-bootstrap";

const _ProInvoiceItemCount = ({item,addOrder,removeOrder,setOrderCount}) => {
    const [itemInValue,setItemInValue] = useState(item.Count);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        setItemInValue(item.Count);
        setLoading(false);
    }, [item]);

    function inAddOrder(item){
        setLoading(true);
        addOrder(item);
    }
    function inRemoveOrder(item){
        setLoading(true);
        removeOrder(item);
    }

    function inSetOrderCount(item){
        setLoading(true);
        setOrderCount(item,itemInValue);
    }

    return (
        <>
            {!loading?<ButtonGroup sx={{mt: 1}} variant={"outlined"} size={"small"}>
                <Button sx={{px: 1, minWidth: "inherit !important", borderRightColor: "#66bb6a80 !important"}} color={"success"}
                        onClick={(e) => (item.Count == itemInValue) ? inAddOrder(item.Buyable.Id) : inSetOrderCount(item)}>
                    {item.Count == itemInValue ? <Add/> : <Check/>}
                </Button>
                <TextField value={itemInValue} maxLength={3}
                           onChange={(e) => setItemInValue(e.target.value)}
                           aria-valuemax={999} type={"number"}
                           inputProps={{className: "px-0 py-2 text-center"}} className={"count"}/>
                <Button color={"error"} onClick={(e) => inRemoveOrder(item)}>{item.Count < 2 ? <DeleteOutline/> : <Remove/>}</Button>
            </ButtonGroup>:<>
                <LinearProgress sx={{width:"120px",mt:3}} />
                </>}
        </>
    );
};

export default _ProInvoiceItemCount;
