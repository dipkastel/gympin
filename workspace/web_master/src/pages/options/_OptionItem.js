import React, {useContext} from 'react';
import {
    Button, Card,
    CardContent,
    CardHeader,
    FormControl,
    FormGroup,
    FormHelperText,
    Input,
    InputLabel
} from "@mui/material";
import {optionOfPlace_delete} from "../../network/api/optionOfPlace.api";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _OptionItem = ({optionOfPlace,onDelete}) => {
    const error = useContext(ErrorContext);
    console.log(optionOfPlace)

    function deleteItem(){
        optionOfPlace_delete({Id:optionOfPlace.Id}).then(result=>{
            onDelete()
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
        <Card elevation={3} sx={{margin: 1}}>

            <CardHeader
                title={optionOfPlace.PlaceOption.Name}
                action={
                    <Button variant={"contained"} title={"btn_add"} onClick={(e)=>deleteItem(e)}>حذف</Button>}
            />
        </Card>
    );
};

export default _OptionItem;
