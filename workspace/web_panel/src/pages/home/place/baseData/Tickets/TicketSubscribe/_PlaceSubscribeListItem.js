import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import {
    ArrowDownward, ArrowUpward, ExpandLess, ExpandMore,
    GroupOutlined,
    HistoryToggleOffOutlined,
    HourglassTopOutlined,
    MedicalInformationOutlined,
    PaymentsOutlined,
    SupervisorAccountOutlined
} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {TicketSubscribes_ChangeTicketSubscribesStatus, TicketSubscribes_delete} from "../../../../../../network/api/ticketSubscribes.api";
import {genders} from "../../../../../../helper/enums/genders";
import {toPriceWithComma} from "../../../../../../helper";
import _SubscribeDeactiveDelete from "./partials/_SubscribeDeactiveDelete";
import _ticketSubscribeActiveTimes from "./partials/_ticketSubscribeActiveTimes";
import _ticketInfo from "./partials/_ticketInfo";
import _SubscribeSport from "./partials/_SubscribeSports";
import _EditSubscribeModal from "./partials/_EditSubscribeModal";
import _ticketCoach from "./partials/_ticketCoach";
import _CopySubscribe from "./partials/_CopySubscribe";


const _PlaceSubscribeListItem = ({place,subscribe, reloadList}) => {

    const error = useContext(ErrorContext);
    const [deleteItem, setDeleteItem] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [openDetails,setOpenDetails] = useState(false);

    useEffect(() => {
        reloadList();
    }, [itemToEdit]);

    function ActiveSubscribe(subscribe) {
        TicketSubscribes_ChangeTicketSubscribesStatus({...subscribe,Enable : true}).then(result => {
            reloadList();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
                setItemToEdit(subscribe);
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            setDeleteItem(null);
            TicketSubscribes_delete({Id: deleteItem.Id}).then(result => {
                reloadList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (deleteItem) ? (
            <div>
                <Dialog open={!!deleteItem} onClose={() => setDeleteItem(null)}>
                    <DialogTitle>حذف</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"آیا حذف " + deleteItem.Name + " را تایید می کنید؟"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItem(null)}>لغو</Button>
                        <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        ) : (<></>)
    }

    return (
        <Grid key={"ticket" + subscribe.Id} size={{xs: 2, sm: 2, md: 2, lg: 1, xl: 1}} sx={{width: "100%"}}>
            <Card variant={"outlined"} elevation={2} sx={{
                width: "100%",
                transition: "0.3s",
                boxShadow: 1,
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 6,
                }
            }}>
                <CardHeader
                    component={"a"}
                    sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                    title={<Typography variant={"h5"} onClick={(e)=>setOpenDetails(!openDetails)}>
                        {subscribe.Name}
                        {openDetails?<ExpandLess />:<ExpandMore />}
                    </Typography>}
                    action={<>
                        <_CopySubscribe  subscribe={subscribe} reloadList={reloadList}/>
                        <_SubscribeDeactiveDelete subscribe={subscribe} reloadList={reloadList}/>
                    </>}
                />
                <CardContent sx={{pt: 0}}>

                    <Collapse in={openDetails} timeout="auto" unmountOnExit>
                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><GroupOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                   variant={"body2"}
                                                                                                   color={"gray.contrastText"}>جنسیت</Typography></Grid>

                        <Grid container direction={"row"} alignItems={"center"}>
                            <Typography variant={"body2"} color={"gray.contrastText"}
                                        sx={{fontSize: "0.8rem"}}>{genders[subscribe.Gender]}</Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><PaymentsOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                      variant={"body2"}
                                                                                                      color={"gray.contrastText"}>تعداد
                            جلسات</Typography> </Grid>
                        <Grid container direction={"row"} alignItems={"center"}><Typography variant={"h3"} color={"gray.contrastText"}
                                                                                            sx={{
                                                                                                fontSize: "0.8rem",
                                                                                                fontWeight: 600
                                                                                            }}>{subscribe.EntryTotalCount}</Typography>
                        </Grid>
                    </Grid>

                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><HourglassTopOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                          variant={"body2"}
                                                                                                          color={"gray.contrastText"}>انقضا</Typography></Grid>
                        <Grid><Typography variant={"body2"} color={"gray.contrastText"} sx={{fontSize: "0.9rem", fontWeight: 600}}>
                            {subscribe.ExpireDuration||0 + " روز"}</Typography></Grid>
                    </Grid>

                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><HistoryToggleOffOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                              variant={"body2"}
                                                                                                              color={"gray.contrastText"}>زمان
                            استفاده</Typography></Grid>
                        <Grid>
                            <_ticketSubscribeActiveTimes subscribe={subscribe}/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><MedicalInformationOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                                variant={"body2"}
                                                                                                                color={"gray.contrastText"}>اطلاعات
                            لازم</Typography></Grid>
                        <Grid>
                            <_ticketInfo subscribe={subscribe}/>
                        </Grid>
                    </Grid>
                    {/*{subscribe?.Coaches?.length > 0 &&*/}
                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><SupervisorAccountOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                               variant={"body2"}
                                                                                                               color={"gray.contrastText"}>مربی</Typography></Grid>
                        <Grid>
                            <_ticketCoach place={place} subscribe={subscribe} reloadList={reloadList}/>
                        </Grid>
                    </Grid>
                    <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                        <Grid><SupervisorAccountOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography sx={{display: "inline"}}
                                                                                                               variant={"body2"}
                                                                                                               color={"gray.contrastText"}>ورزش
                            ها</Typography></Grid>
                        <Grid>
                            <_SubscribeSport place={place} ticketSubscribe={subscribe}/>
                        </Grid>
                    </Grid>
                    </Collapse>
                    {subscribe.Enable && <Button variant={"contained"} color={"primary"} onClick={() => setItemToEdit(subscribe)}
                                                 sx={{mt: 1}} fullWidth>
                        <Grid container sx={{width: "100%", minHeight: 25}} columns={42}>
                            <Grid size={20} container direction={"column"} justifyContent={"center"} alignContent={"center"}
                                  alignItems={"start"}>
                                <Grid>
                                    <Typography component={"span"} variant={"h5"}
                                                sx={{fontSize: "0.8rem"}}>{toPriceWithComma(subscribe.PlacePrice) + " تومان"}</Typography>
                                </Grid>
                            </Grid>
                            <Grid size={1}>

                                <Divider orientation="vertical"
                                         sx={{height: "25px", width: "1px", borderColor: "#FFFFFF", borderStyle: "dashed"}}
                                         component="div"/>
                            </Grid>
                            <Grid alignContent={"center"} size={21}>
                                <Typography component={"span"} variant={"h5"} sx={{fontSize: "0.8rem"}}>ویرایش</Typography>
                            </Grid>
                        </Grid>
                    </Button>}
                    {!subscribe.Enable && <Button variant={"contained"} color={"secondary"} onClick={() => ActiveSubscribe(subscribe)}
                                                  sx={{mt: 1}} fullWidth>
                        <Typography variant={"h6"}>{"فعالسازی"}</Typography>
                    </Button>}
                    <Button variant={"contained"} color={"info"} href={"/place/ticketSubscribe/"+subscribe.Id }
                                                  sx={{mt: 1}} fullWidth>
                        <Typography variant={"h6"}>{"جزییات بلیط"}</Typography>
                    </Button>
                </CardContent>
            </Card>
            {ModalDelete()}
            <_EditSubscribeModal subscribe={itemToEdit} setSubscribe={setItemToEdit} reloadList={reloadList}/>
        </Grid>
    );
};

export default _PlaceSubscribeListItem;
