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
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

const IncreaseGroupCredit = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate()

    const corporate = useSelector(({corporate}) => corporate.corporate)
    const minCredit = 1000;
    const [groups, setGroups] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [formData,setFormData] = useState({})


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

            if (formData.CreditAmount < minCredit) {
                error.showError({message: "حداقل اعتبار قابل افزایش " + toPriceWithComma(minCredit) + " تومان می باشد"});
                return;
            }
            setOpenModalConfirm(false);
            corporatePersonnel_addCreditToAll({
                CorporateId: corporate.Id,
                ...formData,
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
                            <Typography variant={"subtitle1"}>
                                {selectedGroup ?
                                    "افزایش اعتبار "+formData.Name+" برای کاربران گروه " + selectedGroup.Name + " و هر یک به مبلغ " + toPriceWithComma(formData.CreditAmount) + " تومان را تایید میکنم" :
                                    "افزایش اعتبار "+formData.Name+" برای همه کاربران و هر یک به مبلغ " + toPriceWithComma(formData.CreditAmount) + " تومان را تایید میکنم. این اعتبار بدون توجه به گروه بندی، به همه کاربران داده خواهد شد."}
                            </Typography>

                            {(corporate.ContractType!="ALPHA")&&<Typography variant={"body2"}> {"تاریخ انقضا اعتبار ها : " + new Date( formData.ExpireDate).toLocaleDateString('fa-IR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })} </Typography>}
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

        console.log(formData.CreditAmount , minCredit,formData.CreditAmount < minCredit)
        if (!formData.CreditAmount||formData.CreditAmount < minCredit) {
            error.showError({message: "حداقل اعتبار قابل افزایش " + toPriceWithComma(minCredit) + " تومان می باشد"});
            return;
        }
        if (!formData.Name) {
            error.showError({message: "نام برای اعتبار انتخاب نشده"});
            return;
        }
        if ((corporate.ContractType!="ALPHA")&&!formData.ExpireDate) {
            error.showError({message: "تاریخ انقضا برای اعتبار ها الزامی است"});
            return;
        }
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
                                sx={{mt:2}}
                                name={"CreditAmount"}
                                label="نام اعتبار"
                                type="text"
                                value={formData.Name}
                                onChange={(e) => setFormData({...formData,Name:e.target.value})}
                                fullWidth
                                variant={"outlined"}
                            />
                            {(corporate.ContractType!="ALPHA")&&<LocalizationProvider dateAdapter={AdapterDateFnsJalali} >
                                <DatePicker
                                    value={formData?.ExpireDate}
                                    sx={{mt: 2, mb: 1}}
                                    name={"ExpireDate"}
                                    label={"تاریخ انقضا"}
                                    onChange={(e)=>setFormData({...formData,ExpireDate:e})}
                                    className="w-100"
                                />
                            </LocalizationProvider>}
                            <TextField
                                autoFocus
                                margin="dense"
                                name={"CreditAmount"}
                                label="تومان"
                                type="text"
                                value={toPriceWithComma(formData.CreditAmount)}
                                onChange={(e) => setFormData({...formData,CreditAmount:toPriceWithoutComma(e.target.value)})}
                                fullWidth
                                variant={"outlined"}
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
                                    autoFocus
                                    sx={{mt:2}}
                                    name={"CreditAmount"}
                                    label="نام اعتبار"
                                    type="text"
                                    value={formData.Name}
                                    onChange={(e) => setFormData({...formData,Name:e.target.value})}
                                    fullWidth
                                    variant={"outlined"}
                                />
                                {(corporate.ContractType!="ALPHA")&&<LocalizationProvider dateAdapter={AdapterDateFnsJalali} >
                                    <DatePicker
                                        value={formData?.ExpireDate}
                                        sx={{mt: 2, mb: 1}}
                                        name={"ExpireDate"}
                                        label={"تاریخ انقضا"}
                                        onChange={(e)=>setFormData({...formData,ExpireDate:e})}
                                        className="w-100"
                                    />
                                </LocalizationProvider>}
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name={"CreditAmount"}
                                    label="تومان"
                                    type="text"
                                    value={toPriceWithComma(formData.CreditAmount)}
                                    onChange={(e) => setFormData({...formData,CreditAmount:toPriceWithoutComma(e.target.value)})}
                                    fullWidth
                                    variant={"outlined"}
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
