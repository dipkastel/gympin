import React, {useContext, useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card, CardActions,
    CardContent,
    CardHeader, Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {corporatePersonnel_addCreditToAll} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";
import Grid from "@mui/material/Grid2";

const IncreaseGroupCredit = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()

    const corporate = useSelector(({corporate}) => corporate.corporate)
    const minCredit = 1000;
    const [credit, setCredit] = useState(0);
    const [groups, setGroups] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

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
    useEffect(() => {
        console.log(selectedGroup);
    }, [selectedGroup]);

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
                GroupId: selectedGroup?.Id || null
            }).then(result => {
                error.showError({message: "اعتبار‌ها داده شد.",});
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
                    <DialogTitle>{selectedGroup ? ('افزودن اعتبار برای کاربران گروه ' + selectedGroup.Name) : 'افزودن اعتبار برای همه'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {selectedGroup ?
                                "افزایش اعتبار برای کاربران گروه " + selectedGroup.Name + " و هر یک به مبلغ " + toPriceWithComma(credit) + " تومان را تایید میکنم" :
                                "افزایش اعتبار برای همه کاربران و هر یک به مبلغ " + toPriceWithComma(credit) + " تومان را تایید میکنم. این اعتبار بدون توجه به گروه بندی، به همه کاربران داده خواهد شد."}
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
            <Container>

                <title>اعتبار دهی گروهی</title>
                <Grid container columns={9} alignItems={"center"}>
                    <Grid  size={{md:6,lg:6,xl:6}} ><Typography sx={{m:4}} variant={"h4"} >اعتبار دهی</Typography></Grid>
                </Grid>
                {groups &&
                <Alert sx={{mt: 2,mx:1}} severity={"warning"} variant={"outlined"}>
                    اعتباری که به هر یک از پرسنل اضافه میشود را وارد نمایید.
                </Alert>}

                {groups && <Tabs
                    sx={{mt:3}}
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    aria-label="usersTab"
                    variant={"scrollable"}
                >
                    <Tab label="همه" id={"group-tab-0"} aria-controls={"group-tabpanel-0"}/>
                    {groups && groups.map(group => (
                        <Tab key={"g-" + group.Id} label={group.Name} id={"group-tab-" + group.Id}
                             aria-controls={"group-tabpanel-" + group.Id}/>
                    ))}
                </Tabs>}
                {groups && <Card hidden={selectedTab !== 0} elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        titleTypographyProps={{variant: "body2"}}
                        title={"اعتبار به هر یک از پرسنل"}
                    />
                    <CardContent>
                        <Form onSubmit={(e) => openModalConfirmForm(e, null)}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="credit"
                                label="مقدار اعتبار (تومان)"
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
                            <CardActions sx={{justifyContent:"end"}}>

                                <Button variant={"contained"} sx={{margin: 1,px:9}} type={"submit"}>ثبت</Button>
                            </CardActions>
                        </Form>
                    </CardContent>
                </Card>}
                {selectedTab != 0 && groups && groups.map(group => (
                    <Card hidden={group.Id !== groups[selectedTab - 1].Id} key={group.Id} elevation={3} sx={{margin: 1}}>
                        <CardHeader
                            titleTypographyProps={{variant: "body2"}}
                            title={"اعتبار به هر یک از پرسنل گروه " + group.Name}
                        />
                        <CardContent>
                            <Form onSubmit={(e) => openModalConfirmForm(e, group)}>
                                <TextField
                                    margin="dense"
                                    name="credit"
                                    label="مقدار اعتبار (تومان)"
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
                                <CardActions sx={{justifyContent:"end"}}>

                                    <Button variant={"contained"} sx={{margin: 1,px:9}} type={"submit"}>ثبت</Button>
                                </CardActions>
                            </Form>
                        </CardContent>
                    </Card>
                ))}


            </Container>
            {RenderModalConfirm()}
        </>
    );
};

export default IncreaseGroupCredit;
