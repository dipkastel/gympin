import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    Checkbox,
    CircularProgress, Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Typography
} from "@mui/material";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {
    corporatePersonnel_add,
    corporatePersonnel_addCreditToAll,
    corporatePersonnel_query
} from "../../network/api/corporatePersonnel.api";
import Grid from "@mui/material/Grid2";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";
import SearchTextField from "../../components/SearchTextField";
import {checkMobileValid, fixMobile, toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Delete} from "@mui/icons-material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import _UsersActions from "../../components/_UsersActions";
import _UserList from "../users/_UserList";

export const IncreaseSelect = () => {


    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [personnel, setPersonnel] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState({Name: "Id", Desc: false});
    const [searchText, setSearchText] = useState(undefined);
    const [groups, setGroups] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalAddCredit, setOpenModalAddCredit] = useState(false);
    const [allSelected, setAllSelected] = useState(false);
    const [someSelected, setSomeSelected] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (corporate?.ContractType == "PRO" || corporate?.ContractType == "NEO") {
            setFormData({...formData, ExpireDate: new Date().setDate(new Date().getDate() + corporate?.DefaultExpireDuration)})
        }
    }, [corporate]);


    useEffect(() => {
        var all = personnel?.content?.every(p => selectedUsers?.map(d => d.Id).includes(p?.Id));
        setAllSelected(all)
        console.log("pe", personnel?.content?.some(p => selectedUsers?.some(su => su?.Id === p?.Id)));
        setSomeSelected(!all && personnel?.content?.some(p => selectedUsers?.some(su => su?.Id === p?.Id)))
    }, [personnel, selectedUsers]);


    useEffect(() => {
        getGroups();
    }, []);

    useEffect(() => {
        setPage(0);
    }, [sortBy]);

    useEffect(() => {
        getPersonnel();
    }, [selectedGroup, page, rowsPerPage, searchText, sortBy]);

    function getGroups() {
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
        if (!corporate) return;
        setPersonnel(null);
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate?.Id,
            FullName: searchText,
            GroupId: selectedGroup,
            paging: {Page: page, Size: rowsPerPage, orderBy: sortBy.Name, Desc: !sortBy.Desc}
        }).then(result => {
            setPersonnel(result.data.Data);
        }).catch(e => {
            setPersonnel(null);
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });

    }

    function getNearestExpirationDate(credit) {
        try {
            var date = credit[0].ExpireDate;
            for (let item in credit) {
                if (date > item?.ExpireDate)
                    date = item?.ExpireDate;
            }
            return new Date(date).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        } catch (e) {
            return "ثبت نشده"
        }

    }

    function selectGroup(e) {
        setSelectedGroup(e.target.value);
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
                e.target.value = fixMobile(e.target.value);
            else
                e.target.value = e.target.value.substring(0, 11)
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
                            sx={{mt: 2}}
                            onChange={e => changePhoneNumber(e)}
                            fullWidth
                            variant={"outlined"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"outlined"} onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button variant={"outlined"} color={"success"} type={"submit"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }


    function changeSelected(user) {
        if (selectedUsers.some(p => p.Id === user.Id))
            setSelectedUsers(selectedUsers.filter(p => p.Id !== user.Id));
        else
            setSelectedUsers([...selectedUsers, user]);
    }

    function ChangeSelectAll() {
        if (allSelected) {
            setSelectedUsers(selectedUsers.filter(su => !personnel?.content?.map(pp => pp.Id).includes(su.Id)));
        } else {
            setSelectedUsers([...selectedUsers, ...personnel?.content?.filter(pp => !selectedUsers.map(su => su.Id).includes(pp.Id))]);
        }
    }


    function renderModalAddCreditToSelectedUsers() {

        function addCredit(e) {
            e.preventDefault()
            setOpenModalAddCredit(false);
            error.showError({message: "لطفا کمی صبر کنید",});
            let personnelId = selectedUsers.map(s => s.Id);
            corporatePersonnel_addCreditToAll({
                PersonnelIds: personnelId,
                CorporateId: corporate.Id,
                ...formData
            })
                .then(result => {
                    setSelectedUsers([])
                    getPersonnel();
                    error.showError({message: "اعتبار ها داده شد",});
                }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });

        }


        return (
            <Dialog open={openModalAddCredit} onClose={() => setOpenModalAddCredit(false)}>
                <Form onSubmit={(e) => addCredit(e)}>
                    <DialogTitle>{"افزودن اعتبار به " + selectedUsers.length + " کاربر انتخاب شده"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            برای افزودن اعتبار مبلغ را وارد کنید
                        </DialogContentText>


                        <TextField
                            autoFocus
                            sx={{mt: 2}}
                            name={"CreditAmount"}
                            label="نام اعتبار"
                            type="text"
                            value={formData.Name}
                            onChange={(e) => setFormData({...formData, Name: e.target.value})}
                            fullWidth
                            variant={"outlined"}
                        />

                        {(corporate.ContractType != "ALPHA") && <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                            <DatePicker
                                value={formData?.ExpireDate}
                                sx={{mt: 2, mb: 1}}
                                name={"ExpireDate"}
                                label={"تاریخ انقضا"}
                                onChange={(e) => setFormData({...formData, ExpireDate: e})}
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
                            onChange={(e) => setFormData({...formData, CreditAmount: toPriceWithoutComma(e.target.value)})}
                            fullWidth
                            variant={"outlined"}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"} onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button variant={"contained"} color={"success"} type={"submit"}>ثبت</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }

    return (
        <>

            <title>لیست کارمندان</title>
            <Container maxWidth>

                <Card elevation={8} sx={{mt: 2, mb: 10, width: '100%', borderRadius: 2}}>
                    <Grid container columns={12}>
                        <Grid sx={{p: 2}} size={4}>
                            {groups && <FormControl fullWidth>
                                <InputLabel id="UserGroups">گروه‌ها</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedGroup}
                                    label="گروه‌ها"
                                    onChange={(e) => {
                                        selectGroup(e)
                                    }}
                                >
                                    <MenuItem>همه کارمندان</MenuItem>
                                    {groups.map(item => (
                                        <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>}
                            {!groups && <CircularProgress/>}
                        </Grid>
                        <Grid sx={{p: 2}} size={8}>
                            <SearchTextField
                                label={"جستجو نام و نام خانوادگی"}
                                fullWidth={true}
                                onChange={(e) => {
                                    setSearchText(e)
                                }}
                            />
                        </Grid>
                    </Grid>


                    <Table aria-label="userLists">
                        <TableHead sx={{bgcolor: 'primary.boxBg'}}>
                            <TableRow>
                                <TableCell>
                                    <FormControlLabel
                                        onChange={(e) => ChangeSelectAll()}
                                        color="primary"
                                        control={<Checkbox
                                            checked={allSelected}
                                            indeterminate={someSelected}/>}
                                    />
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell><TableSortLabel onClick={() => {
                                    setSortBy({Name: "User.FullName", Desc: !sortBy.Desc})
                                }} direction={(sortBy.Desc) ? "desc" : "asc"}>نام و نام خانوادگی</TableSortLabel></TableCell>
                                <TableCell>مجموع اعتبار</TableCell>
                                <TableCell>تعداد اعتبار</TableCell>
                                <TableCell>نزدیک ترین انقضا</TableCell>
                                <TableCell><TableSortLabel onClick={() => {
                                    setSortBy({Name: "User.Birthday", Desc: !sortBy.Desc})
                                }} direction={(sortBy.Desc) ? "desc" : "asc"}>تاریخ تولد</TableSortLabel></TableCell>
                                <TableCell>گروه</TableCell>
                                <TableCell align={"right"}>عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        {!personnel && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}
                        <TableBody>
                            {personnel?.content.map((row) => (
                                <TableRow
                                    key={row.name}
                                    hover
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >

                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            onChange={(e) => changeSelected(row)}
                                            color="primary"
                                            checked={selectedUsers.some(p => p.Id === row.Id)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{justifyItems: "center"}}><Avatar src={row?.User?.Avatar?.Url}
                                                                                     sx={{width: 25, height: 25}}/></TableCell>
                                    <TableCell>{row?.User?.FullName || " - "}</TableCell>
                                    <TableCell>{row?.TotalCredit || 0}</TableCell>
                                    <TableCell>{row?.CreditList?.length || 0}</TableCell>
                                    <TableCell>{getNearestExpirationDate(row?.CreditList)}</TableCell>
                                    <TableCell>{(row?.User?.Birthday) ? new Date(row?.User?.Birthday).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : " - "}</TableCell>
                                    <TableCell>{row?.PersonnelGroup?.Name || "بدون گروه"}</TableCell>
                                    <TableCell align={"right"}>
                                        <Button
                                            onClick={() => navigate("/personnel/detail/" + row.Id)} variant={"contained"}>جزئیات</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CardActions sx={{bgcolor: 'primary.boxBg', justifyContent: "end"}}>
                        {personnel && <TablePagination
                            sx={{alignItems: "center"}}
                            rowsPerPageOptions={[5, 20, 30, 50]}
                            count={personnel?.totalElements}
                            labelRowsPerPage={"تعداد نمایش"}
                            labelDisplayedRows={(a) => {
                                return ("نمایش " + a?.from + " تا " + a?.to + " از " + a?.count + " کارمند")
                            }}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                console.log(parseInt(event.target.value, 10));
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />}
                    </CardActions>
                </Card>
                {selectedUsers.length > 0 && <Card elevation={8} sx={{mt: 5, mb: 10, width: '100%', borderRadius: 2}}>

                    <Table aria-label="userLists">
                        <TableHead sx={{bgcolor: 'primary.boxBg'}}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>{selectedUsers.length + " نفر"}</TableCell>
                                <TableCell>نام و نام خانوادگی</TableCell>
                                <TableCell>تاریخ تولد</TableCell>
                                <TableCell>گروه</TableCell>
                            </TableRow>
                        </TableHead>
                        {!selectedUsers && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}
                        <TableBody>
                            {selectedUsers?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    hover
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >

                                    <TableCell padding="checkbox">
                                        <IconButton onClick={() => changeSelected(row)}>
                                            <Delete
                                                color="primary"
                                            />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell sx={{justifyItems: "center"}}><Avatar src={row?.User?.Avatar?.Url}
                                                                                     sx={{width: 25, height: 25}}/></TableCell>
                                    <TableCell>{row?.User?.FullName || " - "}</TableCell>
                                    <TableCell>{(row?.User?.Birthday) ? new Date(row?.User?.Birthday).toLocaleDateString('fa-IR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : " - "}</TableCell>
                                    <TableCell>{row?.PersonnelGroup?.Name || "بدون گروه"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CardActions sx={{bgcolor: 'primary.boxBg', justifyContent: "start", py: 2}}>

                        <Button variant={"contained"} sx={{px: 10}} onClick={() => setOpenModalAddCredit(true)}>اعتبار دهی</Button>
                    </CardActions>
                </Card>}
            </Container>
            {renderModalAdd()}
            {renderModalAddCreditToSelectedUsers()}
        </>
    );
};

export default IncreaseSelect;
