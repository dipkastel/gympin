import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";
import {useSelector} from "react-redux";
import {PlacesQr_add, PlacesQr_delete, PlacesQr_getByPlace} from "../../network/api/placeQr.api";
import {Form} from "react-bootstrap";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {useNavigate} from "react-router-dom";

const _SettingsCodeForQr = () => {
    const error = useContext(ErrorContext);
    const navigate = useNavigate();
    const [qrList, SetQrLists] = useState([]);
    const [itemForGetList, setItemForGetList] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)
    const place = useSelector(({place}) => place.place)
    useEffect(() => {
        getAllQrMessages();
    }, []);
    function getAllQrMessages(){
        PlacesQr_getByPlace({Id: place.Id}).then(result => {
            console.log(result.data.Data)
            SetQrLists(result.data.Data)
        }).catch(e => console.log(e))
    }

    function addQrMessage(e) {
        e.preventDefault()
        PlacesQr_add({
            Place:place,
            Text:e.target.Text.value,
            ReplaceText:e.target.ReplaceText.value
        }).then(result=>{
            e.target.Text.value = "";
            e.target.ReplaceText.value = "";
            getAllQrMessages();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
                console.log(e)
            }
        })
    }
    function renderModalDelete() {
        const deleteItem = (e)=>{
            e.preventDefault()
            PlacesQr_delete({Id:itemToDelete.Id}).then(result=>{
                getAllQrMessages()
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                    console.log(e)
                }
            })
        }
        return (
            <div>
                {itemToDelete&&<Dialog open={!(!itemToDelete)} onClose={()=>setItemToDelete(null)}>
                    <Form onSubmit={(e)=>deleteItem(e)}>
                        <DialogTitle>{"حذف "+itemToDelete.Text+"("+itemToDelete.ReplaceText+")"}</DialogTitle>
                        <DialogContent>
                            {"آیا از حذف "+itemToDelete.Text+"("+itemToDelete.ReplaceText+") اطمینان دارید؟"}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setItemToDelete(null)}>لغو</Button>
                            <Button type={"submit"}>ثبت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>}
            </div>
        );

    };

    function renderModalGetList() {

        const goToListPage = (e)=>{
            e.preventDefault()

            navigate("/management/qrList", {state:{size:e.target.count.value,item:itemForGetList}});
        }
        return (
            <div>
                {itemForGetList&&<Dialog open={!(!itemForGetList)} onClose={()=>setItemForGetList(null)}>
                    <Form onSubmit={(e)=>goToListPage(e)}>
                        <DialogTitle>ایجاد کد برای چاپ</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                label="تعداد آیتم مورد نیاز"
                                type="number"
                                name={"count"}
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setItemForGetList(null)}>لغو</Button>
                            <Button type={"submit"}>دریافت</Button>
                        </DialogActions>
                    </Form>
                </Dialog>}
            </div>
        );

    };

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"آیتم با qr"}
                />
                <CardContent>
                    <Form onSubmit={e => addQrMessage(e)}>
                        <TextField
                            className="w-100"
                            aria-multiline
                            variant="outlined"
                            margin="normal"
                            name="Text"
                            type="text"
                            label={"پیشوند"}
                            multiline
                        />
                        <TextField
                            className="w-100"
                            aria-multiline
                            variant="outlined"
                            margin="normal"
                            name="ReplaceText"
                            type="text"
                            label={"نام آیتم یا پیشوند"}
                            multiline
                        />

                        <Button type={"submit"} variant={"contained"} fullWidth>افزودن</Button>
                    </Form>
                </CardContent>
            </Card>
            <Card elevation={3} sx={{margin: 1}}>
                <CardHeader
                    title={"یادداشت ها"}
                />
                <CardContent>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {qrList.map((item, number) => (
                            <div key={number}>
                                <ListItem alignItems="flex-start">
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <ListItemText
                                            className="text-start"
                                            primary={item.Text}
                                            secondary={item.ReplaceText}/>
                                        <Grid>
                                            <Button variant={"contained"} color={"info"} onClick={(e)=>setItemForGetList(item)}>دریافت لیست</Button>
                                            <Button variant={"contained"} onClick={(e)=>setItemToDelete(item)}>حذف</Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider variant="inset" sx={{marginLeft: 0, marginRight: 0}} component="li"/>
                            </div>
                        ))}

                    </List>
                </CardContent>
            </Card>
            {renderModalDelete()}
            {renderModalGetList()}
        </>

    );
};
export default _SettingsCodeForQr;
