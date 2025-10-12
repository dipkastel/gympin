import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    Checkbox,
    CircularProgress,
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
import {checkMobileValid, encodeId, fixMobile, toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Delete} from "@mui/icons-material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import _UsersActions from "../../components/_UsersActions";

export const _UserList = ({personnel,corporate,sortBy,setSortBy,page,setPage,rowsPerPage, setRowsPerPage,selectedGroup, setSelectedGroup,setSearchText}) => {


    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const [groups, setGroups] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);



    useEffect(() => {
        getGroups();
    }, []);


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

    function getNearestExpirationDate(allCredit) {
        try {
            var credit = allCredit?.filter(c=>c.Status=="ACTIVE");
            var date = credit[0]?.ExpireDate;
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
            return "ندارد"
        }

    }

    function selectGroup(e) {
        setSelectedGroup(e.target.value);
    }


    return (
        <>
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
                        </TableRow>
                    </TableHead>
                    {!personnel && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}
                    <TableBody>
                        {personnel?.content.map((row) => (
                            <TableRow
                                key={row.name}
                                hover
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={() => navigate("/personnel/detail/" + encodeId(row.Id))}
                            >

                                {/*<TableCell padding="checkbox">*/}
                                {/*    <Checkbox*/}
                                {/*        onChange={(e) => changeSelected(row)}*/}
                                {/*        color="primary"*/}
                                {/*        checked={selectedUsers.some(p => p.Id === row.Id)}*/}
                                {/*    />*/}
                                {/*</TableCell>*/}
                                <TableCell sx={{justifyItems: "center"}}><Avatar src={row?.User?.Avatar?.Url}
                                                                                 sx={{width: 25, height: 25}}/></TableCell>
                                <TableCell>{row?.User?.FullName || " - "}</TableCell>
                                <TableCell>{toPriceWithComma(row?.TotalCredit)}</TableCell>
                                <TableCell>{row?.CreditList?.length || 0}</TableCell>
                                <TableCell>{getNearestExpirationDate(row?.CreditList)}</TableCell>
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
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </CardActions>
            </Card>
            {/*{renderModalAddCreditToSelectedUsers()}*/}
        </>
    );
};

export default _UserList;
