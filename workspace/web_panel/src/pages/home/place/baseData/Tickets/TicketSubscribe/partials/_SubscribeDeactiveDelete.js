import React, {useContext, useState} from 'react';
import {ToggleOff} from "@mui/icons-material";
import {Button, Dialog, DialogContent, FormControl, IconButton, Tab, Tabs, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../../../../components/GympinPagesProvider";
import {
    TicketSubscribes_ChangeTicketSubscribesStatus,
    TicketSubscribes_delete
} from "../../../../../../../network/api/ticketSubscribes.api";

const _SubscribeDeactiveDelete = ({subscribe, reloadList}) => {
    const error = useContext(ErrorContext);
    const [openModal, setOpenModal] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0)


    function deleteSubscribe(e) {
        e.preventDefault()
        TicketSubscribes_delete({Id: subscribe.Id}).then(result => {
            reloadList();
            setOpenModal(false);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function deactiveSubscribe(e) {
        e.preventDefault();
        TicketSubscribes_ChangeTicketSubscribesStatus({...subscribe, Enable: false}).then(result => {
            reloadList();
            setOpenModal(false);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function renderModalDnD() {
        return (
            <Dialog
                sx={{zIndex: 99999999}}
                fullWidth
                open={openModal} onClose={() => setOpenModal(false)}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    variant="fullWidth"
                    textColor="inherit"
                    TabIndicatorProps={{sx: {display: "none"}}}
                    sx={{background: "linear-gradient(90deg, #ff416c, #ff4b2b)"}}
                >
                    <Tab sx={{color: "white"}} label="غیر فعال سازی" id={"DEACTIVE"} aria-controls={"DND-0"}/>
                    <Tab sx={{color: "white"}} label="حذف بلیط" id={"DELETE"} aria-controls={"DND-1"}/>
                </Tabs>
                <DialogContent>
                    {selectedTab == 0 && <>
                        <Form onSubmit={(e) => deactiveSubscribe(e)}>
                            <FormControl fullWidth>
                                <Typography variant={"h6"}>{"غیرفعال سازی " + subscribe.Name}</Typography>
                                <Typography sx={{mt: 2}}
                                            variant={"subtitle1"}>{"با انجام عملیات غیرفعال سازی، این بلیط دیگر قابل خرید نخواهد بود"}</Typography>
                                <Typography
                                    variant={"body2"}>{"تمامی بلیط های فروخته شده از این نوع تا این لحظه برای کاربر قابل استفاده خواهد بود و احتمال مراجعه کاربر تا 72 ساعت وجود دارد"}</Typography>
                                <Button sx={{my: 2}} variant={"contained"} type={"submit"}>غیر فعال سازی</Button>
                            </FormControl>
                        </Form>
                    </>}
                    {selectedTab == 1 && <>
                        <Form onSubmit={(e) => deleteSubscribe(e)}>
                            <FormControl fullWidth>
                                <Typography variant={"h6"}>{"حذف بلیط " + subscribe.Name}</Typography>
                                <Typography variant={"subtitle1"}>{"با انجام عملیات حذف، این بلیط دیگر در دسترس نخواهد بود"}</Typography>
                                <Typography
                                    variant={"body2"}>{"تمامی بلیط های فروخته شده از این نوع برای کاربر قابل استفاده خواهد بود و احتمال مراجعه کاربر تا 72 ساعت وجود دارد"}</Typography>
                                <Button sx={{my: 2}} variant={"contained"} type={"submit"}>حذف</Button>
                            </FormControl>
                        </Form>
                    </>}
                </DialogContent>
            </Dialog>)
    }

    return (
        <>
            <IconButton onClick={(e) => setOpenModal(true)}><ToggleOff color={"error"}/></IconButton>
            {renderModalDnD()}
        </>
    );
};

export default _SubscribeDeactiveDelete;
