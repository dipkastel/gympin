import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {Plans_getByPlace} from "../../../network/api/Plans.api";
import {useSelector} from "react-redux";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";
import {ticket_add} from "../../../network/api/tickets.api";
import {toPriceWithComma} from "../../../helper/utils";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ExpandMore} from "@mui/icons-material";
import _PlanTimingReserve from "./_PlanTimingReserve";

const _PlaceReserve = ({place}) => {
    const navigate = useNavigate()
    const error = useContext(ErrorContext);
    const currentUser = useSelector(state => state.auth.user)
    const [plans, setPlans] = useState([]);
    const [expandeds, setExpandeds] = useState([]);
    const [openDialogAdded, setOpenDialogAdded] = useState(false);
    useEffect(() => {
        if (!place.Id) return;
        Plans_getByPlace({Id: place.Id}).then(result => {
            setPlans(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }, [place]);

    function addToTickets(item) {
        if(!currentUser){
            error.showError({
                clickable: true,
                message: 'برای خرید بلیط ابتدا باید وارد شوید',
                buttonTitle: 'پروفایل',
                duration:6000,
                onClick: () => {
                    navigate("/profile/edit", {replace: false});
                }
            });
            return;
        }
        if (!currentUser.FullName) {
            error.showError({
                clickable: true,
                message: 'تکمیل نام و نام خانوادگی',
                buttonTitle: 'پروفایل',
                duration:6000,
                onClick: () => {
                    navigate("/profile/edit", {replace: false});
                }
            });
            return;
        }
        if (!currentUser.Birthday) {
            error.showError({
                clickable: true,
                message: 'تکمیل تاریخ تولد',
                buttonTitle: 'پروفایل',
                duration:6000,
                onClick: () => {
                    navigate("/profile/edit", {replace: false});
                }
            });
            return;
        }
        // if (!currentUser.NationalCode) {
        //     error.showError({
        //         clickable: true,
        //         message: 'تکمیل کد ملی',
        //         buttonTitle: 'پروفایل',
        //         onClick: () => {
        //             navigate("/profile/edit", {replace: false});
        //         }
        //     });
        //     return;
        // }
        if (!currentUser.Gender) {
            error.showError({
                clickable: true,
                message: 'تکمیل جنسیت',
                buttonTitle: 'پروفایل',
                duration:6000,
                onClick: () => {
                    navigate("/profile/edit", {replace: false});
                }
            });
            return;
        }
        ticket_add({Plan: {Id: item.Id}, User: {Id: currentUser.Id}})
            .then(result => {
                setOpenDialogAdded(true)
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }

    function renderDialogTicketAdded() {
        return (<Dialog
            className={"w-100"}
            open={openDialogAdded} onClose={() => setOpenDialogAdded(false)}>
            <DialogContent className={"w-100"}>
                بلیط انتخاب شده به بلیط های شما اضافه شد
                برای مشاهده جزئیات و خرید بلیط به بخش بلیط ها بروید
            </DialogContent>
            <DialogActions>
                <Button sx={{m: 1}} variant={"contained"} color={"secondary"}
                        onClick={() => navigate("/tickets", {replace: false})}>بخش بلیط ها</Button>
                <Button sx={{m: 1}} variant={"contained"} color={"info"} onClick={() => setOpenDialogAdded(false)}>ادامه
                    در همین صفحه</Button>
            </DialogActions>
        </Dialog>);
    }

    function ExpandItem(Id) {
        if (expandeds.includes(Id)) {
            setExpandeds(expandeds.filter(p => p !== Id))
        } else {
            setExpandeds([...expandeds, Id])
        }
    }

    return (
        <div className={"nopadding"}>
            <List disablePadding>
                {plans.map((item, number) => (
                        <div key={number}>
                            <ListItem disablePadding>
                                <ListItemButton disabled={!item.Enable} onClick={() => addToTickets(item)}>
                                    <ListItemText sx={{textAlign: "right"}}
                                                  primary={<Typography variant={"subtitle1"}>
                                                      {item.Name}
                                                  </Typography>}
                                                  secondary={<><Typography component={"span"} variant={"body2"}>
                                                      انقضا :
                                                  </Typography><Typography component={"span"} variant={"body1"}>
                                                      {(item.Expire_type == "Duration") ?
                                                          ("از خرید نهایی تا " + item.Expire_duration + " روز")
                                                          :
                                                          new Date(item.Expire_date).toLocaleDateString('fa-IR', {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric',
                                                              hour: "2-digit",
                                                              minute: "2-digit"
                                                          })
                                                      }
                                                  </Typography></>}
                                    />
                                    <ListItemText sx={{textAlign: "left"}}

                                                  primary={<><Typography component={"span"}
                                                                         variant={"h5"}>
                                                      {toPriceWithComma(item.Price)}
                                                  </Typography><Typography component={"span"}
                                                                           variant={"body1"}>
                                                      {" تومان"}
                                                  </Typography></>}

                                                  secondary={<>{(item.Price < item.ValuePrice) && <>

                                                      <Typography component={"span"} sx={{
                                                          direction: "rtl",
                                                          textDecoration: "line-through"
                                                      }} color={"darkred"} variant={"h6"}>
                                                          {toPriceWithComma(item.ValuePrice)}
                                                      </Typography><Typography component={"span"} color={"darkred"}
                                                                               variant={"body1"}>
                                                      {" تومان"}
                                                  </Typography>
                                                  </>}
                                                  </>
                                                  }
                                    />

                                </ListItemButton>
                                <ExpandMore
                                    expand={expandeds.includes(item.Id).toString()}
                                    onClick={() => ExpandItem(item.Id)}
                                    aria-expanded={expandeds.includes(item.Id)}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon/>
                                </ExpandMore>
                            </ListItem>

                            <Collapse in={expandeds.includes(item.Id)} timeout="auto" unmountOnExit>
                                {expandeds.includes(item.Id) && <_PlanTimingReserve plan={item}/>}
                            </Collapse>
                            <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                        </div>

                    )
                )}
            </List>
            {renderDialogTicketAdded()}
        </div>
    );
};

export default _PlaceReserve;
