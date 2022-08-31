import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import QRCode from "react-qr-code";

const _EnterList = (props) => {
    console.log(props.data.enters)
    return (
        <>
            {props.data.enters.map(item=>(
                    <>
                        <Card  elevation={3} sx={{margin:1,backgroundColor:"#acd7a2"}}>
                            <CardContent>
                                <Grid
                                    container
                                    direction={"column"}
                                    justifyContent="center"
                                    alignItems="center">
                                    <QRCode className={""} value={item.code} />
                                    <Typography variant={"h1"} sx={{margin:1}}>{item.code}</Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </>
                )
            )}
        </>
    );
};

export default _EnterList;
