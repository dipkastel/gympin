import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import _ListItem from "../../components/_ListItem";
import {
    Avatar,
    Box,
    Button,
    Card,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Pagination,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {checkMobileValid, fixMobile, toPriceWithComma} from "../../helper/utils";
import {corporatePersonnel_add, corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";
import {Search} from "@mui/icons-material";
import SearchTextField from "../../components/SearchTextField";


const Users = () => {
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [personnel, setPersonnel] = useState([]);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [addPhoneNumber, setAddPhoneNumber] = useState(null);
    const [search, setSearch] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const [groups, setGroups] = useState(null)
    const [searchText, setSearchText] = useState(null)

    useEffect(() => {
        if (!corporate) return;
        getPersonnelGroup();
    }, []);

    useEffect(() => {
        if (!groups) return;
        getPersonnel();
    }, [selectedPage, searchText, search]);

    useEffect(() => {
        if (!groups) return;
        setSelectedPage(1);
        getPersonnel();
    }, [groups, selectedTab]);


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
        if(!corporate) return;
        setPersonnel({});
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate?.Id,
            PhoneNumber: search ? searchText : null,
            GroupId: (search || selectedTab == 0) ? null : groups[selectedTab - 1].Id,
            paging: {Page: selectedPage - 1, Size: 10, Desc: true}
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
            if (personnel?.content?.length > 1 && (corporate.Status == "DEMO" || corporate?.Status == "SECURE_DEMO")) {
                error.showError({message: "برای Demo بیش از 2 کاربر امکان پذیر نیست",});
                return;
            }
            if (!checkMobileValid(e.target.PhoneNumber.value)) {
                error.showError({message: "شماره موبایل صحیح نیست",});
                return;
            }
            corporatePersonnel_add({
                Corporate: {Id: corporate.Id},
                PhoneNumber: e.target.PhoneNumber.value
            }).then(result => {
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

        function changePhoneNumber(e) {
            if (e.target.value.length < 12)
                setAddPhoneNumber(fixMobile(e.target.value));
            else
                setAddPhoneNumber(e.target.value.substring(0, 11))
        }

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => addPersonnel(e)}>
                    <DialogTitle>افزودن پرسنل</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن فرد جدید شماره همراه را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name={"PhoneNumber"}
                            label="موبایل"
                            type="number"
                            value={addPhoneNumber}
                            onChange={e => changePhoneNumber(e)}
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
            {/*<div className={"container"}>*/}
                {/*<div className={"row"}>*/}
                {/*<div className={"col-md-6"}>*/}
                {/*    <_ListItem title="افزایش اعتبار گروهی" destination={"/personnel/increasegroupcredit"}/>*/}
                {/*    <_ListItem title="افزودن فرد جدید" onClick={() => setOpenModalAdd(true)}/>*/}
                {/*</div>*/}

                {/*<div className={"col-md-6"}>*/}


                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Grid item>
                            <Collapse in={!search}>
                                <Tabs
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
                                </Tabs>
                            </Collapse>
                            <Collapse in={search}>
                                <SearchTextField
                                    autoFocus={true}
                                    margin="dense"
                                    label="جستجو با موبایل"
                                    value={searchText}
                                    onChange={e => setSearchText(e)}
                                    fullWidth
                                    variant={"outlined"}
                                    sx={{mx: 1}}
                                    size={"small"}
                                />
                            </Collapse>
                        </Grid>
                        <Grid item><IconButton onClick={e => setSearch(!search)}><Search/></IconButton></Grid>
                    </Grid>
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
                                                        src={(item?.User?.Avatar) ? (item?.User?.Avatar?.Url || "") : ""}
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

                                                            {"اعتبار باقی مانده : " + toPriceWithComma(item.TotalCredit) + " تومان"}
                                                        </Typography>
                                                    </>
                                                }

                                            />
                                            {(selectedTab == 0) && <ListItemText
                                                className="text-end"
                                                primary={
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >

                                                        {item.PersonnelGroup?.Name || "همه"}
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
                    {personnel?.totalPages > 0 &&
                    <Grid container direction={"rows"} justifyContent={"center"} alignContent={"center"}>
                        <Pagination count={personnel.totalPages} boundaryCount={1} defaultPage={1} size={"medium"}
                                    page={selectedPage} onChange={(e, v) => onPageChange(e, v)}/>
                    </Grid>}
                </List>

                {/*</div>*/}
                {/*</div>*/}
                {renderModalAdd()}
            {/*</div>*/}

        </>

    );
};

export default Users;
