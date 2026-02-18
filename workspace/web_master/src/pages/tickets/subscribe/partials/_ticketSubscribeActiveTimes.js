import React, {useContext, useState} from 'react';
import {Chip, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _ticketSubscribeActiveTimes = ({subscribe}) => {
    const [openModalTimes, setOpenModalTimes] = useState(false)


    function renderModalHallTime() {
        return (<>
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModalTimes} onClose={() => setOpenModalTimes(false)}>
                <DialogTitle bgcolor={"#888888"} color={"white"} sx={{p: 1, mb: 1, borderBottom: "solid 2px #e7333e"}}>زمان
                    ها و سالن های قابل استفاده</DialogTitle>
                <DialogContent>
                    <Typography variant={"h5"} >{subscribe.Timing}</Typography>
                </DialogContent>
            </Dialog>
        </>)
    }

    return subscribe?.Timing?(
        <>
            <Typography variant={"body2"} >{subscribe.Timing.substr(0,12)+"..."}</Typography>
        </>
    ):(
        <Typography variant={"h3"} color={"error"}
                    sx={{fontSize: "0.8rem",fontWeight:600}} >نامشخص /ندارد</Typography>
    );
};

export default _ticketSubscribeActiveTimes;
