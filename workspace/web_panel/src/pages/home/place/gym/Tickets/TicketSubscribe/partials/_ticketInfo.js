import React, {useState} from 'react';
import {Chip, Dialog, DialogTitle, Typography} from "@mui/material";

const _ticketInfo = ({subscribe}) => {
    const [openModalInfo, setOpenModalInfo] = useState(false)

    function renderModalInfo() {
        return (<>
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModalInfo} onClose={() => setOpenModalInfo(false)}>
                <DialogTitle bgcolor={"#888888"} color={"white"} sx={{p: 1, mb: 1, borderBottom: "solid 2px #e7333e"}}>اطلاعات
                    اضافی</DialogTitle>
                <Typography variant={"subtitle2"} sx={{m: 2}}>
                    {subscribe.Description}
                </Typography>
            </Dialog>
        </>)
    }

    return subscribe?.Description ? (
        <>
            <Typography variant={"body2"}>
                {subscribe?.Description?.substring(0,12)+"..."}
            </Typography>
        </>
    ) : (
        <Typography variant={"h3"} color={"gray.contrastText"}
                    sx={{fontSize: "0.8rem", fontWeight: 600}}>نامشخص /ندارد</Typography>
    );
};

export default _ticketInfo;
