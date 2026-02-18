import React, {useState} from 'react';
import {CardContent, CardHeader, Collapse, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import {UserFinanceTypesEnum} from "../../helper/enums/UserFinanceTypesEnum";
import {TransactionStatus} from "../../helper/enums/TransactionStatus";

const __TransactionListItem = ({item}) => {
    const [details, setDetails] = useState(false);
    return (
        <>
            <CardHeader
                onClick={e => setDetails(!details)}
                title={<ListItemText
                    sx={{ml:1}}
                    primary={<Typography
                                         sx={{inlineSize: "max-content", mt: 1}}>{item?.Purchased?.Name}</Typography>}
                    secondary={<Typography variant={"overline"}
                                           sx={{mt: 3}}>{item?.Purchased?.Customer?.FullName}
                    </Typography>}
                />}
                titleTypographyProps={{variant: "body2"}}
                action={<ListItemText
                    sx={{mr:1,textAlign:"end"}}
                    primary={<Typography component={"p"} variant={"body1"}
                                         sx={{textAlign: "end", mt: 2}}>{toPriceWithComma(item.Amount) + " تومان"}</Typography>}
                    secondary={<Typography variant={"overline"}
                                           sx={{textAlign: "end",mt: 3}}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                        hour: "numeric",
                        minute: "numeric",
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',

                    })}
                    </Typography>}

                />}
                sx={{backgroundColor: item?.Refounded?"#770d0d":"#216a93", color: "#ffffff", px: 1, py: 0}}
            />
            <Collapse in={details}>
                <CardContent>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"خریدار : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{item?.Purchased?.Customer?.FullName}</Typography>
                    </Grid>

                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"ذینفع : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{item?.FinanceUser?.User?.FullName}</Typography>
                    </Grid>

                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"حساب : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{UserFinanceTypesEnum[item?.FinanceUser?.FinanceType] + " ( " + item?.Place?.Name + " )"}</Typography>
                    </Grid>
                    {!item?.Refounded&&<Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"تغییر حساب "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{toPriceWithComma(item?.LatestBalance) + " به " + toPriceWithComma(item?.LatestBalance + item.Amount)}</Typography>
                    </Grid>}

                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"کد ارجاع : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{item?.Serial?.Serial?.split("-")[item?.Serial?.Serial?.split("-")?.length - 1]}</Typography>
                    </Grid>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"وضعیت تراکنش : "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{item?.Refounded?"بازپرداخت":TransactionStatus[item?.TransactionStatus]}</Typography>
                    </Grid>

                </CardContent>
            </Collapse>

        </>

    );
};

export default __TransactionListItem;
