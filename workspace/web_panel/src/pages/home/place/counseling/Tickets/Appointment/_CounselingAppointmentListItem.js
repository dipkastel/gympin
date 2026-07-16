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
    Tooltip
} from "@mui/material";
import {
    DeleteRounded,
    ExpandLess,
    ExpandMore,
    InfoRounded,
    Percent,
    RadioButtonChecked
} from "@mui/icons-material";
import {ErrorContext} from "../../../../../../components/GympinPagesProvider";
import {genders} from "../../../../../../helper/enums/genders";
import {toPriceWithComma, toPriceWithoutComma} from "../../../../../../helper";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Form} from "react-bootstrap";
import {classStatus} from "../../../../../../helper/enums/ClassStatus";
import {
    TicketAppointments_ChangeTicketAppointmentsStatus,
    TicketAppointments_delete,
    TicketAppointments_getById,
    TicketAppointments_update
} from "../../../../../../network/api/TicketAppointments.api";


const _CounselingAppointmentListItem = ({counseling, appointment, reloadList}) => {

    const error = useContext(ErrorContext);
    const [deleteItem, setDeleteItem] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [inAppointment, setInAppointment] = useState(null)

    useEffect(() => {
        setInAppointment(appointment);
    }, [appointment]);


    useEffect(() => {
        if (openDetails)
            getAppointmentData();
    }, [openDetails]);

    function getAppointmentData() {
        if (appointment)
            TicketAppointments_getById({id: appointment.Id}).then(result => {
                setInAppointment(result.data.Data);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
    }


    function ActiveAppointments(item) {
        TicketAppointments_ChangeTicketAppointmentsStatus({...item, Enable: !item.Enable}).then(result => {
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

    function updateAppointment(e) {
        e.preventDefault();
        setOpenDetails(false);
        TicketAppointments_update(inAppointment).then(result => {
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
            TicketAppointments_delete({Id: appointment.Id}).then(result => {
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
                            {"آیا حذف " + appointment.Name + " را تایید می کنید؟"}
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
        setInAppointment({
            ...inAppointment,
            ValuePrice: toPriceWithoutComma(value),
            PlacePrice: toPriceWithoutComma(value),
            Price: toPriceWithoutComma(value)
        })
    }


    return (
        <>

            <TableRow key={appointment.Id} sx={{'& > *': {borderBottom: 'unset',padding:0}}}>
                <TableCell  align="right">
                    <Tooltip title={"وضعیت بلیط : "+(appointment.Enable?"فعال":"غیر فعال")} placement="top">
                        <IconButton color={appointment.Enable?"success":"error"} onClick={() =>ActiveAppointments(appointment)}>
                            <RadioButtonChecked />
                        </IconButton>
                    </Tooltip>
                    <Tooltip onClick={(e) => setOpenDetails(!openDetails)} title={appointment.Id} placement="top">
                        {appointment.Name}
                    </Tooltip>
                </TableCell>
                <TableCell onClick={(e) => setOpenDetails(!openDetails)} align="right" component="th" scope="row">
                    <Tooltip title={"ارزش بلیط : " + toPriceWithComma(appointment.ValuePrice)} placement="top">
                        <ListItemText
                            primary={<>{toPriceWithComma(appointment.PlacePrice)}{(appointment.ValuePrice != appointment.PlacePrice)&&<Percent color={"error"} />}</>}
                            primaryTypographyProps={{
                                sx: {
                                    textDecoration: "line-through",
                                    display: appointment.Price != appointment.PlacePrice ? "block" : "none"
                                }
                            }}
                            secondary={toPriceWithComma(appointment.Price)}
                            secondaryTypographyProps={{variant: "body1",py:appointment.Price != appointment.PlacePrice ?0:1.3}}
                        />

                    </Tooltip>
                </TableCell>
                <TableCell align="right" onClick={(e) => setOpenDetails(!openDetails)}>{genders[appointment.Gender]}</TableCell>
                <TableCell align="left">
                    <IconButton color={"primary"} href={"/counselings/ticketAppointments/" + appointment.Id}>
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
                                            <Form onSubmit={(e) => updateAppointment(e)}>
                                                <Grid container direction={"row"} alignItems={"center"} textAlign={"center"} spacing={2}>
                                                    <Grid size={{xs: 6, sm: 6, md: 4, xl: 4}}>
                                                        <TextField
                                                            name={"Name"}
                                                            sx={{my: 1}}
                                                            value={inAppointment?.Name || ""}
                                                            onChange={(e) => setInAppointment({...inAppointment, Name: e.target.value})}
                                                            margin="dense"
                                                            label="نام نوبت"
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
                                                                value={inAppointment?.Gender || ""}
                                                                onChange={(e) => setInAppointment({...inAppointment, Gender: e.target.value})}
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
                                                                value={inAppointment?.AppointmentStatus || ""}
                                                                onChange={(e) => setInAppointment({
                                                                    ...inAppointment,
                                                                    AppointmentStatus: e.target.value
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
                                                    <Grid size={{xs: 6, sm:6, md: 6, xl: 6}}>
                                                        <TextField
                                                            name={"AppointmentCapacity"}
                                                            value={inAppointment?.AppointmentCapacity || ""}
                                                            onChange={(e) => setInAppointment({...inAppointment, AppointmentCapacity: e.target.value})}
                                                            margin="dense"
                                                            label="تعداد بلیط قابل فروش"
                                                            type="number"
                                                            fullWidth
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 12, md: 6, xl: 6}}>
                                                        <TextField
                                                            name={"ExpireDuration"}
                                                            value={inAppointment?.ExpireDuration || ""}
                                                            onChange={(e) => setInAppointment({...inAppointment, ExpireDuration: e.target.value})}
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
                                                            value={toPriceWithComma(inAppointment?.ValuePrice)}
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
                                                            secondary={toPriceWithComma(inAppointment?.PlacePrice)}
                                                            primaryTypographyProps={{variant: "body2"}}
                                                            secondaryTypographyProps={{variant: "h5", color: "#202020"}}
                                                        />
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 12, md: 12, xl: 12}}>
                                                        <TextField
                                                            name={"timing"}
                                                            value={inAppointment?.Timing || ""}
                                                            onChange={(e) => setInAppointment({...inAppointment, Timing: e.target.value})}
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
                                                            value={inAppointment?.Description || ""}
                                                            onChange={(e) => setInAppointment({...inAppointment, Description: e.target.value})}
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
    )
        ;
};

export default _CounselingAppointmentListItem;
