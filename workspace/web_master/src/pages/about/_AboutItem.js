import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    Input,
    InputLabel,
    Switch, TextField
} from "@mui/material";
import {PlaceAbout_delete, PlaceAbout_update} from "../../network/api/placeAbout.api";
import {ErrorContext} from "../../components/GympinPagesProvider";
import {PlacesQr_delete} from "../../network/api/placeQr.api";
import {Form} from "react-bootstrap";

const _AboutItem = ({placeAbout, onChange}) => {
    const error = useContext(ErrorContext);
    const [aboutText,SetAboutText] = useState(placeAbout.Description)
    const [acceptable,SetAcceptable] = useState(placeAbout.Acceptable)
    const [itemToDelete,setItemToDelete] = useState(null)
    function renderModalDelete() {
        const deleteItem = (e)=>{
            e.preventDefault()
            PlaceAbout_delete({id:itemToDelete.Id}).then(result => {
                onChange();
            }).catch(e => {
                try {
                    error.showError({message: e.response.data.Message,});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            })
        }
        return (
            <div>
                {itemToDelete&&<Dialog open={!(!itemToDelete)} onClose={()=>setItemToDelete(null)}>
                    <Form onSubmit={(e)=>deleteItem(e)}>
                        <DialogTitle>{"حذف "+itemToDelete.Name}</DialogTitle>
                        <DialogContent>
                            {"آیا از حذف "+itemToDelete.Name+"("+aboutText+") اطمینان دارید؟"}
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
    function updateAbout() {
        PlaceAbout_update({...placeAbout,Description:aboutText,Acceptable:acceptable}).then(result=>{
            onChange();
            error.showError({message: "با موفقیت ثبت شد.",});
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

    return (
        <>
            <Card elevation={3} sx={{margin: 1}}>

                <CardHeader
                    sx={{paddingBottom: 0}}
                    title={placeAbout.Name+(acceptable?" را خوانده و تایید میکنم.":"")}
                    action={<Button variant={"outlined"} title={"btn_add"} onClick={() => setItemToDelete(placeAbout)}>حذف</Button>}
                />
                <CardContent sx={{margin: 0}}>
                    <FormGroup>
                        <FormControl sx={{margin: 1}}>
                            <TextField
                                type="number"
                                margin="normal"
                                label={"توضیح"}
                                multiline
                                minRows={3}
                                className="kt-width-full"
                                onChange={(e)=>SetAboutText(e.target.value)}
                                value={aboutText}
                            />
                        </FormControl>
                        <FormControlLabel
                            checked={acceptable}
                            onChange={e=>SetAcceptable(e.target.checked)}
                            control={<Switch />}
                            label={acceptable?"کاربر برای استفاده از خدمات باید این متن را بپذیرد":"این متن صرفا جهت اطلاع کاربر است"}
                        />
                        <FormControl sx={{margin: 1}}>
                            <Button variant={"contained"} onClick={()=>updateAbout()}>ثبت</Button>
                        </FormControl>
                    </FormGroup>
                </CardContent>
            </Card>

            {renderModalDelete()}

        </>
    );
};

export default _AboutItem;
