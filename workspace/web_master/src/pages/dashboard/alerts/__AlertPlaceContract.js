import React from 'react';
import Grid from "@mui/material/Grid2";
import {Button, Card, Typography} from "@mui/material";
import {FilePresent, NotificationsActive} from "@mui/icons-material";
import {useNavigate} from "react-router";

const __AlertPlaceContract = () => {

    const navigate = useNavigate();

    return (

        <Grid sx={{mx: 2, mt: 2}}>
            <Card sx={{p: 2, width: "100%"}} variant={"outlined"}>
                <Grid container justifyContent={"space-between"} direction={"row"}>
                    <Grid container alignContent={"center"} direction={"row"}>
                        <FilePresent color={"error"} fontSize={"large"}/>
                        <Typography sx={{px: 1}} variant={"h6"}>
                            قرارداد مجموعه شما تکمیل نشده!
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button
                            variant={"outlined"}
                            onClick={(e) => navigate("/contract")}
                        >
                            مطالعه و امضای قرارداد
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default __AlertPlaceContract;
