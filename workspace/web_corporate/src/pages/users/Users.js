import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import _ListItem from "../../components/_ListItem";
import {
    Avatar,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, Grid,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Pagination,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {checkMobileValid, toPriceWithComma} from "../../helper/utils";
import {
    corporatePersonnel_add,
    corporatePersonnel_ByCorporate,
    corporatePersonnel_query
} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";


const Users = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [personnel, setPersonnel] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const [groups,setGroups] = useState(null)

    useEffect(() => {
        document.title = 'پرسنل';
        if (!corporate) return;
        getPersonnelGroup();
    }, []);

    useEffect(() => {
        if (!groups) return;
        getPersonnel();
    }, [selectedPage]);
    useEffect(() => {
        if (!groups) return;
        setSelectedPage(1);
        getPersonnel();
    }, [groups,selectedTab]);


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

    function getPersonnel() {
        setPersonnel({});
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate.Id,
            GroupId: selectedTab==0?null:groups[selectedTab-1].Id,
            paging: {Page: selectedPage-1, Size: 10, Desc: true}
        }).then(result => {
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
            if (!checkMobileValid(e.target.PhoneNumber.value)) {
                error.showError({message: "شماره موبایل صحیح نیست",});
                return;
            }
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

    function onPageChange(e, v) {
        e.preventDefault();
        setSelectedPage(v);
    }

    return (
        <>
            <_ListItem title="افزایش اعتبار گروهی" destination={"/personnel/increasegroupcredit" }/>
            <_ListItem title="افزودن فرد جدید" onClick={() => setOpenModalAdd(true)}/>


            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                    value={selectedTab}
                    onChange={(e, n) => setSelectedTab(n)}
                    aria-label="usersTab"
                    variant={"scrollable"}
                >
                    <Tab label="همه" id={"group-tab-0"}  aria-controls={"group-tabpanel-0"}/>
                    {groups&&groups.map(group=>(
                        <Tab key={"g-"+group.Id} label={group.Name} id={"group-tab-"+group.Id} aria-controls={"group-tabpanel-"+group.Id}/>
                    ))}
                </Tabs>
            </Box>

                        <List>
                            {personnel.content && personnel.content.map((item) => (
                                <div key={item.Id}>
                                        <div key={item.Id}>
                                            <Card elevation={3} sx={{margin: 1}}>
                                                <Link href={"/personnel/detail/" + item.Id}
                                                      sx={{textDecoration: "none", color: "#666666"}}>
                                                    <ListItem alignItems="flex-start"
                                                              sx={{width: '100%', bgcolor: 'background.paper'}}>
                                                        <ListItemAvatar>
                                                            <Avatar alt="item.User.Username"
                                                                    src={(item.User.Avatar) ? (item.User.Avatar.Url || "") : ""}
                                                                    sx={{width: 40, height: 40}}/>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            className="text-start"
                                                            primary={<>

                                                                <Typography
                                                                    sx={{display: 'inline'}}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >

                                                                    {item.User.FullName ? item.User.FullName : item.User.Username}
                                                                </Typography>
                                                            </>}
                                                            secondary={
                                                                <>
                                                                    <Typography
                                                                        sx={{display: 'inline'}}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >

                                                                        {"اعتبار باقی مانده : " + toPriceWithComma(item.CreditBalance) + " تومان"}
                                                                    </Typography>
                                                                </>
                                                            }

                                                        />
                                                        {(selectedTab==0)&&<ListItemText
                                                            className="text-end"
                                                            primary={
                                                                <Typography
                                                                    sx={{display: 'inline'}}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >

                                                                    {item.PersonnelGroup?.Name||"همه"}
                                                                </Typography>
                                                            }
                                                        />

                                                        }
                                                    </ListItem>
                                                    <Divider variant="inset" sx={{marginLeft: 0, marginRight: "72px"}}
                                                             component="li"/>
                                                </Link>
                                            </Card>
                                        </div>
                                </div>
                            ))}
                            {personnel.totalPages &&<Grid container direction={"rows"} justifyContent={"center"} alignContent={"center"}>
                                <Pagination  count={personnel.totalPages} boundaryCount={1}  defaultPage={1} size={"medium"} page={selectedPage}  onChange={(e,v)=>onPageChange(e,v)} />
                            </Grid>}
                        </List>

            {renderModalAdd()}
        </>
    );
};

export default Users;
