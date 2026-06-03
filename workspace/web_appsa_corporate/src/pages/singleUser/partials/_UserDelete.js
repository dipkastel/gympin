import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import {corporatePersonnel_delete} from "../../../network/api/corporatePersonnel.api";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {useSelector} from "react-redux";

const _UserDelete = ({corporatePersonnel}) => {

    const navigate = useNavigate();
    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [openModalDeleteUser, setOpenModalDeleteUser] = useState(false);


    function renderModalDeleteUser() {
        if (!corporatePersonnel.User) return;

        function deleteUser(e) {
            e.preventDefault()

            if (corporate.Status=="DEMO"||corporate.Status=="SECURE_DEMO"){
                error.showError({message: "حذف کاربر برای Demo فعال نیست",});
                return;
            }
            setOpenModalDeleteUser(false);
            corporatePersonnel_delete({Id: corporatePersonnel.Id})
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
                                {"آیا از حذف " + (corporatePersonnel?.User?.FullName ? corporatePersonnel?.User?.FullName : corporatePersonnel?.User?.PhoneNumber) + " اطمینان دارید؟"}
                            </Typography>
                            <Typography variant={"caption"}>
                                توجه داشته باشید اعتباری که تاکنون برای این کاربر منظور شده برای او باقی می ماند و کاربر
                                حق استفاده از این اعتبار را خواهد داشت .
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
            {corporatePersonnel.Role != "ADMIN" &&
            <Card elevation={3} sx={{p: 1,m:1}}>
                <CardContent>
                    <Button variant={"contained"} onClick={() => setOpenModalDeleteUser(true)}
                            fullWidth>حذف کاربر از مجموعه</Button>
                </CardContent>
            </Card>}
            {renderModalDeleteUser()}
        </>
    );
};

export default _UserDelete;
