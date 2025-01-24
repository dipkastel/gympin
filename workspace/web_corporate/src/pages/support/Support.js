import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {Button, Card, CardHeader, Chip, Container, Grid2 as Grid, Link, List, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Support_query} from "../../network/api/support.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {SupportStatus} from "../../helper/enums/SupportStatus";

const Support = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [support, SetSupport] = useState(null);
    const corporate = useSelector(({corporate}) => corporate.corporate)

    useEffect(() => {
        document.title = 'پشتیبانی';
        getAllSupport();
    }, []);

    function getAllSupport() {
        Support_query({
            queryType: "FILTER",
            CorporateId: corporate.Id,
            paging: {Page: 0, Size: 50, orderBy: "Id", Desc: true}
        }).then(result => {
            SetSupport(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })

    }

    function getCollorByStatus(Status) {
        switch (Status) {
            case "COMPLETE":
                return "quinary.boxBg";
            case "CANCEL":
                return "primary.boxBg";
            case "AWAITING_EXPERT":
                return "tertiary.boxBg";
            case "AWAITING_USER":
                return "quaternary.boxBg";
            case "PROCESSING":
                return "quinary.boxBg";
        }
    }

    return (
        <>

            <Container>


                <title>درخواست‌های پشتیبانی</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>درخواست‌های پشتیبانی</Typography></Grid>
                    <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}><Button onClick={() => navigate("/support/new")}
                                                                                 variant={"contained"}>تیکت پشتیبانی جدید</Button> </Grid>
                </Grid>


                {support?.content && <>
                    <List sx={{width: '100%'}}>
                        {support?.content.map(item => (
                            <div key={item.Id}>
                                <Link href={"/Support/detail/" + item.Id}
                                      sx={{width: "100%", textDecoration: "none"}}>
                                    <Card elevation={3} sx={{marginX: 1, mt: 1, borderRadius: 3}}>
                                        <CardHeader sx={{backgroundColor: getCollorByStatus(item.Status)}}
                                                    title={item.Title}
                                                    titleTypographyProps={{variant: "body1"}}
                                                    action={item.UnreadCount > 0 && <Chip sx={{pt: "3px"}} size="small"
                                                                                          color={"error"}
                                                                                          label={item.UnreadCount}/>}
                                        />
                                    </Card>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems={"top"}
                                        sx={{px: 2}}
                                    >
                                        <Typography sx={{color: "gray"}} variant={"overline"}>
                                            {SupportStatus[item.Status]}
                                        </Typography>
                                        <Typography sx={{color: "gray"}} variant={"overline"}>
                                            {new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </Typography>
                                    </Grid>
                                </Link>
                            </div>

                        ))}

                    </List>
                </>}
            </Container>

        </>
    );
};

export default Support;
