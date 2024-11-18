import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    ticketActiveTimes_addAll,
    ticketActiveTimes_delete,
    ticketActiveTimes_getByPlace
} from "../../../../network/api/gatesTiming.api";
import {dayOfWeekEnum} from "../../../../helper/enums/dayOfWeekEnum";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {
    TicketCourses_addCourseActiveTimes,
    TicketCourses_getActiveTimesByTicketCourse
} from "../../../../network/api/ticketCourse.api";
import {useSelector} from "react-redux";


const _CourseActiveTimes = ({ticketCourse}) => {
    const error = useContext(ErrorContext);
    const place = useSelector(({place}) => place.place)
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [courseActiveTimes, SetCourseActiveTimes] = useState([]);
    const [placeActiveTimes, SetPlaceActiveTimes] = useState([]);
    useEffect(() => {
        if (ticketCourse.Id) {
            getCourseAvtiveTimes()
            getGateTimings()
        }
    }, [ticketCourse])

    function getCourseAvtiveTimes() {
        TicketCourses_getActiveTimesByTicketCourse({ticketCourseId: ticketCourse.Id}).then(data => {
            SetCourseActiveTimes(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getGateTimings() {
        ticketActiveTimes_getByPlace({Id: place.Id}).then(data => {
            SetPlaceActiveTimes(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function ModalAddGateTiming() {
        var listToAdd = [];

        function addItemToList(item, checked) {
            if (checked) {
                listToAdd.push(item);
            } else {
                listToAdd = listToAdd.filter(o => o !== item);
            }
        }

        function submitAddItems(e) {
            e.preventDefault()
            var postData = [];
            for (var index in listToAdd) {
                postData.push({Id: listToAdd[index]})
            }
            TicketCourses_addCourseActiveTimes({Ticket: {Id: ticketCourse.Id},ActiveTime:postData}).then(result => {
                setOpenModalAdd(false);
                getCourseAvtiveTimes()
            }).catch(e => {
                setOpenModalAdd(false);
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <div>
                <Dialog fullWidth open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <DialogTitle>افزودن سالن به عضویت</DialogTitle>
                    <DialogContent sx={{px: 0}}>
                        <List dense={false}>
                            {placeActiveTimes && placeActiveTimes.map((pat, number) => (
                                    <div key={number}>
                                        <ListItem
                                            sx={{direction: "rtl", width: "100%"}}
                                        >
                                            <FormControlLabel
                                                sx={{width: "100%", m: 0}}
                                                control={<Checkbox/>}
                                                onChange={(e) => addItemToList(pat.Id, e.target.checked)}
                                                label={(<ListItemText
                                                    sx={{width: "100%"}}
                                                    className="text-start"
                                                    primary={pat.Hall?.Name +" ← "+pat.Name + " ( " + dayOfWeekEnum[pat.DayOfWeek] + " ) "}
                                                    secondary={"از " +
                                                    pat.OpeningTime.substring(0, 5)
                                                    + " تا " +
                                                    pat.ClosingTime.substring(0, 5)
                                                    }
                                                />)}
                                            />

                                        </ListItem>
                                        <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                                    </div>
                                )
                            )}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} sx={{mr: 3}} color={"success"}
                                onClick={(e) => submitAddItems(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    function ModalDeleteActiveTimes() {
        function onDeleteItem(e) {
            e.preventDefault()
            ticketActiveTimes_delete({id: deleteItem.Id}).then(result => {
                setDeleteItem(null)
                getCourseAvtiveTimes()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
            setDeleteItem(null)
        }

        return (
            <div>
                <Dialog open={deleteItem} onClose={() => setDeleteItem(null)}>
                    <DialogTitle>حذف زمان</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            آیا حذف زمان {deleteItem["hall-timing"].Name + " از " +
                        deleteItem["hall-timing"]["Opening-time"].substring(0, 5)
                        + " تا " +
                        deleteItem["hall-timing"]["Closing-time"].substring(0, 5)
                        } را تایید میکنید؟
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItem(null)}>لغو</Button>
                        <Button onClick={(e) => onDeleteItem(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <>
            <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"سالن های قابل استفاده"}
                    action={<Button onClick={() => setOpenModalAdd(true)}>افزودن</Button>}
                />

                <CardContent>

                    <List dense={false}>
                        {courseActiveTimes && courseActiveTimes.map((p, number) =>
                            <ListItem sx={{direction: "rtl"}} key={"ch-" + number}>
                                <ListItemText
                                    className="text-start"
                                    primary={p.Hall.Name + " ← "+p.Name +" ( " + dayOfWeekEnum[p.DayOfWeek] + " ) "}
                                    secondary={"از " +
                                    p.OpeningTime.substring(0, 5)
                                    + " تا " +
                                    p.ClosingTime.substring(0, 5)
                                    }
                                />
                                <ListItemIcon className="text-end">
                                    <DeleteIcon onClick={(e) => setDeleteItem(p)} color={"primary"}/>
                                </ListItemIcon>
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
            {openModalAdd && ModalAddGateTiming()}
            {deleteItem && ModalDeleteActiveTimes()}
        </>
    );
};

export default _CourseActiveTimes;
