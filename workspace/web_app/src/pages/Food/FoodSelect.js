import React, {useContext, useEffect, useState} from 'react';
import _CateringSelectDate from "./_CateringSelectDate";
import {getUserCateringsAvailable} from "../../helper/serverSettingsHelper";
import {useSelector} from "react-redux";
import {Catering_getById} from "../../network/api/catering.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {Card, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Fastfood, RamenDining} from "@mui/icons-material";
import _CateringListSimpleMenu from "./_CateringListSimpleMenu";
import _CateringListImageMenu from "./_CateringListImageMenu";
import {PersonnelFood_add, PersonnelFood_delete, PersonnelFood_query} from "../../network/api/PersonnelFood.api";
import {parse} from "date-fns";

const FoodSelect = () => {

    const error = useContext(ErrorContext);
    const serverSettings = useSelector(settings => settings);
    const [selectedAccess, setSelectedAccess] = useState(getUserCateringsAvailable(serverSettings))
    const [selectedCateringId, setSelectedCateringId] = useState(null)
    const [selectedPersonnelId, setSelectedPersonnelId] = useState(null)
    const [catering, SetCatering] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [lastOrders, setLastOrders] = useState(null);
    const [selectedDayOrders, setSelectedDayOrders] = useState(null);

    useEffect(() => {
        if (selectedAccess){
            setSelectedCateringId(selectedAccess[0].Value);
            setSelectedPersonnelId(selectedAccess[0].Data);
        }
    }, [selectedAccess]);

    useEffect(() => {
        if (selectedCateringId){
            getCateringData();
            getPersonnelLastOrders();
        }
    }, [selectedCateringId]);

    useEffect(() => {
        if (selectedDate){
            getPersonnelSelectedDateOrders();
        }
    }, [selectedDate]);

    function getCateringData() {
        Catering_getById({id: selectedCateringId}).then(result => {
            SetCatering(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }
    function getPersonnelSelectedDateOrders(){
        PersonnelFood_query({
            queryType: "FILTER",
            Date:new Date(selectedDate),
            PersonnelId:selectedPersonnelId,
            paging: {Page: 0, Size: 100, orderBy: "id", Desc: false}
        }).then(result => {
            setSelectedDayOrders(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }

    function getPersonnelLastOrders(){
        PersonnelFood_query({
            queryType: "FILTER",
            PersonnelId:selectedPersonnelId,
            paging: {Page: 0, Size: 100, orderBy: "id", Desc: false}
        }).then(result => {
            setLastOrders(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function addFood(item){
        PersonnelFood_add({
            PersonnelId:parseInt(selectedPersonnelId),
            FoodMenuId:item,
        }).then(result => {
            getPersonnelSelectedDateOrders();
            getPersonnelLastOrders();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }
    function minusOrder(item){
        PersonnelFood_delete({id:item.Id}).then(result => {
            getPersonnelSelectedDateOrders();
            getPersonnelLastOrders();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    return (
        <>
            {catering && <_CateringSelectDate catering={catering} setSelectedDate={setSelectedDate} selectedDate={selectedDate} AllOrders={lastOrders}/>}
            {selectedDate && catering?.ViewType == "LIST_SIMPLE" &&
            <_CateringListSimpleMenu
                selectedDate={selectedDate}
                catering={catering.Id}
                orders={selectedDayOrders}
                addOrder={addFood}
            />}
            {selectedDate && catering?.ViewType == "LIST_IMAGE" &&
            <_CateringListImageMenu
                selectedDate={selectedDate}
                catering={catering.Id}
                orders={selectedDayOrders}
                addOrder={addFood}
                minusOrder={(item) => minusOrder(item)}
            />}
            {!selectedDate && <Grid sx={{p: 1}} size={{xs: 120, sm: 120, md: 120, lg: 120, xl: 120}}>
                <Card sx={{m: 1, p: 8}}>
                    <CardContent sx={{textAlign: "center"}}>
                        <Fastfood sx={{fontSize: "6rem", mb: 4}}/>
                        <Typography variant={"h5"}>برای سفارش غذا یک تاریخ انتخاب کنید</Typography>
                    </CardContent>
                </Card>
            </Grid>}

        </>
    );
};

export default FoodSelect;
