import React, {useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Collapse, Divider, Grid, IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import {toPriceWithComma} from "../../../helper/utils";
import {ExpandLess, ExpandLessTwoTone, ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import _PlanTimingReserve from "./_PlanTimingReserve";
import {genders} from "../../../helper/enums/genders";


const _PlaceReserveListItem = ({plan, number, addToTickets}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div >
            <ListItem disablePadding>
                <ListItemButton disabled={!plan.Enable}>
                    <Card sx={{width: "100%"}} elevation={6}>
                        <CardHeader
                            component={"a"}
                            sx={{textDecoration: "none", textAlign: "start", color: "#000000"}}
                            title={plan.Name}
                            subheader={<><Typography component={"span"} variant={"body2"}>
                                انقضا :
                            </Typography><Typography component={"span"} variant={"body1"}>
                                {(plan.Expire_type == "Duration") ?
                                    ("از خرید نهایی تا " + plan.Expire_duration + " روز")
                                    :
                                    new Date(plan.Expire_date).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                }
                            </Typography></>}
                            action={
                                <IconButton
                                    expand={isExpanded.toString()}
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    aria-expanded={isExpanded}
                                    aria-label="مشاهده روز های قابل استفاده"
                                >
                                    {isExpanded?<ExpandLessTwoTone/>:<ExpandMoreIcon/>}
                                </IconButton>
                            }
                        />
                        <CardContent sx={{direction:"rtl",pt:0}}>

                            <Grid sx={{mb:1}} container justifyContent={"space-between"} direction={"row"} alignItems={"center"}>
                                <Grid item>

                                    <Grid container justifyContent={"center"} direction={"column"} alignItems={"start"}>
                                        <Grid item sx={{m:0,p:0}}>
                                            <Typography  component={"span"}
                                                         color={"darkgreen"}
                                                         variant={"h5"}>{plan.EntryTotalCount}</Typography>
                                            <Typography component={"span"} variant={"body1"}>{" جلسه"}</Typography>
                                        </Grid>
                                        <Grid item sx={{mt:"-8px",p:0}}>
                                            <Typography component={"span"} variant={"body1"}>{genders[plan.Gender]}</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item>
                                    <Grid container justifyContent={"center"} direction={"column"} alignItems={"end"}>
                                        <Grid item sx={{m:0,p:0}}>
                                            <Typography  component={"span"}
                                                        color={"darkgreen"}
                                                        variant={"h5"}>{toPriceWithComma(plan.Price)}</Typography>
                                            <Typography component={"span"} variant={"body1"}>{" تومان"}</Typography>
                                        </Grid>
                                        <Grid item sx={{mt:"-8px",p:0}}>
                                            {(plan.Price < plan.ValuePrice) && <>
                                                <Typography component={"span"}
                                                            sx={{textAlign: "start", textDecoration: "line-through"}}
                                                            color={"lightgray"}
                                                            variant={"h6"}> {toPriceWithComma(plan.ValuePrice)}</Typography>
                                                <Typography component={"span"} color={"lightgray"}
                                                            variant={"body1"}> {" تومان"} </Typography>
                                            </>}

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Collapse sx={{textAlign:"start"}} in={isExpanded} timeout="auto" unmountOnExit>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0,width:"100%"}} component="div"/>
                                {isExpanded && <_PlanTimingReserve plan={plan}/>}
                            </Collapse>
                            <Button variant={"contained"} color={"primary"} onClick={()=>addToTickets(plan)} sx={{textAlign:"center"}} fullWidth >
                                <Typography variant={"h6"}>{" افزودن به بلیط ها"}</Typography>
                            </Button>
                        </CardContent>

                    </Card>
                </ListItemButton>
            </ListItem>

        </div>
    );
};

export default _PlaceReserveListItem;
