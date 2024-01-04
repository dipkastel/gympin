import React, {useState} from 'react';
import {Dialog, DialogTitle, IconButton, Typography} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

const _ticketInfo = ({subscribe}) => {
    const [openModalInfo, setOpenModalInfo] = useState(false)


    function renderModalInfo() {
        return (<>
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModalInfo} onClose={() => setOpenModalInfo(false)}>
                <DialogTitle bgcolor={"#888888"} color={"white"} sx={{p:1,mb:1,borderBottom:"solid 2px #e7333e"}}>اطلاعات اضافی</DialogTitle>
                <Typography variant={"h1"} sx={{m:2}}>
                    {subscribe.Description}
                </Typography>
            </Dialog>
        </>)
    }

    return (
        <>
            <IconButton
                onClick={() => {
                    setOpenModalInfo(true)
                }}
                color={"error"}>
                <DescriptionIcon/>
            </IconButton>
            {renderModalInfo()}
        </>
    );
};

export default _ticketInfo;
