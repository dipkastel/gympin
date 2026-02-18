import React, {useContext, useState} from 'react';
import {ToggleOff} from "@mui/icons-material";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    Tab,
    Tabs, TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {TicketSubscribes_ChangeTicketSubscribesStatus, TicketSubscribes_delete} from "../../../../network/api/ticketSubscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _SubscribeDeactiveDelete = ({subscribe,reloadList}) => {
    const error = useContext(ErrorContext);
    const [openModal,setOpenModal] = useState(false)
    const [selectedTab,setSelectedTab] = useState(0)


    function deleteSubscribe(e){
        e.preventDefault()
        if(!e.target.Description.value){
            error.showError({message: "دلیل حذف وارد نشده",});
            return
        }
        if(e.target.PlacePrice.value.toString()!=subscribe.PlacePrice){
            error.showError({message: "قیمت بلیط صحیح نیست",});
            return
        }
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

    function deactiveSubscribe(e){
        e.preventDefault();

        if(!e.target.Description.value){
            error.showError({message: "دلیل غیرفعال سازی وارد نشده",});
            return
        }
        TicketSubscribes_ChangeTicketSubscribesStatus({...subscribe,Enable:false}).then(result => {
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



    function renderModalDnD(){
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
                    TabIndicatorProps={{ sx: { display: "none" } }}
                    sx={{background: "linear-gradient(90deg, #ff416c, #ff4b2b)"}}
                >
                    <Tab sx={{color: "white"}} label="غیر فعال سازی" id={"DEACTIVE"} aria-controls={"DND-0"}/>
                    <Tab sx={{color: "white"}} label="حذف بلیط" id={"DELETE"} aria-controls={"DND-1"}/>
                </Tabs>
                <DialogContent>
                    {selectedTab==0&&<>
                        <Form onSubmit={(e) => deactiveSubscribe(e)}>
                            <FormControl fullWidth>
                                <Typography variant={"h6"} >{"غیرفعال سازی "+subscribe.Name}</Typography>
                                <Typography sx={{mt:2}} variant={"subtitle1"} >{"با انجام عملیات غیرفعال سازی، این بلیط دیگر قابل خرید نخواهد بود"}</Typography>
                                <Typography variant={"body2"} >{"تمامی بلیط های فروخته شده از این نوع تا این لحظه برای کاربر قابل استفاده خواهد بود و احتمال مراجعه کاربر تا 72 ساعت وجود دارد"}</Typography>
                                <TextField
                                    name={"Description"}
                                    label="دلیل غیر فعال سازی"
                                    type="text"
                                    aria-multiline={"true"}
                                    minRows={3}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    sx={{mt:2}}
                                />
                                <Button sx={{my:2}} variant={"contained"} type={"submit"}>غیر فعال سازی</Button>
                            </FormControl>
                        </Form>
                    </>}
                    {selectedTab==1&&<>
                        <Form onSubmit={(e) => deleteSubscribe(e)}>
                            <FormControl fullWidth>
                                <Typography variant={"h6"} >{"حذف بلیط "+subscribe.Name}</Typography>
                                <Typography variant={"subtitle1"} >{"با انجام عملیات حذف، این بلیط دیگر در دسترس نخواهد بود"}</Typography>
                                <Typography variant={"body2"} >{"تمامی بلیط های فروخته شده از این نوع برای کاربر قابل استفاده خواهد بود و احتمال مراجعه کاربر تا 72 ساعت وجود دارد"}</Typography>
                                <TextField
                                    name={"Description"}
                                    label="دلیل حذف بلیط"
                                    type="text"
                                    aria-multiline={"true"}
                                    minRows={3}
                                    fullWidth
                                    multiline
                                    variant="outlined"
                                    sx={{mt:2}}
                                />
                                <Typography sx={{mt:1}} variant={"body2"} >{"برای اطمینان از حذف بلیط قیمت فعلی بلیط را وارد نمایید"}</Typography>
                                <TextField
                                    name={"PlacePrice"}
                                    label="قیمت فعلی بلیط"
                                    type={"number"}
                                    fullWidth
                                    variant={"outlined"}
                                    sx={{mt:1}}
                                />
                                <Button sx={{my:2}} variant={"contained"} type={"submit"}>حذف</Button>
                            </FormControl>
                        </Form>
                    </>}
                </DialogContent>
            </Dialog>)
    }

    return (
        <>
            <IconButton onClick={(e)=>setOpenModal(true)} ><ToggleOff color={"error"}/></IconButton>
            {renderModalDnD()}
        </>
    );
};

export default _SubscribeDeactiveDelete;
