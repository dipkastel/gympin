import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader, CircularProgress, Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid2 as Grid, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel,
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
            if(e.target.Name.value.length<1){
                error.showError({message: "نام گروه وارد نشده",});
                return;
            }
            if((corporate?.Status=="DEMO"||corporate.Status=="SECURE_DEMO")&&groups.length>1){
                error.showError({message: "بیش از 2 گروه برای DEMO امکان‌پذیر نیست",});
                return;
            }

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
        <Container maxWidth>


            <title>گروه های پرسنل</title>

            <Grid container columns={9} alignItems={"center"}>
                <Grid size={{md: 6, lg: 6, xl: 6}}><Typography sx={{m: 4}} variant={"h4"}>گروه های پرسنل</Typography></Grid>
                <Grid textAlign={"end"} size={{md: 3, lg: 3, xl: 3}}><Button onClick={() => setOpenModalAdd(true)} variant={"contained"}>افزودن
                    گروه</Button> </Grid>
            </Grid>


            <Card  elevation={3} sx={{margin: 1,borderRadius:3}}>

                <Table aria-label="userLists">
                    <TableHead sx={{bgcolor: 'primary.boxBg'}}>
                        <TableRow>
                            <TableCell>نام گروه</TableCell>
                            <TableCell>تعداد اعضا</TableCell>
                            <TableCell align={"right"}>عملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    {!groups && <Grid container fullwidth width={"100%"} direction={"row"}><CircularProgress/></Grid>}
                    <TableBody>
                        {groups?.map(row => (
                            <TableRow
                                key={row.Id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{row?.Name || "ثبت نشده"}</TableCell>
                                <TableCell>{row?.UserCount || "ثبت نشده"}</TableCell>
                                <TableCell align={"right"}><Button disabled={row?.UserCount>0} variant={"outlined"} color={"error"}
                                                                  onClick={() => setItemToDelete(row)}>حذف</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>



            </Card>
            {renderModalAdd()}
            {itemToDelete && renderModalDelete()}
        </Container>
    );
};

export default Groups;
