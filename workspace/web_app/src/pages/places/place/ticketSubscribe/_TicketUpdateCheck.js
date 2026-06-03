import React, {useEffect, useState} from 'react';
import {userCanBuyThisTicket} from "../../../../helper/utils";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {InfoRounded, Warning} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {getBuyForOtherSupport, getCheckoutType} from "../../../../helper/serverSettingsHelper";
import {purchasedSubscribe_enterRequest} from "../../../../network/api/purchasedSubscribe.api";

const _TicketUpdateCheck = ({ticket}) => {


    const [expireError,setExpireError] = useState(false);
    const serverSettings = useSelector(settings => settings);
    const [buyForOtherSupport] = useState(getBuyForOtherSupport(serverSettings));
    const currentUser = useSelector(state => state.auth.user)
    const [openModal,setOpenModal] = useState(false);

    useEffect(()=>{

        const today = new Date();
        const nintyDaysAgo = new Date(today);
        nintyDaysAgo.setDate(today.getDate() - 90);
        setExpireError(new Date(ticket.UpdatedDate||ticket.CreatedDate)<nintyDaysAgo)
    })



    function renderModal() {
        return(<Dialog
            className={"w-100"}
            open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle>بروزرسانی قیمت</DialogTitle>
            <DialogContent className={"w-100"}>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    {"قیمت و اطلاعات بلیط بروز نشده !"}
                </Typography>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    {"حتما قبل از خرید با مجموعه تماس بگیرید."}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"error"} onClick={() => setOpenModal(false)}> متوجه شدم </Button>
            </DialogActions>
        </Dialog>)
    }

    return (
        <>

            {expireError&&<IconButton onClick={(e)=>setOpenModal(true)} ><InfoRounded color={"error"} /></IconButton>
            }
            {renderModal()}
        </>
    );
};

export default _TicketUpdateCheck;
