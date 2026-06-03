import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, IconButton, Tooltip, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {toPriceWithComma} from "../../../helper/utils";
import {Delete, DinnerDining, ExpandMore, Info, LocalDining, RemoveCircle} from "@mui/icons-material";
import {Image} from "react-bootstrap";

const _CateringMenuFoodImageList = ({title, Items, onAddClick, onMinusClick, onDeleteClick, selected}) => {
    return (
        <>

            <Accordion sx={{mx:2}} variant={"outlined"}>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container columns={12} spacing={2}>

                        {Items.map((row) => (

                            <Grid
                                textAlign={"center"}
                                justifyContent={"center"}
                                justifyItems={"center"}
                                alignItems={"center"}
                                alignContent={"center"}
                                size={4}
                                sx={{px: 2}}
                                key={row.name}>
                                <Card sx={{mt: 2}}>
                                    <Grid container direction={"row"}>
                                        <Grid size={11}>
                                            <CardActionArea sx={{width: "100%", p: 2}}
                                                            onClick={(e) => onAddClick(e, row)}>
                                                <Image rounded={"12px"} className={"m-1"}
                                                       src={(row?.Food?.Multimedias[0]?.Url) || "/assets/images/icons/ic-empty-transaction.svg"}
                                                       width={"70%"}/>
                                                <Typography variant={"subtitle1"}>
                                                    {row.Food.Name}
                                                </Typography>
                                                <Typography variant={"body1"}>
                                                    {toPriceWithComma(row?.Food?.Price)}
                                                </Typography>
                                            </CardActionArea>
                                        </Grid>


                                        <Grid container direction={"column"} size={1}>
                                            {row.Food.IsCount && <Tooltip title={"غذای اصلی"}>
                                                <DinnerDining sx={{m: 0.5, mt: 2}}/>
                                            </Tooltip>}
                                            {row.Food.Description && <Tooltip title={row?.Food?.Description}>
                                                <Info sx={{m: 0.5}}/>
                                            </Tooltip>}
                                            {!!selected?.InvoiceFoods.find(inf => inf.Buyable.Id == row?.Food?.Id)?.Count &&
                                            <Tooltip
                                                title={selected?.InvoiceFoods.find(inf => inf.Buyable.Id == row?.Food?.Id)?.Count + " عدد در سبد خرید"}>
                                                <Card variant={"outlined"} sx={{mt: 1}}>
                                                    <LocalDining sx={{m: 0.5}}/>
                                                    <Typography
                                                        variant={"body2"}> {selected?.InvoiceFoods.find(inf => inf.Buyable.Id == row?.Food?.Id)?.Count || undefined}</Typography>

                                                    <IconButton size={"small"}
                                                                onClick={(e) => onDeleteClick(e, selected?.InvoiceFoods.find(inf => inf.Buyable.Id == row?.Food?.Id))}
                                                                color={"error"}>

                                                        {selected?.InvoiceFoods.find(inf => inf.Buyable.Id == row?.Food?.Id)?.Count > 1 ?
                                                            <RemoveCircle/> : <Delete/>}
                                                    </IconButton>

                                                </Card>
                                            </Tooltip>}


                                        </Grid>
                                    </Grid>
                                </Card>


                            </Grid>
                        ))}

                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default _CateringMenuFoodImageList;
