import React, {useContext, useEffect, useState} from 'react';
import Notice from "../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Avatar, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getUserFixedName} from "../../../helper";
import TablePagination from "@mui/material/TablePagination";
import {getRppUserManagement, SetRppUserManagement} from "../../../helper/pocket/pocket";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {userRoles_query} from "../../../network/api/userRoles.api";

const CoachManagement = () => {
    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppUserManagement());
    const [userList, setUserList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const history = useHistory();

    useEffect(() => {
        userRoles_query({
            queryType: "SEARCH",
            Role: "COACH",
            paging: {
                Page: page,
                Size: rowsPerPage,
                Desc: true
            }
        }).then((data) => {
            setUserList(data.data.Data);
        })
            .catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    }, [page, rowsPerPage, searchString]);


    return (
        <>
            <Notice icon="flaticon-warning kt-font-primary">مدیریت کاربران</Notice>
            <Portlet>
                <PortletHeader
                    title="کاربران"
                    toolbar={
                        <PortletHeaderToolbar>
                            <TextField
                                fullWidth
                                id="outlined-adornment-password"
                                className="w-100"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={searchString}
                                onChange={(event) => {
                                    setSearchString(event.target.value);
                                    setPage(0);
                                }}
                                label={"جستجو"}
                            />
                        </PortletHeaderToolbar>
                    }

                />

                <PortletBody>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size="medium"
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" padding="normal" sortDirection={false}>Id</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}/>
                                    <TableCell align="right" padding="normal" sortDirection={false}>نام کاربری</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.content && userList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "/coach/details/" + row.User.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.User.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.User.Id}</TableCell>
                                            <TableCell align="right">
                                                <Avatar alt="userImage" src={(row.User.Avatar) ? (row.User.Avatar.Url || "") : ""}
                                                        sx={{width: 40, height: 40}}/></TableCell>
                                            <TableCell align="right">{getUserFixedName(row.User)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {userList.content && <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        component="div"
                        sx={{direction: "rtl"}}
                        count={userList.totalElements}
                        labelRowsPerPage={"تعداد نمایش"}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            SetRppUserManagement(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />}
                </PortletBody>
            </Portlet>
        </>
    );
};

export default CoachManagement;
