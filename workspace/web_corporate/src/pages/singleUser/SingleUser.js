import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    corporatePersonnel_addPersonnelCredit, corporatePersonnel_delete,
    corporatePersonnel_getById, corporatePersonnel_update
} from "../../network/api/corporatePersonnel.api";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, FormControl,
    Grid, InputLabel,
    List,
    ListItem, MenuItem, OutlinedInput, Select,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {transactions_query} from "../../network/api/transactions.api";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";
import {useSelector} from "react-redux";

const SingleUser = (props) => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const {PersonnelId} = useParams();
    const navigate = useNavigate();
    const [groups,setGroups] = useState([])
    const [person, setPerson] = useState([]);
    // const [personCredits, setPersonCredits] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false);
    useEffect(() => {
        document.title = 'مشخصات کاربر';
        getPerson();
        getCorporateCategories();
    }, [PersonnelId]);

    function getCorporateCategories(){
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
    //
    // function getAddCreditTransaction(userId, CorporateId) {
    //     transactions_query({
    //         queryType: "FILTER",
    //         UserId: userId,
    //         CorporateId: CorporateId,
    //         TransactionType: "CORPORATE_PERSONNEL_ADD_CREDIT",
    //         paging: {Page: 0, Size: 300, orderBy: "Id", Desc: true}
    //     }).then(result => {
    //         setPersonCredits(result.data.Data.content)
    //     }).catch(e => {
    //         try {
    //             error.showError({message: e.response.data.Message,});
    //         } catch (f) {
    //             error.showError({message: "خطا نا مشخص",});
    //         }
    //     })
    // }


    function setPersonGroup(group){
        corporatePersonnel_update({id: PersonnelId,PersonelGroup:{Id:group.target.value}}).then(result => {
            getPerson();
            error.showError({message: "ثبت موفق",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }
    function getPerson() {
        corporatePersonnel_getById({id: PersonnelId}).then(result => {
            setPerson(result.data.Data);
            // getAddCreditTransaction(result.data.Data.User.Id, result.data.Data.Corporate.Id);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function renderModalAddCredit() {
        function addCredit(e) {
            e.preventDefault()
            setOpenModalAdd(false);
            corporatePersonnel_addPersonnelCredit({
                CorporatePersonnel: {Id: person.Id},
                CreditAmount: toPriceWithoutComma(e.target.CreditAmount.value)
            })
                .then(result => {
                    getPerson();
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => addCredit(e)}>
                    <DialogTitle>افزودن اعتبار</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن اعتبار مبلغ را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name={"CreditAmount"}
                            label="تومان"
                            type="text"
                            onChange={(e) => {
                                e.target.value = toPriceWithComma(e.target.value);
                            }}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button type={"submit"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }


    function renderModalDeleteUser() {
        if (!person.User) return;

        function deleteUser(e) {
            e.preventDefault()
            setOpenModalDeleteUser(false);
            corporatePersonnel_delete({Id:person.Id})
                .then(result => {
                    navigate('/personnel', {replace: true});
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
        }

        return (
            <Dialog open={openModalDeleteUser} onClose={() => setOpenModalDeleteUser(false)}>
                <Form onSubmit={(e) => deleteUser(e)}>
                    <DialogTitle>حذف کاربر</DialogTitle>
                    <DialogContent>
                        <DialogContentText component={"div"}>
                            <Typography variant={"subtitle1"}>
                                {"آیا از حذف " + (person.User.FullName ? person.User.FullName : person.User.PhoneNumber) + " اطمینان دارید؟"}
                            </Typography>
                            <Typography variant={"caption"}>
                                توجه داشته باشید اعتباری که تاکنون برای این کاربر منظور شده برای او باقی می ماند و کاربر حق استفاده از این اعتبار را خواهد داشت .
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"}
                                onClick={() => setOpenModalDeleteUser(false)}>لغو</Button>
                        <Button variant={"contained"} color={"success"} type={"submit"}>حذف</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }

    return (
        <>

            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={(
                        <>
                            <Typography
                                sx={{display: "inline"}}
                                component="p"
                                variant="body1"
                                color="text.primary"
                            >

                                {"اعتبار فعلی : " + toPriceWithComma(person.CreditBalance)}
                            </Typography>
                        </>
                    )}
                    action={(<>
                        <Button variant={"contained"} onClick={() => setOpenModalAdd(true)} sx={{margin: 1}}>افزایش
                            اعتبار</Button>
                    </>)}
                />
                {person.User && <CardContent>
                    <Grid container alignItems={"center"}
                          direction="column"
                          justifyContent={"center"}>
                        <Avatar alt={"userImage"} src={(person.User.Avatar) ? (person.User.Avatar.Url || "") : ""}
                                sx={{width: 120, height: 120}}/>

                        <Typography
                            sx={{display: "inline"}}
                            component="p"
                            variant="h6"
                            color="text.primary"
                        >
                            {person.User.FullName ? person.User.FullName : person.User.PhoneNumber}
                        </Typography>

                    </Grid>
                </CardContent>}
            </Card>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"تاریخچه شارژهای کاربر"}
                />
                <CardContent>
                    <List>
                        {person.CreditList&&person.CreditList.reverse().map(item => (
                            <ListItem key={item.Id}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography
                                        variant={"subtitle1"}>{"افزایش : " + toPriceWithComma(item.CreditAmount) + " تومان"}</Typography>

                                    <Typography
                                        variant={"overline"}>{new Date(item.CreatedDate).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</Typography>
                                </Grid>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="div"/>

                            </ListItem>))}
                    </List>
                </CardContent>
            </Card>

            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-name-label">تغییر گروه کاربر</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            input={<OutlinedInput label="تغییر گروه کاربر  " />}
                            value={person.PersonnelGroup?person.PersonnelGroup.Id:0}
                            onChange={(e)=>setPersonGroup(e)}
                        >
                            {groups&&groups.map((cat) => (
                                <MenuItem
                                    key={cat.Id}
                                    value={cat.Id}
                                >
                                    {cat.Name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
            {person.Role != "ADMIN" &&
            <Card elevation={3} sx={{margin: 1}}>
                <CardContent>
                    <Button variant={"contained"} onClick={() => setOpenModalDeleteUser(true)} sx={{margin: 1}}
                            fullWidth>حذف کاربر از مجموعه</Button>
                </CardContent>
            </Card>}
            {renderModalAddCredit()}
            {renderModalDeleteUser()}
        </>
    );
};

export default SingleUser;
