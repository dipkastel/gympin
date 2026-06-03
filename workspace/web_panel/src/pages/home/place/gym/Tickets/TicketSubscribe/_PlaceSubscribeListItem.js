import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TableCell,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {
    AddTask,
    DeleteRounded,
    ExpandLess,
    ExpandMore,
    InfoRounded, Percent,
    RadioButtonChecked,
    SupervisorAccountOutlined
} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {
    TicketSubscribes_ChangeTicketSubscribesStatus,
    TicketSubscribes_delete,
    TicketSubscribes_getById,
    TicketSubscribes_update
} from "../../../../../../network/api/ticketSubscribes.api";
import {genders} from "../../../../../../helper/enums/genders";
import _SubscribeSport from "./partials/_SubscribeSports";
import _ticketCoach from "./partials/_ticketCoach";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../helper";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Form} from "react-bootstrap";
import {classStatus} from "../../../../../../helper/enums/ClassStatus";


const _PlaceSubscribeListItem = ({place, subscribe, reloadList}) => {

    const error = useContext(ErrorContext);
    const [deleteItem, setDeleteItem] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [inSubscribe, setInSubscribe] = useState(null)

    useEffect(() => {
        setInSubscribe(subscribe);
    }, [subscribe]);

    useEffect(() => {
        if (openDetails)
            getSubscribeData();
    }, [openDetails]);

    function getSubscribeData() {
        if (subscribe)
            TicketSubscribes_getById({id: subscribe.Id}).then(result => {
                setInSubscribe(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
    }


    function ActiveSubscribe(subscribe) {
        TicketSubscribes_ChangeTicketSubscribesStatus({...subscribe, Enable: !subscribe.Enable}).then(result => {
            reloadList();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function updateSubscribe(e) {
        e.preventDefault();
        setOpenDetails(false);
        TicketSubscribes_update(inSubscribe).then(result => {
            reloadList();
            error.showError({message: "با موفقیت ثبت شد",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function ModalDelete() {
        function deleteSelectedItem(e) {
            e.preventDefault()
            setDeleteItem(false);
            TicketSubscribes_delete({Id: subscribe.Id}).then(result => {
                reloadList();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <div>
                <Dialog open={deleteItem} onClose={() => setDeleteItem(false)}>
                    <DialogTitle>حذف</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"آیا حذف " + subscribe.Name + " را تایید می کنید؟"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItem(false)}>لغو</Button>
                        <Button onClick={(e) => deleteSelectedItem(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }


    function priceChange(value) {
        setInSubscribe({
            ...inSubscribe,
            ValuePrice: toPriceWithoutComma(value),
            PlacePrice: toPriceWithoutComma(value),
            Price: toPriceWithoutComma(value)
        })
    }


    return (
        <>

            <TableRow key={subscribe.Id}  sx={{'& > *': {borderBottom: 'unset',padding:0}}}>
                <TableCell  align="right">
                    <Tooltip title={"وضعیت بلیط : "+(subscribe.Enable?"فعال":"غیر فعال")} placement="top">
                        <IconButton color={subscribe.Enable?"success":"error"} onClick={() =>ActiveSubscribe(subscribe)}>
                            <RadioButtonChecked />
                        </IconButton>
                    </Tooltip>
                    <Tooltip onClick={(e) => setOpenDetails(!openDetails)} title={subscribe.Id} placement="top">
                        {subscribe.Name}
                    </Tooltip>
                </TableCell>
                <TableCell onClick={(e) => setOpenDetails(!openDetails)} align="right" component="th" scope="row">
                    <Tooltip title={"ارزش بلیط : " + toPriceWithComma(subscribe.ValuePrice)} placement="top">
                        <ListItemText
                            primary={<>{toPriceWithComma(subscribe.PlacePrice)}{(subscribe.ValuePrice != subscribe.PlacePrice)&&<Percent color={"error"} />}</>}
                            primaryTypographyProps={{
                                sx: {
                                    textDecoration: "line-through",
                                    display: subscribe.Price != subscribe.PlacePrice ? "block" : "none"
                                }
                            }}
                            secondary={toPriceWithComma(subscribe.Price)}
                            secondaryTypographyProps={{variant: "body1",py:subscribe.Price != subscribe.PlacePrice ?0:1.3}}
                        />

                    </Tooltip>
                </TableCell>
                <TableCell align="right" onClick={(e) => setOpenDetails(!openDetails)}>{genders[subscribe.Gender]}</TableCell>
                <TableCell align="left">
                    <IconButton color={"primary"} href={"/gyms/ticketSubscribe/" + subscribe.Id}>
                        <Tooltip title={"جزییات"} placement="top">
                            <InfoRounded/>
                        </Tooltip>
                    </IconButton>
                    <IconButton color={"error"} onClick={(e) => setDeleteItem(true)}>
                        <Tooltip title={"حذف"} placement="top">
                            <DeleteRounded/>
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={(e) => setOpenDetails(!openDetails)}>
                        {openDetails ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={openDetails} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table>
                                <TableBody>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell colSpan={4}>
                                            {/*{subscribe?.Coaches?.length > 0 &&*/}


                                            <Form onSubmit={(e) => updateSubscribe(e)}>

                                                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"} spacing={2}>
                                                    <Grid size={{xs: 6, sm: 6, md: 4, xl: 4}}>
                                                        <TextField
                                                            name={"Name"}
                                                            sx={{my: 1}}
                                                            value={inSubscribe?.Name || ""}
                                                            onChange={(e) => setInSubscribe({...inSubscribe, Name: e.target.value})}
                                                            margin="dense"
                                                            label="نام عضویت"
                                                            type="text"
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </Grid>

                                                    <Grid size={{xs: 6, sm: 6, md: 4, xl: 4}}>
                                                        <FormControl variant="standard"
                                                                     fullWidth>
                                                            <InputLabel id="demo-simple-select-standard-label">جنسیت</InputLabel>
                                                            <Select
                                                                value={inSubscribe?.Gender || ""}
                                                                onChange={(e) => setInSubscribe({...inSubscribe, Gender: e.target.value})}
                                                                label="جنسیت"
                                                                variant={"outlined"}
                                                                fullWidth
                                                            >
                                                                <MenuItem>انتخاب کنید</MenuItem>
                                                                {Object.keys(genders).map(g => (
                                                                    <MenuItem key={g} value={g}>{genders[g]}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid size={{xs: 6, sm: 6, md: 4, xl: 4}}>
                                                        <FormControl variant="standard" sx={{my: 1}}
                                                                     fullWidth>
                                                            <InputLabel id="demo-simple-select-standard-label">نوع کلاس</InputLabel>
                                                            <Select
                                                                value={inSubscribe?.SubscribeStatus || ""}
                                                                onChange={(e) => setInSubscribe({
                                                                    ...inSubscribe,
                                                                    SubscribeStatus: e.target.value
                                                                })}
                                                                label="نوع کلاس"
                                                                variant={"outlined"}
                                                                fullWidth
                                                            >
                                                                <MenuItem>انتخاب کنید</MenuItem>
                                                                {Object.keys(classStatus).map(g => (
                                                                    <MenuItem key={g} value={g}>{classStatus[g]}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid size={{xs: 6, sm: 6, md: 4, xl:4}}>
                                                        <TextField
                                                            name={"EntryTotalCount"}
                                                            value={inSubscribe?.EntryTotalCount || ""}
                                                            onChange={(e) => setInSubscribe({...inSubscribe, EntryTotalCount: e.target.value})}
                                                            margin="dense"
                                                            label="تعداد ورود"
                                                            type="number"
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 6, sm:6, md: 4, xl: 4}}>
                                                        <TextField
                                                            name={"SubscribeCapacity"}
                                                            value={inSubscribe?.SubscribeCapacity || ""}
                                                            onChange={(e) => setInSubscribe({...inSubscribe, SubscribeCapacity: e.target.value})}
                                                            margin="dense"
                                                            label="تعداد بلیط قابل فروش"
                                                            type="number"
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 12, md: 4, xl: 4}}>
                                                        <TextField
                                                            name={"ExpireDuration"}
                                                            value={inSubscribe?.ExpireDuration || ""}
                                                            onChange={(e) => setInSubscribe({...inSubscribe, ExpireDuration: e.target.value})}
                                                            margin="dense"
                                                            label="خرید تا انقضا (روز)"
                                                            type="number"
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </Grid>

                                                    <Grid size={{xs: 6, sm: 6, md: 6, xl: 6}}>
                                                        <TextField
                                                            name={"ValuePrice"}
                                                            value={toPriceWithComma(inSubscribe?.ValuePrice)}
                                                            onChange={(e) => priceChange(e.target.value)}
                                                            margin="dense"
                                                            label="ارزش عضویت (تومان)"
                                                            type="text"
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 6, sm: 6, md: 6, xl: 6}}>
                                                        <ListItemText
                                                            primary="قیمت عضویت (تومان)"
                                                            secondary={toPriceWithComma(inSubscribe?.PlacePrice)}
                                                            primaryTypographyProps={{variant: "body2"}}
                                                            secondaryTypographyProps={{variant: "h5", color: "#202020"}}
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 12, md: 12, xl: 12}}>
                                                        <TextField
                                                            name={"timing"}
                                                            value={inSubscribe?.Timing || ""}
                                                            onChange={(e) => setInSubscribe({...inSubscribe, Timing: e.target.value})}
                                                            margin="dense"
                                                            label="زمان فعالیت"
                                                            type="text"
                                                            aria-multiline={"true"}
                                                            minRows={3}
                                                            fullWidth
                                                            multiline
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 12, md: 12, xl: 12}}>
                                                        <TextField
                                                            name={"Description"}
                                                            value={inSubscribe?.Description || ""}
                                                            onChange={(e) => setInSubscribe({...inSubscribe, Description: e.target.value})}
                                                            margin="dense"
                                                            label="توضیح مخصوص این عضویت"
                                                            type="text"
                                                            aria-multiline={"true"}
                                                            minRows={3}
                                                            fullWidth
                                                            multiline
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 12, md: 6, xl: 6}}>
                                                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"}
                                                              alignItems={"center"}>
                                                            <Grid><SupervisorAccountOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography
                                                                sx={{display: "inline"}}
                                                                variant={"body2"}
                                                                color={"gray.contrastText"}>مربی</Typography></Grid>
                                                            <Grid>
                                                                <_ticketCoach place={place} subscribe={subscribe} reloadList={reloadList}/>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid sx={{mt: 1}} container justifyContent={"space-between"} direction={"row"}
                                                              alignItems={"center"}>
                                                            <Grid><SupervisorAccountOutlined sx={{mx: 1, color: "gray.contrastText"}}/><Typography
                                                                sx={{display: "inline"}}
                                                                variant={"body2"}
                                                                color={"gray.contrastText"}>ورزش
                                                                ها</Typography></Grid>
                                                            <Grid>
                                                                <_SubscribeSport place={place} ticketSubscribe={subscribe}/>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid size={{xs: 12, sm: 12, md: 6, xl: 6}}>
                                                        <FormControl fullWidth>
                                                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>




                                            </Form>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {ModalDelete()}
        </>
        // <Grid key={"ticket" + subscribe.Id} size={{xs: 2, sm: 2, md: 2, lg: 1, xl: 1}} sx={{width: "100%"}}>
        //     <Card variant={"outlined"} elevation={2} sx={{
        //         width: "100%",
        //         transition: "0.3s",
        //         boxShadow: 1,
        //         "&:hover": {
        //             transform: "translateY(-3px)",
        //             boxShadow: 6,
        //         }
        //     }}>
        //         <CardHeader
        //             component={"a"}
        //             sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
        //             title={<Typography variant={"h5"}>
        //                 {subscribe.Name}
        //             </Typography>}
        //             action={<>
        //                 <_CopySubscribe subscribe={subscribe} reloadList={reloadList}/>
        //                 <_SubscribeDeactiveDelete subscribe={subscribe} reloadList={reloadList}/>
        //             </>}
        //         />
        //         <CardContent sx={{pt: 0}}>
        //


        //         </CardContent>
        //     </Card>
        // </Grid>
    )
        ;
};

export default _PlaceSubscribeListItem;
