import React from 'react';
import {Card, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {Image} from "react-bootstrap";

const _WizardContractAttachment = () => {
    return (
        <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{margin: 1, borderRadius: 3}}>
                <CardHeader sx={{
                    backgroundColor: "primary.main", color: "#fff"
                }} title="پیوست"/>
                <CardContent>
                    <Link href={"/assets/download/attachment.pdf"}>
                        <Image src={"/assets/images/attachment.png"}  width={"100%"}/>
                    </Link>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default _WizardContractAttachment;
