import React from 'react';
import {Avatar, Button, Card, Grid, TextField} from "@mui/material";
import {toAbsoluteUrl} from "../../helper/utils";

const EditProfile = () => {
    return (

        <Card elevation={3} sx={{margin:1}}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar
                    sx={{width: 120, height: 120,marginTop:3}}
                    alt="Remy Sharp"
                    src={toAbsoluteUrl("sd")}/>

                <div className="form-group p-4">
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"شماره همراه"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"نام کاربری"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"نام"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"نام خانوادگی"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"تاریخ تولد"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"کد ملی"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="username"
                        type="username"
                        label={"ایمیل"}
                    />
                    <TextField
                        fullWidth
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        multiline
                        margin="normal"
                        name="username"
                        type="username"
                        label={"درباره من"}
                    />
                    <Button className="mt-4" variant={"outlined"} fullWidth  >ثبت</Button>
                </div>

            </Grid>
        </Card>
    );
};

export default EditProfile;
