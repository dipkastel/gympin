import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Notice from "../../partials/content/Notice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import "leaflet/dist/leaflet.css";
import {user_query} from "../../../network/api/user.api";
import {Form, Modal} from "react-bootstrap";
import {Avatar, Button, Chip, TextField} from "@mui/material";
import {account_registerByInviteCode} from "../../../network/api/auth.api";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";
import {getUserFixedName} from "../../../helper";
import {genders} from "../../../helper/enums/genders";
import {getRppUserManagement, SetRppUserManagement} from "../../../helper/pocket/pocket";

const UserManagement = () => {
    const error = useContext(ErrorContext);
    const user = useSelector(state => state.auth.user);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(getRppUserManagement());
    const [userList, setUserList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [openModalAdd, SetOpenModalAdd] = useState(false);
    const history = useHistory();

    useEffect(() => {
        user_query({
            queryType: "SEARCH",
            Username: searchString,
            FullName: searchString,
            PhoneNumber: searchString,
            Email: searchString,
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

    function RenderModalAdd() {
        function addUser(e) {
            e.preventDefault()
            account_registerByInviteCode({
                PhoneNumber: e.target.formPhoneNumber.value,
                invitedBy: "GLL1" + user.Id + "LL"
            })
                .then((data) => {
                    error.showError({message: "عملیات موفق",});
                    history.push({
                        pathname: "/users/details/" + data.data.Data.Id
                    });
                })
                .catch(e => {
                    try {
                        error.showError({message: e.response.data.Message,});
                    } catch (f) {
                        error.showError({message: "خطا نا مشخص",});
                    }
                });
        }

        return (
            <>
                <Modal show={openModalAdd} onHide={() => SetOpenModalAdd(false)}>
                    <Form noValidate autoComplete="off" onSubmit={(e) => addUser(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"افزودن کاربر "}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group controlId="PhoneNumber">
                                <Form.Control
                                    name="formPhoneNumber"
                                    type="PhoneNumber"
                                    placeholder="09123456789"

                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className={"button_edit"}
                                onClick={() => SetOpenModalAdd(false)}
                            >
                                خیر
                            </Button>
                            <Button
                                className={"button_danger"}
                                type={"submit"}
                            >
                                اضافه
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

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
                            <button
                                type="button"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
                                onClick={(e) => SetOpenModalAdd(true)}
                            >
                                <AddIcon/>
                            </button>
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
                                    <TableCell align="right" padding="normal" sortDirection={false}>جنسیت</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تلفن</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>تاریخ تولد</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>دسترسی</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>کد ملی</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>گروه</TableCell>
                                    <TableCell align="right" padding="normal" sortDirection={false}>وضعیت</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.content && userList.content.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow hover onClick={(event) => {
                                            history.push({pathname: "/users/details/" + row.Id});
                                        }} role="checkbox" tabIndex={-1} key={row.Id.toString()}>
                                            <TableCell component="th" id={labelId} scope="row" padding="normal"
                                                       align="right">{row.Id}</TableCell>
                                            <TableCell align="right">
                                                <Avatar alt="userImage" src={(row.Avatar) ? (row.Avatar.Url || "") : ""}
                                                        sx={{width: 40, height: 40}}/></TableCell>
                                            <TableCell align="right">{row.FullName?getUserFixedName(row):<Chip label={row.Username} color={"error"}/>}</TableCell>
                                            <TableCell align="right">{row.Gender?genders[row.Gender]:<Chip label={"ثبت نشده"} color={"error"}/>}</TableCell>
                                            <TableCell align="right">{row.PhoneNumber}</TableCell>
                                            <TableCell align="right">{row.Birthday?new Date(row.Birthday).toLocaleDateString('fa-IR', {month: 'long', day: 'numeric'}):<Chip label={"ثبت نشده"} color={"error"}/>}</TableCell>
                                            <TableCell align="right">{row.UserRole.Role}</TableCell>
                                            <TableCell align="right">{row.NationalCode?row.NationalCode:<Chip label={"ثبت نشده"} color={"error"}/>}</TableCell>
                                            <TableCell align="right">{row.UserGroup}</TableCell>
                                            <TableCell align="right">

                                                <Chip label={row.UserStatus}
                                                      color={(row.UserStatus.startsWith("ENABLED")) ? "success" : "error"}/>
                                            </TableCell>
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
            {RenderModalAdd()}
        </>
    );
};

export default UserManagement;
