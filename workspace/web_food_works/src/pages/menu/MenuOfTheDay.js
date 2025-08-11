import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography} from "@mui/material";
import {Add, CalendarMonth} from "@mui/icons-material";
import {TicketFoods_query} from "../../network/api/TicketFoods.api";
import {TicketFoodMenu_add, TicketFoodMenu_query} from "../../network/api/TicketFoodMenu.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import _MenuCopy from "./_MenuCopy";
import _MenuCategoryList from "./_MenuCategoryList";

const MenuOfTheDay = ({catering, date}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [foodMenu, setFoodMenu] = useState(null);
    const [allFoods, setAllFoods] = useState(null);
    const [hasFood, setHasFood] = useState(false);


    useEffect(() => {
        if (date)
            getFoodMenuByDate()
    }, [date]);

    useEffect(() => {
        if (!catering) return;
        TicketFoods_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            paging: {Page: 0, Size: 250, Desc: true}
        }).then((data) => {
            setAllFoods(data.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [catering]);


    function getFoodMenuByDate() {
        TicketFoodMenu_query({
            queryType: "FILTER",
            PlaceId: catering.Id,
            Date: date,
            paging: {
                Page: 0,
                Size: 500,
                Desc: true
            }
        }).then(result => {
            setHasFood(result?.data?.Data?.content?.length > 0);
            const grouped = Object.groupBy(result.data.Data.content, ({ Category }) => Category);
            const sortedEntries = Object.entries(grouped).sort((a, b) =>
                a[0].localeCompare(b[0], 'fa')
            );
            setFoodMenu(Object.fromEntries(sortedEntries));
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function RenderModalAdd() {
        function addToMenu(e) {
            e.preventDefault()
            setFoodMenu({[e.target.name.value]:[],...foodMenu})
            setOpenModalAdd(false);
        }

        return (
            <>

                <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addToMenu(e)}>
                        <DialogTitle>افزودن دسته</DialogTitle>
                        <DialogContent>
                            {/*<__SelectFoodFromMenu catering={catering} name={"food"}/>*/}
                            <TextField
                                label="دسته بندی"
                                placeholder="نام دسته بندی"
                                name={"name"}
                                fullWidth
                                margin="normal"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className={"button_edit"}
                                onClick={() => setOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </>
        );
    }


    return date ? (
        <>

            <Grid container>

                {foodMenu && Object.keys(foodMenu).map((cat, num) => (
                    <Grid  key={num} item xs={6}>
                        <_MenuCategoryList allFoods={allFoods} date={date} catering={catering} category={cat} menuList={foodMenu[cat]}
                                              getMenu={getFoodMenuByDate}/>
                    </Grid>
                ))}
                {catering && foodMenu && !hasFood && <Grid item xs={6}>
                    <_MenuCopy catering={catering} selectedDate={date} copyDone={getFoodMenuByDate}/>
                </Grid>}
                <Grid item xs={6}>
                    <Card sx={{ m: 2, textAlign: "center"}} elevation={10}>
                        <CardActionArea sx={{p: 2}} onClick={() => {
                            setOpenModalAdd(true)
                        }}>
                            <Add sx={{fontSize: "2rem"}}/>
                            <Typography variant={"body2"}>افرودن دسته</Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            {RenderModalAdd()}
        </>
    ) : (<Grid>
        <Card sx={{m: 2, textAlign: "center", p: 2}} elevation={10}>
            <CalendarMonth sx={{fontSize: "6rem"}}/>
            <Typography variant={"body2"}>یک تاریخ انتخاب کنید</Typography>
        </Card>
    </Grid>);
};

export default MenuOfTheDay;
