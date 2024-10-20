import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import {
    purchasedSubscribe_addEnterToSubscribe,
    purchasedSubscribe_increaseExpireDate,
    purchasedSubscribe_scanned
} from "../../../../network/api/subscribe.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../../../components/GympinPagesProvider";

const _SingleSubscribeActions = ({subscribe, renewSubscribe}) => {
    const error = useContext(ErrorContext);
    const [openModalAddEntry, SetOpenModalAddEntry] = useState(false)
    const [openModalFreeze, SetOpenModalFreeze] = useState(false)

    function renderModalAddEntry() {
        function addEntry(e) {
            e.preventDefault()
            SetOpenModalAddEntry(false);
            purchasedSubscribe_addEnterToSubscribe({id: subscribe.Id,
                User: {Id: subscribe.User.Id}}).then(result => {
                renewSubscribe();
                error.showError({message: "ورود موفق",});
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }

        return (
            <div>
                <Dialog fullWidth open={openModalAddEntry} onClose={() => SetOpenModalAddEntry(false)}>
                    <Form onSubmit={(e) => addEntry(e)}>
                        <DialogTitle>{`شما در حال ثبت ورود برای ${subscribe.User.FullName} هستید`}</DialogTitle>
                        <DialogActions>
                            <Button onClick={() => SetOpenModalAddEntry(null)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    function renderModalFreeze() {
        function increaseExpireDate(e) {
            e.preventDefault()
            purchasedSubscribe_increaseExpireDate({
                IncreaseDayCount: e.target.increaseDayCount.value,
                SubscribeId: subscribe.Id
            }).then(result => {
                renewSubscribe();
                e.target.increaseDayCount.value = 0;
                SetOpenModalFreeze(false);
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
                <Dialog fullWidth open={openModalFreeze} onClose={() => SetOpenModalFreeze(false)}>
                    <Form onSubmit={(e) => increaseExpireDate(e)}>
                        <DialogTitle>افزودن تاریخ انقضای عضویت</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="increaseDayCount"
                                label="تعداد روز افزایش"
                                type="number"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => SetOpenModalFreeze(false)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            </div>
        )
    }

    return (
        <>

            <div>
                <div className={"section-title mb-1"}>عملیات ها</div>
            </div>
            <Card elevation={3} sx={{margin: 1,borderRadius:3}}>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding={1}
                    >
                        <Button  size={"large"} variant={"outlined"} fullWidth color={"info"} onClick={(e) => SetOpenModalAddEntry(true)}>ثبت ورود جدید برای کاربر</Button>
                    </Grid>
                </CardContent>
            </Card>
            <Card elevation={3} sx={{margin: 1,borderRadius:3}}>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"center"}
                        padding={1}
                    >
                        <Button size={"large"} variant={"outlined"} fullWidth color={"info"}
                                onClick={() => SetOpenModalFreeze(true)}>افزایش تاریخ انقضا (فریز)</Button>
                    </Grid>

                </CardContent>
            </Card>
            {renderModalAddEntry()}
            {renderModalFreeze()}
        </>
    );
};

export default _SingleSubscribeActions;
