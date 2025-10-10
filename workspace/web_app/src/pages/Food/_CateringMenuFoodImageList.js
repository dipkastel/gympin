import React from 'react';
import {Card, CardActionArea, IconButton, Tooltip, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Delete, DinnerDining, Info, LocalDining, RemoveCircle} from "@mui/icons-material";
import {Image} from "react-bootstrap";
import {toPriceWithComma} from "../../helper/utils";

const _CateringMenuFoodImageList = ({title, Items, onAddClick,onMinusClick, selected}) => {
    return (
        <>

            <Grid sx={{mx: 0.5, mt: 1,mb:1}}>
                <Card sx={{p: 2, width: "100%",bgcolor:"rgba(199,199,199,0.2)"}} variant={"outlined"}>
                    <Grid container direction={"row"}>
                        <Typography sx={{px: 1}}>{title}</Typography>
                    </Grid>
                </Card>
            </Grid>
            <Grid container columns={12} spacing={0.5}>

                {Items.map((row) => (

                    <Grid
                        textAlign={"center"}
                        justifyContent={"center"}
                        justifyItems={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        size={{xs: 6, sm: 6, md: 4, lg: 3, xl: 3}}
                        sx={{px: 0.5}}
                        key={row.name}>
                        <Card sx={{mt: 0.5,bgcolor:!!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count?"rgba(12,133,12,0.19)":"#FFFFFFFF"}}>
                            <Grid container direction={"row"}>
                                <Grid size={10}>
                                    <CardActionArea sx={{width: "100%", p: 0.5}}
                                                    onClick={(e) => onAddClick(e, row)}>
                                        <Image rounded={"12px"} className={"m-1"}
                                               src={(row?.Food?.Multimedias[0]?.Url) || "/assets/images/icons/ic-empty-transaction.svg"}
                                               width={"70%"}/>
                                        <Typography variant={"body1"}>
                                            {row.Food.Name}
                                        </Typography>
                                        <Typography variant={"body2"}>
                                            {toPriceWithComma(row?.Food?.Price)}
                                        </Typography>
                                    </CardActionArea>
                                </Grid>


                                <Grid container direction={"column"} size={2}>
                                    {row.Food.Description && <Tooltip title={row?.Food?.Description}>
                                        <Info sx={{m: 0.5}}/>
                                    </Tooltip>}
                                    {!!selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count &&
                                    <Tooltip
                                        title={selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count + " عدد در سبد خرید"}>
                                        <Card variant={"outlined"} sx={{mt:1}}>
                                            <LocalDining sx={{m: 0.5}}/>
                                            <Typography
                                                variant={"body2"}> {selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count||undefined}</Typography>

                                            <IconButton size={"small"}
                                                        onClick={(e) => onMinusClick(e, selected?.find(inf => inf.FoodMenu.Id === row?.Id))}
                                                        color={"error"}>

                                                {selected?.find(inf => inf.FoodMenu.Id === row?.Id)?.Count>1?<RemoveCircle/>:<Delete/>}
                                            </IconButton>

                                        </Card>
                                    </Tooltip>}


                                </Grid>
                            </Grid>
                        </Card>


                    </Grid>
                ))}

            </Grid>
        </>
    );
};

export default _CateringMenuFoodImageList;
