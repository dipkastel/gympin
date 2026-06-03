import React, {useContext, useEffect, useState} from 'react';
import {Badge, Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SideMenu from "./sideProinvoice/SideMenu";
import _CateringSelectDate from "./partials/_CateringSelectDate";
import _CateringListSimpleMenu from "./partials/_CateringListSimpleMenu";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    invoice_addFood,
    invoice_changeInvoiceBuyableCount,
    invoice_deleteBuyable,
    invoice_getFoodBasket,
    invoice_query,
    invoice_sendOrderToCatering
} from "../../network/api/invoice.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router";
import {Catering_getById} from "../../network/api/catering.api";
import _CateringAbout from "./partials/_CateringAbout";
import {Assessment, PeopleAlt, RamenDining} from "@mui/icons-material";
import _CateringSettings from "./partials/_CateringSettings";
import _CateringListImageMenu from "./partials/_CateringListImageMenu";
import _CateringUserOrders from "./partials/_CateringUserOrders";
import {parse} from "date-fns";

const CateringDetail = () => {

    const error = useContext(ErrorContext);
    let {cateringId} = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(false);
    const [CurrentBasket, SetCurrentBasket] = useState(null);
    const [catering, SetCatering] = useState(null);
    const [invoiceToPayCount, SetInvoiceToPayCount] = useState(0);
    const [invoiceProcessingCount, SetInvoiceProcessingCount] = useState(0);
    const [openSideMenu, setOpenSideMenu] = React.useState(false);
    const corporate = useSelector(({corporate}) => corporate.corporate)


    useEffect(() => {
        getCatering()
    }, []);

    useEffect(() => {
        getBasket();
    }, [selectedDate]);

    useEffect(() => {
        getInvoiceToPay()
        getInvoiceProcessing()
    }, [catering]);

    function getInvoiceToPay() {
        if (!catering) return;
        invoice_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            Corporate: corporate.Id,
            Status: "NEED_TO_PAY",
            paging: {
                Page: 0,
                Size: 1,
                Desc: true
            }
        })
            .then((result) => {
                SetInvoiceToPayCount(result.data.Data.totalElements);
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    function getInvoiceProcessing() {
        if (!catering) return;
        invoice_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            Corporate: corporate.Id,
            Status: "PROCESSING",
            paging: {
                Page: 0,
                Size: 1,
                Desc: true
            }
        })
            .then((result) => {
                SetInvoiceProcessingCount(result.data.Data.totalElements);
            })
            .catch((e) => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص"});
                }
            });
    }

    function getCatering() {
        Catering_getById({id: cateringId}).then(result => {
            SetCatering(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function getBasket(refresh) {
        if (!catering) return;
        if (!selectedDate) return;
        if(refresh)
            SetCurrentBasket(null);

        var date = new Date(selectedDate);
        invoice_getFoodBasket({Date: date, Corporate: {Id: corporate.Id}}).then(result => {
            SetCurrentBasket(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function AddFood(itemId) {
        invoice_addFood({
            Invoice: {Id: CurrentBasket?.Id || null},
            MenuItem: {Id: itemId},
            Count: 1,
            Corporate: {Id: corporate.Id},
        }).then(result => {
            error.showError({message: 'به سبد خرید اضافه شد'});
            getBasket(false);
        }).catch(e => {
            getBasket(true);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function ConfirmOrder(e) {
        e.preventDefault()

        invoice_sendOrderToCatering({Id: CurrentBasket.Id})
            .then(result => {
                getBasket(true);
            })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }


    function RemoveOrder(item) {
        if (item.Count < 2) {
            invoice_deleteBuyable({id: item.Id})
                .then(data => {
                    error.showError({message: "عملیات موفق",});
                    getBasket(false)
                })
                .catch(e => {
                    getBasket(true);
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        } else {
            updateCount("minus", item);
        }
    }

    function updateOrderCount(item, Count) {
        if (Count < 1) {
            error.showError({message: "تعداد آیتم ها نمی‌تواند کمتر از 1 باشد!",});
            getBasket(false);
            return;
        }
        updateCount("update", item, Count);
    }

    function updateCount(action, item, _newCount) {
        let newCount = item.Count;
        if (action === "plus") {
            newCount++;
        }

        if (action === "minus") {
            newCount--;
        }
        if (action === "update") {
            newCount = _newCount;
        }
        invoice_changeInvoiceBuyableCount({
            Id: item.Id,
            Count: newCount
        }).then(result => {
            error.showError({message: "عملیات موفق",});
            getBasket(false);
        }).catch(e => {
            getBasket(true);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (
        <>
            <Grid columns={120} container>
                <Grid sx={{p: 1}} size={{xs: 90, sm: 96, md: 102, lg: 104, xl: 108}}>
                    <Card>
                        <CardContent sx={{p: 2}}>
                            <_CateringAbout Catering={catering}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid sx={{p: 1, alignContent: "top"}} size={{xs: 30, sm: 24, md: 18, lg: 16, xl: 12}}>
                    <Badge sx={{my: 1}} badgeContent={invoiceProcessingCount} color="error">
                        <Button variant={"contained"} onClick={(e) => navigate("/food/Process/" + cateringId)}
                                disabled={!invoiceProcessingCount} color={"warning"} fullWidth size={"small"}>در حال آماده سازی</Button>
                    </Badge>
                    <Badge sx={{my: 1}} badgeContent={invoiceToPayCount} color="error">
                        <Button variant={"contained"} onClick={(e) => navigate("/food/needToPay/" + cateringId)}
                                disabled={!invoiceToPayCount} color={"warning"} fullWidth size={"small"}>تاریخچه و پیگیری</Button>
                    </Badge>
                </Grid>

                {catering && <Grid size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}}>
                    <_CateringSelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} catering={catering}/>
                </Grid>}

                {selectedDate && <Grid sx={{p: 1}} size={{xs: 120, sm: 120, md: 30, lg: 30, xl: 30}}>
                    <_CateringUserOrders corporate={corporate} selectedDate={selectedDate} setOpenSideMenu={setOpenSideMenu} />
                </Grid>}
                <Grid sx={{p: 1}} size={{xs: 120, sm: 120, md: 30, lg: 30, xl: 30}}>
                    <_CateringSettings catering={catering} corporate={corporate}/>
                </Grid>
                <Grid sx={{p: 1}} size={{xs: 120, sm: 120, md: 30, lg: 30, xl: 30}}>
                    <Card sx={{m: 2}}>
                        <CardActionArea sx={{p: 2, textAlign: "center"}} onClick={(e) => {error.showError({message: "به زودی",})}}>
                            <CardContent>
                                <Assessment sx={{fontSize: "3rem", mb: 1}}/>
                                <Typography variant={"h5"}>گزارشات</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid sx={{p: 1}} size={{xs: 120, sm: 120, md: 30, lg: 30, xl: 30}}>
                    <SideMenu CurrentBasket={CurrentBasket} catering={catering}
                              setOrderCount={updateOrderCount}
                              removeOrder={RemoveOrder}
                              confirmOrder={ConfirmOrder}
                              refresh={getBasket}
                              openSideMenu={openSideMenu}
                              setOpenSideMenu={setOpenSideMenu}
                    />
                </Grid>
                <Grid size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}}>
                    {selectedDate && CurrentBasket && catering?.ViewType == "LIST_SIMPLE" &&
                    <_CateringListSimpleMenu
                        selectedDate={selectedDate}
                        catering={cateringId}
                        orders={CurrentBasket}
                        addOrder={AddFood}
                    />}
                    {selectedDate && CurrentBasket && catering?.ViewType == "LIST_IMAGE" &&
                    <_CateringListImageMenu
                        selectedDate={selectedDate}
                        catering={cateringId}
                        orders={CurrentBasket}
                        addOrder={AddFood}
                        minusOrder={(item)=>updateCount("minus",item)}
                        deleteOrder={RemoveOrder}
                    />}
                </Grid>


                {!selectedDate && <Grid sx={{p: 1}} size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}}>
                    <Card sx={{m: 1, p: 8}}>
                        <CardContent sx={{textAlign: "center"}}>
                            <RamenDining sx={{fontSize: "6rem", mb: 4}}/>
                            <Typography variant={"h5"}>برای سفارش غذا یک تاریخ انتخاب کنید</Typography>
                        </CardContent>
                    </Card>
                </Grid>}
            </Grid>
        </>
    );
};

export default CateringDetail;
