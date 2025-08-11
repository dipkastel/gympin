import React, {useState} from 'react';
import {CardContent, CardHeader, Collapse, Grid, ListItemText, Typography} from "@mui/material";
import {toPriceWithComma} from "../../helper/utils";
import {UserFinanceTypesEnum} from "../../helper/enums/UserFinanceTypesEnum";
import {TransactionStatus} from "../../helper/enums/TransactionStatus";

const __TransactionListItem = ({item}) => {
    const [details, setDetails] = useState(true);
    return (
        <>
            <CardHeader
                onClick={e => setDetails(!details)}
                title={<ListItemText
                    primary={<Typography variant={"body1"}
                                         sx={{inlineSize: "max-content"}}>{item?.Purchased?.Name}</Typography>}
                    secondary={<Typography variant={"overline"}
                                           sx={{mt: 3}}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                        hour: "numeric",
                        minute: "numeric",
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',

                    })}
                    </Typography>}
                />}
                titleTypographyProps={{variant: "body2"}}
                action={<ListItemText
                    primary={<Typography component={"p"} variant={"overline"}
                                         sx={{textAlign: "left", mt: 1, color: "#addead"}}>موفق</Typography>}
                    secondary={<Typography component={"p"} variant={"body1"} sx={{
                        textAlign: "right",
                        direction:"ltr",
                        mt: 0
                    }}>{toPriceWithComma(item.Amount) + " تومان"}</Typography>}

                />}
                sx={{backgroundColor: "#216a93", color: "#ffffff",direction:"rtl", px: 1, py: 1}}
            />
            <Collapse in={details}>
                <CardContent>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"خریدار : "}</Typography>

                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{item?.Serial?.CreatorUser?.FullName}</Typography>
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
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography component={"p"} sx={{mt: 1, color: "#aaaaaa"}}
                                    variant={"caption"}>{"تغییر حساب "}</Typography>
                        <Typography component={"p"} sx={{mt: 1}}
                                    variant={"caption"}>{toPriceWithComma(item?.LatestBalance) + " به " + toPriceWithComma(item?.LatestBalance + item.Amount)}</Typography>
                    </Grid>

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
                                    variant={"caption"}>{TransactionStatus[item?.TransactionStatus]}</Typography>
                    </Grid>

                </CardContent>
            </Collapse>

        </>

    );
};

export default __TransactionListItem;
