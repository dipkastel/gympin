import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {corporatePersonnel_addCreditToAll} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";

const IncreaseGroupCredit = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()

    const corporate = useSelector(({corporate}) => corporate.corporate)
    const minCredit = 1000;
    const [credit, setCredit] = useState(0);
    const [groups, setGroups] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);

    useEffect(() => {
        document.title = 'افزایش اعتبار گروهی';
        if (openModalConfirm) {
            if (credit < minCredit) {
                error.showError({message: "حداقل اعتبار قابل افزایش " + toPriceWithComma(minCredit) + " تومان می باشد"})
                setOpenModalConfirm(false);
            }
        }
    }, [openModalConfirm]);

    useEffect(() => {
        getPersonnelGroup()
    }, []);

    function getPersonnelGroup() {

        corporate_getCorporateGroups({Id: corporate.Id}).then(result => {
            setGroups(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }


    function RenderModalConfirm() {

        function addPersonnelCredit(e) {
            e.preventDefault()
            setOpenModalConfirm(false);
            corporatePersonnel_addCreditToAll({
                CorporateId: corporate.Id,
                CreditAmount: toPriceWithoutComma(credit),
                GroupId:selectedGroup?.Id||null
            }).then(result => {
                navigate('/personnel', {replace: true});
            }).catch(ca => {
                try {
                    error.showError({message: ca.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalConfirm} onClose={() => setOpenModalConfirm(false)}>
                <Form onSubmit={(e) => addPersonnelCredit(e)}>
                    <DialogTitle>{selectedGroup?('افزودن اعتبار برای کاربران گروه '+selectedGroup.Name):'افزودن اعتبار برای همه'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {selectedGroup?
                                "افزایش اعتبار برای کاربران گروه "+selectedGroup.Name+" و هر یک به مبلغ " + toPriceWithComma(credit) + " تومان را تایید میکنم":
                            "افزایش اعتبار برای همه کاربران و هر یک به مبلغ " + toPriceWithComma(credit) + " تومان را تایید میکنم"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"}
                                onClick={() => setOpenModalConfirm(false)}>خیر</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>بله</Button>

                    </DialogActions>
                </Form>
            </Dialog>)
    }

    function openModalConfirmForm(e, group) {
        e.preventDefault();
        setCredit(e.target.credit.value);
        setSelectedGroup(group);
        setOpenModalConfirm(true);
    }

    return (
        <>
            {groups && <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                        <Typography variant={"subtitle1"}>
                            اعتباری که به هر یک از پرسنل اضافه میشود را وارد نمایید.
                        </Typography>
                        <Typography variant={"body2"}>
                            توجه داشته باشید اعتبار افزوده شده به پرسنل قابل بازگشت نمی باشد
                        </Typography>
                </CardContent>
            </Card>}
            {groups && <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"اعتبار به هر یک از پرسنل"}
                />
                <CardContent>

                    <Form onSubmit={(e) => openModalConfirmForm(e, null)}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credit"
                            label="مقدار اعتبار"
                            type="text"
                            onChange={(e) => {
                                e.target.value = toPriceWithComma(e.target.value)
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <Typography variant={"body2"}>
                            {/*{'مجموع اعتبار اضافه شده به پرسنل '+toPriceWithComma(credit*PersonelCount)+' تومان می باشد'}*/}
                        </Typography>
                        <Button variant={"outlined"} sx={{margin: 1}} type={"submit"}>ثبت</Button>
                    </Form>
                </CardContent>
            </Card>}
            {groups && groups.map(group => (
                <Card key={group.Id} elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        title={"اعتبار به هر یک از گروه " + group.Name}
                    />
                    <CardContent>
                        <Form onSubmit={(e) => openModalConfirmForm(e, group)}>
                            <TextField
                                margin="dense"
                                name="credit"
                                label="مقدار اعتبار"
                                type="text"
                                onChange={(e) => {
                                    e.target.value = toPriceWithComma(e.target.value)
                                }}
                                fullWidth
                                variant="standard"
                            />
                            <Typography variant={"body2"}>
                                {/*{'مجموع اعتبار اضافه شده به پرسنل '+toPriceWithComma(credit*PersonelCount)+' تومان می باشد'}*/}
                            </Typography>
                            <Button variant={"outlined"} sx={{margin: 1}}
                                    type={"submit"}>ثبت</Button>
                        </Form>
                    </CardContent>
                </Card>
            ))}

            {RenderModalConfirm()}
        </>
    );
};

export default IncreaseGroupCredit;
