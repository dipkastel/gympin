import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, Chip, Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {PlaylistAdd} from "@mui/icons-material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TicketFoodMenu_add, TicketFoodMenu_delete} from "../../network/api/TicketFoodMenu.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {toPriceWithComma} from "../../helper/utils";
import {FoodItemStatus} from "../../helper/enums/FoodItemStatus";
import Grid from "@mui/material/Grid2";

const FoodMenuCategoryList = ({date, category, menuList, getMenu, catering, allFoods}) => {

    const error = useContext(ErrorContext);
    const [openModalAdd, SetOpenModalAdd] = useState(false);

    const [AllFoodCats, SetAllFoodCats] = useState(null);


    useEffect(() => {
        const cateFoods = allFoods.reduce((acc, item) => {
            const key = item.Category;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
        const Array = Object.entries(cateFoods).map(([category, items]) => ({
            Category: category,
            Items: items
        }))
        SetAllFoodCats(Array);
    }, [allFoods]);


    function RenderModalAdd() {
        function addToList(e, item) {
            e.preventDefault()
            TicketFoodMenu_add({
                Catering: {Id: catering.Id},
                Food: {Id: item.Id},
                Date: date,
                Status: "AVAILABLE",
                Category: category,
                MinOrderCount: 1,
                MaxOrderCount: 1000
            }).then(result => {
                getMenu()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function removeFromList(e, item) {
            TicketFoodMenu_delete({
                Id: menuList.find(ml=>ml.Food.Id==item.Id).Id
            }).then(result => {
                getMenu()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        function foodExist(food) {
            return menuList?.some(f=>f.Food.Id==food.Id);
        }

        return (
            <>
                <Dialog maxWidth={"md"} open={openModalAdd} onClose={() => SetOpenModalAdd(false)}>
                    <DialogTitle>{"افزودن غذا به منو " + category}</DialogTitle>
                    <DialogContent>
                        {AllFoodCats?.map((item, num) => (
                            <Grid item key={num}>
                                <Card variant={"outlined"} sx={{p: 1}} fullWidth>{item.Category}</Card>

                                <Grid container columns={3}>
                                    {item?.Items?.map((food, num) => (
                                        <Grid item key={num+"food"+food.Id}>
                                            <Chip size={"medium"} color={foodExist(food)?"success":"inherit"} sx={{p: 1, m: 1}} label={food?.Name} onClick={e => foodExist(food)?removeFromList(e, food):addToList(e, food)}/>
                                        </Grid>

                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                    </DialogContent>
                </Dialog>
            </>
        );
    }


    return (
        <>


            <Card
                className={"rtl"}
                elevation={4}
                sx={{borderRadius: 4, m: 2}}
            >
                <CardHeader
                    sx={{backgroundColor: "rgba(120,120,120,0.1)"}}
                    title={category}
                    action={<IconButton onClick={(e) => SetOpenModalAdd(true)}><PlaylistAdd/></IconButton>}
                />
                <CardContent sx={{px: 0}}>
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" padding="normal" sortDirection={false}>نام آیتم</TableCell>
                                    <TableCell align="center" padding="normal" sortDirection={false}>قیمت</TableCell>
                                    <TableCell align="center" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuList.map((row, index) => {
                                    return (
                                        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} hover tabIndex={-1}
                                                  key={row.Id.toString()}>
                                            <TableCell align="left">{row?.Food?.Name}</TableCell>
                                            <TableCell align="center">{toPriceWithComma(row?.Food?.Price)}</TableCell>
                                            <TableCell align="center">{FoodItemStatus[row?.FoodItemStatus]}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {RenderModalAdd()}
        </>
    );
};

export default FoodMenuCategoryList;
