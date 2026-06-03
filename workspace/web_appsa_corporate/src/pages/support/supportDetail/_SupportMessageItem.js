import React from 'react';
import {Card, CardHeader, Chip, Grid2 as Grid, Typography} from "@mui/material";

const _SupportMessageItem = ({item}) => {
    return (
        <>
            <Grid container justifyContent={item.IsAnswer?"end":"start"} >
                <Card elevation={3} sx={{marginX: 1, mt: 1, borderRadius: 3,width:"fit-content",minWidth:"350px",maxWidth:"650px"}}>
                    <CardHeader
                        title={item.Message}
                        titleTypographyProps={{variant: "body1",whiteSpace:"pre-wrap"}}
                        action={item.UnreadCount > 0 && <Chip sx={{pt: "3px"}} size="small"
                                                              color={"error"}
                                                              label={item.UnreadCount}/>}
                    />
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"top"}
                        sx={{px: 2,borderTop:"2px solid",borderColor: "gray",backgroundColor:item.IsAnswer?"tertiary.darker":"secondary.darker"}}
                    >
                        <Typography sx={{color: "gray"}} variant={"overline"}>

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
                </Card>

            </Grid>

        </>
    );
};

export default _SupportMessageItem;
