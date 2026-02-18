import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import {purchasedSubscribe_addEnterToSubscribe} from "../../../../network/api/subscribe.api";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import {getUserCanSetEnter} from "../../../../helper/serverSettingsHelper";

const _WaitingUserListItem = ({purchasedItem, renewList}) => {

    const error = useContext(ErrorContext);
    const [hour, sethour] = useState(0);
    const [userEnterModal, setUserEnterModal] = useState(false)
    const user = useSelector(({auth}) => auth.user);



    useEffect(() => {
        let distance = new Date(purchasedItem?.UseExpireDate).getTime() - new Date().getTime();
        var hours = Math.floor((distance) / (1000 * 60 * 60));
        sethour(hours);
    }, []);

    function renderModalEnterUser() {
        const confirmEnter = (e) => {
            e.preventDefault()
            setUserEnterModal(false);
            error.showError({message: "در حال ثبت ورود",});
            purchasedSubscribe_addEnterToSubscribe({
                Id: purchasedItem.Id,
                User: {Id: user.Id}
            }).then(result => {
                renewList();
                error.showError({message: "ثبت موفق",});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }
        return (
            <div>
                <Dialog open={userEnterModal} onClose={() => setUserEnterModal(false)}>
                    <Form onSubmit={(e) => confirmEnter(e)}>
                        <DialogTitle>{"ورود " + purchasedItem?.User?.FullName}</DialogTitle>
                        <DialogContent>
                            <Alert severity={"error"}>
                                {"لطفا تا زمانی که کاربر به شما مراجعه نکرده است ورود آن را ثبت نکنید !"}
                            </Alert>
                            <Typography sx={{m: 2}} variant={"subtitle1"}>
                                {"آیا از ورود " + purchasedItem?.User?.FullName + " اطمینان دارید؟"}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant={"contained"} color={"error"} onClick={() => setUserEnterModal(false)}>لغو</Button>
                            <Button variant={"contained"} color={"success"} type={"submit"}>تایید</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        );
    }

    return (
        <>
            <Alert key={"InRow" + purchasedItem.Id}
                   severity={"warning"}
                   sx={{px: 1, m: 1}}
                   action={<Button size={"small"} sx={{mx: 1}} variant={"contained"} onClick={(e) => setUserEnterModal(true)}
                                   color={"success"}>ثبت ورود کاربر</Button>}>
                <Typography variant={"body1"}
                            sx={{px: 1}}>{"احتمال ورود " + (purchasedItem?.User?.FullName || "یک نفر") + " تا " + hour + " ساعت آینده"}</Typography>
            </Alert>
            {renderModalEnterUser()}
        </>
    );
};

export default _WaitingUserListItem;
