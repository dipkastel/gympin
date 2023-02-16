import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {GatesTiming_getByPlace} from "../../network/api/gatesTiming.api";
import {
    PlanGatesTiming_addAll, PlanGatesTiming_delete,
    PlanGatesTiming_getByPlan
} from "../../network/api/planGatesTiming.api";
import {dayOfWeekEnum} from "../../helper/enums/dayOfWeekEnum";
import {Tab, Tabs} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";


const _PlanGatesTiming = ({plan}) => {
    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
    const [planGateTiming, SetPlanGateTiming] = useState([]);
    const [gateTimingGrouped, SetGateTimingGrouped] = useState([]);
    const [selectedTab, SetSelectedTab] = useState("");
    useEffect(() => {
        if (plan.Id) {
            getPlanGatesTimingOfplan()
            getGateTimings()
        }
    }, [plan])

    function getPlanGatesTimingOfplan() {
        PlanGatesTiming_getByPlan({id: plan.Id}).then(data => {
            SetPlanGateTiming(data.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getGateTimings() {
        GatesTiming_getByPlace({Id: plan.Place.Id}).then(data => {
            SetGateTimingGrouped(data.data.Data.reduce((result, item) => {
                (result[item.Gate.Name] = result[item.Gate.Name] || []).push(item);
                return result;
            }, []));
            SetSelectedTab(Object.keys(gateTimingGrouped)[0]);
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
        function addItemToList(item,checked){
            if(checked){
                listToAdd.push(item);
            }else{
                listToAdd=listToAdd.filter(o=>o!==item);
            }
        }
        function submitAddItems(e){
            e.preventDefault()
            var postData = [];
            for(var index in listToAdd){
                postData.push({plan: {Id: plan.Id}, gateTiming: {Id:listToAdd[index]}})
            }
            PlanGatesTiming_addAll(postData).then(result => {
                setOpenModalAdd(false);
                getPlanGatesTimingOfplan()
            }).catch(e => {
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
                    <DialogTitle>افزودن گیت به پلن</DialogTitle>
                    <DialogContent>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={selectedTab}
                            onSelect={(k) => SetSelectedTab(k)}
                            className="mb-3"
                        >
                            {Object.keys(gateTimingGrouped).map((group, number) => (
                                    <Tab
                                        key={number}
                                        eventKey={group}
                                        title={group}>

                                        <List dense={false}>
                                            {gateTimingGrouped[group]&&gateTimingGrouped[group].map((p, number) =>
                                                <div key={"time-"+number}>
                                                    <ListItem
                                                        sx={{direction: "rtl"}}
                                                    >
                                                        <FormControlLabel
                                                            control={<Checkbox />}
                                                            onChange={(e)=>addItemToList(p.Id,e.target.checked)}
                                                            label={(<ListItemText
                                                                sx={{width:"100%"}}
                                                                className="text-start"
                                                                primary={p.Name + " ( " + dayOfWeekEnum[p["Day-of-week"]] + " ) "}
                                                                secondary={"از " +
                                                                p["Opening-time"].substring(0,5)
                                                                + " تا " +
                                                                p["Closing-time"].substring(0,5)
                                                                }
                                                            />)}
                                                        />

                                                    </ListItem>
                                                    <Divider variant="inset" component="li"/>
                                                </div>
                                            )}
                                        </List>
                                    </Tab>
                                )
                            ) }
                        </Tabs>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button onClick={(e)=>submitAddItems(e)}>تایید</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    function ModalDeleteGateTiming() {
        function onDeleteItem(e) {
            e.preventDefault()
            PlanGatesTiming_delete({id:deleteItem.Id}).then(result=>{
                setDeleteItem(null)
                getPlanGatesTimingOfplan()
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
                            آیا حذف زمان {deleteItem["gate-timing"].Name + " از " +
                        deleteItem["gate-timing"]["Opening-time"].substring(0, 5)
                        + " تا " +
                        deleteItem["gate-timing"]["Closing-time"].substring(0, 5)
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
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"گیت های قابل استفاده"}
                    action={<Button onClick={() => setOpenModalAdd(true)}>افزودن</Button>}
                />

                <CardContent>

                    <List dense={false}>
                        {planGateTiming && planGateTiming.map((p, number) =>
                            <ListItem sx={{direction: "rtl"}} key={"ch-"+number}>
                                <ListItemText
                                    className="text-start"
                                    primary={p["gate-timing"].Name + " ( " + dayOfWeekEnum[p["gate-timing"]["Day-of-week"]] + " ) "}
                                    secondary={"از " +
                                    p["gate-timing"]["Opening-time"].substring(0, 5)
                                    + " تا " +
                                    p["gate-timing"]["Closing-time"].substring(0, 5)
                                    }
                                />
                                <ListItemIcon
                                    className="text-end"
                                >
                                    <DeleteIcon onClick={(e) => setDeleteItem(p)} color={"primary"}/>
                                </ListItemIcon>
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
            {openModalAdd&&ModalAddGateTiming()}
            {deleteItem && ModalDeleteGateTiming()}
        </>
    );
};

export default _PlanGatesTiming;
