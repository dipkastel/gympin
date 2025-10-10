import React, {useContext, useEffect, useState} from 'react';
import _UserList from "./_UserList";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {corporatePersonnel_add, corporatePersonnel_query} from "../../network/api/corporatePersonnel.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import Grid from "@mui/material/Grid2";
import _UsersActions from "../../components/_UsersActions";
import {useNavigate} from "react-router-dom";
import {checkMobileValid, fixMobile} from "../../helper/utils";
import {Form} from "react-bootstrap";

const NewUserPage = () => {

    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const corporate = useSelector(({corporate}) => corporate.corporate);
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({});
    const [personnel, setPersonnel] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState(undefined);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [sortBy, setSortBy] = useState({Name: "Id", Desc: false});



    useEffect(() => {
        if (corporate?.ContractType == "PRO" || corporate?.ContractType == "NEO") {
            setFormData({...formData, ExpireDate: new Date().setDate(new Date().getDate() + corporate?.DefaultExpireDuration)})
        }
    }, [corporate]);

    useEffect(() => {
        getPersonnel();
    }, [selectedGroup, page, rowsPerPage, searchText, sortBy]);

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


    return (
        <>
            <title>لیست کارمندان</title>
            <Container maxWidth>

                <Grid container columns={9} alignItems={"center"}>
                    <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>کارمندان</Typography></Grid>
                </Grid>
                <Grid container columns={12} spacing={3} alignItems={"center"}>
                    <Grid size={{xs:12 , sm:6 , md: 6 , lg: 6 , xl: 6}}>
                        <_UsersActions
                            title={"افزودن کارمند"}
                            icon={<img width={64} alt="icon" src="/assets/images/icons/edit-icon-glassy-add.png" />}
                            onClick={() => setOpenModalAdd(true)}
                        />
                    </Grid>
                    <Grid size={{xs:12 , sm:6 , md: 6 , lg: 6 , xl: 6}}>
                        <_UsersActions
                            title={"ویرایش گروه‌ها"}
                            icon={<img width={64} alt="icon" src="/assets/images/icons/edit-icon-glassy1.png" />}
                            onClick={() => navigate("/personnel/groups")}
                        />
                    </Grid>
                </Grid>
                <_UserList
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    personnel={personnel}
                    corporate={corporate}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    page={page}
                    setPage={setPage}
                    setSearchText={setSearchText}
                />
            </Container>
            {renderModalAdd()}
        </>
    );
};

export default NewUserPage;
