import React, {useState} from 'react';
import {Dialog, DialogTitle, IconButton, Typography} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import _PlaceCoachListItem from "./_PlaceCoachListItem";

const _ticketCoach = ({Course}) => {
    const [openModalInfo, setOpenModalInfo] = useState(false)


    function renderModalInfo() {
        return (<>

            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModalInfo} onClose={() => setOpenModalInfo(false)}>
                <DialogTitle bgcolor={"#888888"} color={"white"} sx={{p:1,mb:1,borderBottom:"solid 2px #e7333e"}}>{Course.Coaches.length==1?"مربی : ":"مربیان"}</DialogTitle>
                {Course.Coaches.map(coach=>(
                    <>
                        <_PlaceCoachListItem coach={coach} />

                    </>
                ))}
            </Dialog>
        </>)
    }

    return (
        <>
            <IconButton
                onClick={() => {
                    setOpenModalInfo(true)
                }}
                color={"secondary"}>
                <PersonIcon/>
            </IconButton>
            {renderModalInfo()}
        </>
    );
};

export default _ticketCoach;
