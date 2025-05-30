import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardActionArea, CardHeader, Grid, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {TicketFoodMenu_add, TicketFoodMenu_query} from "../../../../../network/api/TicketFoodMenu.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {Form, Modal} from "react-bootstrap";
import __SelectFood from "../../../../partials/selector/__SelectFood";
import FoodMenuCategoryList from "./FoodMenuCategoryList";
import {TicketFoods_query} from "../../../../../network/api/TicketFoods.api";

const FoodMenuOfTheDay = ({catering, date}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [foodMenu, setFoodMenu] = useState(null);
    const [allFoods, setAllFoods] = useState(null);


    useEffect(() => {
        getFoodMenuByDate()
    }, [date]);

    useEffect(() => {
        TicketFoods_query({
            queryType: "FILTER",
            PlaceId:catering.Id,
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
    }, []);



    function getFoodMenuByDate() {
        TicketFoodMenu_query({
            queryType: "FILTER",
            PlaceId:catering.Id,
            Date: date,
            paging: {
                Page: 0,
                Size: 500,
                Desc: true
            }
        }).then(result => {
            setFoodMenu( Object.groupBy(result.data.Data.content, ({ Category }) => Category))
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
            TicketFoodMenu_add({
                Catering: {Id: catering.Id},
                Food: {Id: e.target.food.value},
                Date: date,
                Status: "AVAILABLE",
                Category: e.target.category.value,
                MinOrderCount: 1,
                MaxOrderCount: 1000
            }).then(result => {
                getFoodMenuByDate();
                setOpenModalAdd(false);
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => setOpenModalAdd(false)}>
                    <Form
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => addToMenu(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن غذا به منو"}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <__SelectFood catering={catering} name={"food"}/>
                            <TextField
                                label="دسته بندی"
                                placeholder="نام دسته بندی"
                                name={"category"}
                                fullWidth
                                margin="normal"
                            />
                        </Modal.Body>
                        <Modal.Footer>
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
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }


    return date ? (
        <>

            <Grid container spacing={3}>

                {Object.keys(foodMenu).map((cat, num) => (
                    <Grid key={num} item xs={6}>
                        <FoodMenuCategoryList allFoods={allFoods} date={date} catering={catering} category={cat} menuList={foodMenu[cat]} getMenu={getFoodMenuByDate}/>
                    </Grid>
                ))}
                <Grid item xs={6}>
                    <Card sx={{width: "fit-content"}} elevation={10}>
                        <CardActionArea sx={{p: 2}} onClick={() => {
                            setOpenModalAdd(true)
                        }}>
                            <Add sx={{fontSize: "5rem"}}/>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>

            {RenderModalAdd()}
        </>
    ) : (<Grid>
        <Card elevation={10}>
            <CardActionArea sx={{p: 2}}>
                <Typography variant={"h5"}>یک تاریخ انتخاب کنید</Typography>
            </CardActionArea>
        </Card>
    </Grid>);
};

export default FoodMenuOfTheDay;
