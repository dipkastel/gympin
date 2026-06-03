import React, {useEffect, useState} from 'react';
import {userCanBuyThisTicket} from "../../../../helper/utils";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {Warning} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {getBuyForOtherSupport, getCheckoutType} from "../../../../helper/serverSettingsHelper";
import {purchasedSubscribe_enterRequest} from "../../../../network/api/purchasedSubscribe.api";

const _UserCanBuyThisTicket = ({ticket}) => {



    const serverSettings = useSelector(settings => settings);
    const [buyForOtherSupport] = useState(getBuyForOtherSupport(serverSettings));
    const currentUser = useSelector(state => state.auth.user)
    const [openModal,setOpenModal] = useState(false);




    function renderModal() {

        return(<Dialog
            className={"w-100"}
            open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle>محدودیت خرید از سمت شرکت!</DialogTitle>
            <DialogContent className={"w-100"}>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    {"خرید بلیط برای شخص دیگر، توسط "+buyForOtherSupport+" پشتیبانی نمی‌شود."}
                </Typography>
                <Typography sx={{paddingBottom:1}} variant={"body1"}>
                    {"شما می‌توانید این بلیط را با شارژ کیف پول شخصی تهیه نمایید."}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"error"} onClick={() => setOpenModal(false)}> متوجه شدم </Button>
            </DialogActions>
        </Dialog>)
    }

    return (
        <>
            {buyForOtherSupport&&
            currentUser.Gender!=ticket.Gender&&
            <IconButton onClick={(e)=>setOpenModal(true)} ><Warning color={"warning"} /></IconButton>
            }
            {renderModal()}
        </>
    );
};

export default _UserCanBuyThisTicket;
