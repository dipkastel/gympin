import React, {useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {Button, Card, CardContent, Grid, TextField} from "@mui/material";
import {toAbsoluteUrl} from "../../../../helper";
import {settings_callToNumber} from "../../../../network/api/settings.api";

const _DashCall = () => {

    const error = useContext(ErrorContext);
    const [phoneNumber, setPhonNumber] = useState("");
    const [disableCall, setDisableCall] = useState(true);

    useEffect(() => {
        setDisableCall(!phoneNumber.startsWith(0))
    }, [phoneNumber]);

    function callToNumber(e){
        e.preventDefault();
        settings_callToNumber({to_number: phoneNumber})
            .then(data => {
                error.showError({message: data.data.Data,});
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    return (<>

        <Card>

            <CardContent sx={{
                backgroundImage: `url(${toAbsoluteUrl("/media/bg/quickCardBg.png")})`,
                backgroundSize: "cover"
            }}>
                <Grid container alignItems={"center"} direction={"column"}>
                    <Grid size={12}>
                        <TextField
                            id="outlined-adornment-password"
                            className="kt-width-full"
                            variant="outlined"
                            margin="normal"
                            name="username"
                            type="username"
                            value={phoneNumber}
                            onChange={(e) => setPhonNumber(e.target.value)}
                            label={"شماره تلفن"}
                            size={"small"}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button
                            disabled={disableCall}
                            variant={"contained"}
                            onClick={(e)=>callToNumber(e)}
                            fullWidth>تماس</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </>)
}

export default _DashCall;
