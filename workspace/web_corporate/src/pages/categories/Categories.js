import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar, Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider,
    FormControl,
    Grid,
    Input,
    TextField, Typography
} from "@mui/material";
import {Form, Image} from "react-bootstrap";
import {useSelector} from "react-redux";
import {toPriceWithComma, toPriceWithoutComma} from "../../helper/utils";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import AdapterJalali from "@date-io/date-fns-jalali";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {corporatePersonnel_addCreditToAll} from "../../network/api/corporatePersonnel.api";
import {
    corporate_addCorporateCategory, corporate_deleteCorporateCategory,
    corporate_getCorporateCategories,
    corporate_Update
} from "../../network/api/corporate.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const Categories = () => {

    const error = useContext(ErrorContext);
    const corporate = useSelector(({corporate}) => corporate.corporate)
    const [category,setCategory] = useState([])
    const [openModalAdd,setOpenModalAdd] = useState(false)
    const [itemToDelete,setItemToDelete] = useState(null)

    useEffect(() => {
        getCorporateCategories();
    }, []);
    function getCorporateCategories(){
        corporate_getCorporateCategories({Id: corporate.Id}).then(result => {
            setCategory(result.data.Data);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    function renderModalAdd(){
        function addCategory(e) {
            e.preventDefault()
            console.log({Name: e.target.Name.value, CorporateId: corporate.Id})
            corporate_addCorporateCategory({Name: e.target.Name.value, CorporateId: corporate.Id}).then(result => {
                getCorporateCategories();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
            setOpenModalAdd(false)
            setCategory([]);
        }

        return (
            <Dialog open={openModalAdd} onClose={() => setOpenModalAdd(false)}>
                <Form onSubmit={(e) => addCategory(e)}>
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
                        <Button variant={"contained"} color={"error"} onClick={() => setOpenModalAdd(false)}>لغو</Button>
                        <Button type={"submit"} variant={"contained"} color={"success"}>افزودن</Button>

                    </DialogActions>
                </Form>
            </Dialog>)
    }
    function renderModalDelete(){
        function DeleteCategory(e) {
            e.preventDefault()
            corporate_deleteCorporateCategory({ Id: itemToDelete.Id}).then(result => {
                getCorporateCategories();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
            setItemToDelete(null)
            setCategory([]);
        }

        return (
            <Dialog open={!!itemToDelete} onClose={() => setItemToDelete(null)}>
                <Form onSubmit={(e) => DeleteCategory(e)}>
                    <DialogTitle>حذف گروه</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant={"body2"}>
                                {"آیا از حذف "+itemToDelete.CategoryName+" اطمینان دارید؟"}
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
                    action={(<><Button variant={"contained"} onClick={()=>setOpenModalAdd(true)}  sx={{margin: 1}}>افزودن</Button></>)}/>
                <CardContent>
                    {category.map(c=>(
                        <Grid sx={{m:1}} container direction={"row"} textAlign={"center"} justifyContent={"space-between"}>

                            <Typography key={c.Id} variant={"body2"}>
                                {c.CategoryName}
                            </Typography>
                            <Button variant={"contained"} color={"error"} onClick={() => setItemToDelete(c)}>حذف</Button>


                        </Grid>

                    ))}
                </CardContent>

            </Card>
            {renderModalAdd()}
            {itemToDelete&&renderModalDelete()}
        </div>
    );
};

export default Categories;
