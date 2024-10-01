import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import {
    corporate_addCorporateGroups,
    corporate_deleteCorporateGroup,
    corporate_getCorporateGroups
} from "../../network/api/corporate.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const Groups = () => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [groups, setGroups] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

    useEffect(() => {
        document.title = 'گروه ها';
        getCorporateGroups();
    }, []);

    function getCorporateGroups() {
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

    function renderModalAdd() {
        function addGroup(e) {
            e.preventDefault()

            corporate_addCorporateGroups({Name: e.target.Name.value, CorporateId: corporate.Id}).then(result => {
                getCorporateGroups();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
            setOpenModalAdd(false)
            setGroups([]);
        }

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => addGroup(e)}>
                    <DialogTitle>افزودن گروه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant={"body2"}>
                                برای اضافه کردن گروه ، نام گروه را وارد نمایید.
                            </Typography>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="Name"
                                label="نام گروه"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"}
                                onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>افزودن</Button>

                    </DialogActions>
                </Form>
            </Dialog>)
    }

    function renderModalDelete() {
        function DeleteGroups(e) {
            e.preventDefault()
            corporate_deleteCorporateGroup({Id: itemToDelete.Id}).then(result => {
                getCorporateGroups();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
            setItemToDelete(null)
            setGroups([]);
        }

        return (
            <Dialog open={!!itemToDelete} onClose={() => setItemToDelete(null)}>
                <Form onSubmit={(e) => DeleteGroups(e)}>
                    <DialogTitle>حذف گروه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant={"body2"}>
                                {"آیا از حذف " + itemToDelete.Name + " اطمینان دارید؟"}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"error"} onClick={() => setItemToDelete(null)}>لغو</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>حذف</Button>
                    </DialogActions>
                </Form>
            </Dialog>)
    }

    return (
        <div>

            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title="گروه های پرسنل"
                    action={(<><Button variant={"contained"} onClick={() => setOpenModalAdd(true)}
                                       sx={{margin: 1}}>افزودن</Button></>)}/>

            </Card>

            {groups.map(c => (
                <Card key={c.Id} elevation={3} sx={{margin: 1,borderRadius:3}}>
                    <CardContent sx={{p:"8px !important"}}>
                        <Grid container direction={"row"} textAlign={"center"} alignItems={"center"}
                              justifyContent={"space-between"}>

                            <h6 >
                                {c.Name}
                            </h6>
                            <Button variant={"outlined"} color={"error"}
                                    onClick={() => setItemToDelete(c)}>حذف</Button>


                        </Grid>
                    </CardContent>
                </Card>
            ))}
            {renderModalAdd()}
            {itemToDelete && renderModalDelete()}
        </div>
    );
};

export default Groups;
