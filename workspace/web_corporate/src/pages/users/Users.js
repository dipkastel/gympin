import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import _ListItem from "../../components/_ListItem";
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
    Divider,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {toAbsoluteUrl, toPriceWithComma} from "../../helper/utils";
import {corporatePersonnel_add, corporatePersonnel_ByCorporate} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";


const Users = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [personnel, setPersonnel] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        getPersonnel();
    }, []);

    function getPersonnel() {
        corporatePersonnel_ByCorporate(corporate).then(result => {
            setPersonnel(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }


    function renderModalAdd() {

        function addPersonnel(e) {
            e.preventDefault()
            corporatePersonnel_add({
                Corporate: {Id: corporate.Id},
                PhoneNumber: e.target.PhoneNumber.value
            })
                .then(result => {
                    setOpenModalAdd(false);
                    getPersonnel();
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
                <Form onSubmit={(e) => addPersonnel(e)}>
                    <DialogTitle>افزودن پرسنل</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن فرد جدید شماره موبایل را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name={"PhoneNumber"}
                            label="موبایل"
                            type="number"
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


    return (
        <>
            <_ListItem title="افزایش اعتبار گروهی" destination="/personnel/increasegroupcredit"/>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={"لیست پرسنل"}
                    action={<Button variant={"outlined"} title={"btn_add"} onClick={() => setOpenModalAdd(true)}>افزودن
                        فرد جدید</Button>}
                />
                <CardContent sx={{margin: 0, paddingTop: 0}}>
                    <List>

                        {personnel && personnel.map(item => (
                            <div key={item.Id}>
                                <Link href={"/personnel/detail/"+item.Id} sx={{textDecoration: "none", color: "#666666"}}>
                                <ListItem alignItems="flex-start" sx={{width: '100%', bgcolor: 'background.paper'}}>
                                        <ListItemAvatar>
                                            <Avatar alt="item.User.Username" src={(item.User.Avatar)?(item.User.Avatar.Url||""):""}  sx={{width:40,height:40}} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            className="text-start"
                                            primary={item.User.FullName ? item.User.FullName : item.User.PhoneNumber}
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >

                                                        {"اعتبار باقی مانده : "+toPriceWithComma(item.CreditBalance)+" تومان"}
                                                    </Typography>
                                                </>
                                            }

                                        />
                                </ListItem>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}} component="li"/>
                                    </Link>
                            </div>
                        ))}

                    </List>
                    {/*<Pagination variant="outlined" count={1} color="primary"/>*/}
                </CardContent>
            </Card>
            {renderModalAdd()}
        </>
    );
};

export default Users;
