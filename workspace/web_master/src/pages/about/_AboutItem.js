import React, {useContext, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormGroup,
    Input,
    InputLabel,
    Switch
} from "@mui/material";
import {PlaceAbout_delete, PlaceAbout_update} from "../../network/api/placeAbout.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _AboutItem = ({placeAbout, onChange}) => {
    const error = useContext(ErrorContext);
    const [aboutText,SetAboutText] = useState(placeAbout.Description)
    const [acceptable,SetAcceptable] = useState(placeAbout.Acceptable)
    function deleteAbout() {
        PlaceAbout_delete({id:placeAbout.Id}).then(result => {
            onChange();
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        })
    }

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
        <Card elevation={3} sx={{margin: 1}}>

            <CardHeader
                sx={{paddingBottom: 0}}
                title={placeAbout.Name}
                action={<Button variant={"outlined"} title={"btn_add"} onClick={() => deleteAbout()}>حذف</Button>}
            />
            <CardContent sx={{margin: 0}}>
                <FormGroup>
                    <FormControl sx={{margin: 1}}>
                        <InputLabel htmlFor="my-input">توضیح</InputLabel>
                        <Input
                            multiline={true}
                            aria-describedby="my-helper-text"
                            onChange={(e)=>SetAboutText(e.target.value)}
                            value={aboutText}/>
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
    );
};

export default _AboutItem;
