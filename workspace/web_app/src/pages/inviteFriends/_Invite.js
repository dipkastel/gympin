import React, {useContext, useEffect, useState} from 'react';
import {Card, CardContent, Fab, InputAdornment, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Check, ContentCopy, LinkSharp, ShareRounded} from "@mui/icons-material";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {getInviteCodes} from "../../network/api/account.api";

const _Invite = () => {
    const currentUser = useSelector(state => state.auth.user);
    const error = useContext(ErrorContext);
    const [invitationData,SetInvitationData] = useState();

    useEffect(() => {
        getInviteCodes()
            .then((result) => {
                SetInvitationData(result.data.Data);
            }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, []);


    return (
        <>{invitationData&& <Card elevation={3} sx={{margin: 1}}>
            <CardContent>
                <Typography variant={"h3"}>{invitationData.title}</Typography>
                <Typography variant={"body1"}>{invitationData.descriptoin}</Typography>
                <div className="form-group">
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="code"
                        type="text"
                        value={invitationData.firstInviteCode.code}
                        label={"کد"}
                        InputProps={{
                            style: {fontSize: 40},
                            startAdornment: (
                                <InputAdornment position="start">
                                    {invitationData.firstInviteCode.isActive&&
                                    <Fab onClick={() => {
                                        navigator.clipboard.writeText(invitationData.firstInviteCode.code);
                                        error.showError({message: "کپی شد",});
                                    }} variant={"contained"} sx={{margin: 1}} color={"error"} size="large">
                                        <ContentCopy/>
                                    </Fab>}

                                    {invitationData.firstInviteCode.isActive&&
                                    <Fab onClick={() => {
                                        navigator.clipboard.writeText("https://web.gympin.ir/auth/login?p=" + invitationData.firstInviteCode.code);
                                        error.showError({message: "کپی شد",});
                                    }} variant={"contained"} sx={{margin: 1}} color={"error"} size="large">
                                        <LinkSharp/>
                                    </Fab>}
                                    {!invitationData.firstInviteCode.isActive&&
                                    <Fab onClick={() => {
                                        error.showError({message: "کاربر با موفقیت ثبت نام کرده است",});
                                    }} variant={"contained"} sx={{margin: 1}} color={"success"} size="large">
                                        <Check/>
                                    </Fab>}
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="outlined-adornment-password"
                        className="w-100"
                        variant="outlined"
                        margin="normal"
                        name="code"
                        type="text"
                        value={invitationData.secondInviteCode.code}
                        label={"کد"}
                        InputProps={{
                            style: {fontSize: 40},
                            startAdornment: (
                                <InputAdornment position="start">
                                    {invitationData.secondInviteCode.isActive&&
                                    <Fab onClick={() => {
                                        navigator.clipboard.writeText(invitationData.secondInviteCode.code);
                                        error.showError({message: "کپی شد",});
                                    }} variant={"contained"} sx={{margin: 1}} color={"error"} size="large">
                                        <ContentCopy/>
                                    </Fab>}

                                    {invitationData.secondInviteCode.isActive&&
                                    <Fab onClick={() => {
                                        navigator.clipboard.writeText("https://web.gympin.ir/auth/login?p=" + invitationData.secondInviteCode.code);
                                        error.showError({message: "کپی شد",});
                                    }} variant={"contained"} sx={{margin: 1}} color={"error"} size="large">
                                        <LinkSharp/>
                                    </Fab>}
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </CardContent>
        </Card>}
        </>

    );
};

export default _Invite;
