import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
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
import {corporatePersonnel_add, corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import Grid from "@mui/material/Grid2";
import {corporate_getCorporateGroups} from "../../network/api/corporate.api";
import SearchTextField from "../../components/SearchTextField";
import {checkMobileValid, fixMobile} from "../../helper/utils";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const _UserList = () => {


    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [personnel, setPersonnel] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [sortBy, setSortBy] = useState("Id");
    const [searchText, setSearchText] = useState(undefined);
    const [groups, setGroups] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);

    useEffect(() => {
        getGroups();
    }, []);

    useEffect(() => {
        getPersonnel();
    }, [selectedGroup, page, rowsPerPage, searchText]);

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
        if(!corporate) return;
        setPersonnel(null);
        corporatePersonnel_query({
            queryType: "FILTER",
            CorporateId: corporate?.Id,
            FullName: searchText,
            GroupId: selectedGroup,
            paging: {Page: page, Size: rowsPerPage, Desc: true}
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


    return (
        <>

            <title>لیست کارمندان</title>
            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>کارمندان</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}><Button onClick={() => setOpenModalAdd(true)} variant={"contained"}>افزودن
                    کارمند</Button> </Grid>
            </Grid>
            <Card elevation={8} sx={{mt: 5, mb: 10, width: '100%', borderRadius: 2}}>
                <Grid container columns={12}>
                    <Grid sx={{p: 2}} size={{md: 4}}>
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
                    <Grid sx={{p: 2}} size={{md: 8}}>
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
                            <TableCell></TableCell>
                            <TableCell><TableSortLabel onClick={() => {
                                setSortBy("FullName")
                            }} direction={"desc"}>نام و نام خانوادگی</TableSortLabel></TableCell>
                            <TableCell>مجموع اعتبار</TableCell>
                            <TableCell>تعداد اعتبار</TableCell>
                            <TableCell>نزدیک ترین انقضا</TableCell>
                            <TableCell>گروه</TableCell>
                        </TableRow>
                    </TableHead>
                    {!personnel && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}
                    <TableBody>
                        {personnel?.content.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => navigate("/personnel/detail/" + row.Id)}
                            >
                                <TableCell sx={{justifyItems: "center"}}><Avatar src={row?.User?.Avatar?.Url}
                                                                                 sx={{width: 25, height: 25}}/></TableCell>
                                <TableCell>{row?.User?.FullName || "ثبت نشده"}</TableCell>
                                <TableCell>{row?.TotalCredit || 0}</TableCell>
                                <TableCell>{row?.CreditList?.length || 0}</TableCell>
                                <TableCell>{getNearestExpirationDate(row?.CreditList)}</TableCell>
                                <TableCell>{row?.PersonnelGroup?.Name || "بدون گروه"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <CardActions sx={{bgcolor: 'primary.boxBg', justifyContent: "end"}}>

                    {personnel && <TablePagination
                        sx={{alignItems: "center"}}
                        rowsPerPageOptions={[20, 30, 50]}
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
            {renderModalAdd()}
        </>
    );
};

export default _UserList;
