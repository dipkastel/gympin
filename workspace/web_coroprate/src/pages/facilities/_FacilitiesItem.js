import React from 'react';
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

const _AboutItem = (props) => {

    function renderRemoveButton() {
        return (
            <Button variant={"contained"} title={"btn_add"}>حذف</Button>
        )
    }
    return (
        <Card elevation={3} sx={{margin: 1}}>

            <CardHeader
                title={props.name}
                action={renderRemoveButton()}
            />
        </Card>
    );
};

export default _AboutItem;
