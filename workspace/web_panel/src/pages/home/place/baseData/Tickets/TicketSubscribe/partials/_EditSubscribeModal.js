import React, {useContext, useEffect, useState} from 'react';
import {CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import _SubscribeBaseData from "./_SubscribeBaseData";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {TicketSubscribes_getById} from "../../../../../../../network/api/ticketSubscribes.api";

const _EditSubscribeModal = ({subscribe,setSubscribe,reloadList}) => {

    const error = useContext(ErrorContext);
    const [ticketSubscribe, setTicketSubscribe] = useState(null);

    useEffect(() => {
        getSubscribeData();
    }, [subscribe]);
    function getSubscribeData(){
        if(subscribe)
        TicketSubscribes_getById({id:subscribe.Id}).then(result=>{
             setTicketSubscribe(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    if(!subscribe) return <></>
    return (

        <div>
            <Dialog open={true} onClose={() => setSubscribe(null)}>
                <DialogTitle>{"ویرایش "+subscribe.Name}</DialogTitle>
                <DialogContent>
                    {!!ticketSubscribe&&<DialogContentText>
                        <_SubscribeBaseData ticketSubscribe={subscribe} setSubscribe={setSubscribe} getSubscribeData={getSubscribeData} reloadList={reloadList}/>
                    </DialogContentText>}
                    {!ticketSubscribe&&<DialogContentText sx={{p:10,alignContent:"center"}}>
                        <CircularProgress size="1.5rem" />
                    </DialogContentText>}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default _EditSubscribeModal;
