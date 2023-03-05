import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, FormControl, Switch, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {Gates_update} from "../../network/api/gates.api";
import DeleteIcon from "@mui/icons-material/Delete";
import {ErrorContext} from "../../components/GympinPagesProvider";

const _BaseGateData = ({gate, getGate}) => {
    const error = useContext(ErrorContext);
    const [inGate, setInGate] = useState({})

    useEffect(() => {
        setInGate(gate);
    }, [gate]);

    function updateGate(e) {
        e.preventDefault()
        Gates_update(inGate).then(result => {
            getGate();
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
            <Form onSubmit={(e) => updateGate(e)}>
                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        sx={{paddingBottom: 0}}
                        title={"ویرایش"}
                        action={(
                            <>
                                {inGate.Enable ?
                                    <Typography variant={"caption"}>فعال</Typography>
                                    :
                                    <Typography variant={"caption"}>غیر فعال</Typography>}
                                <Switch
                                    checked={!!inGate.Enable}
                                    onChange={(e) => setInGate({...inGate, Enable: e.target.checked})}
                                />
                                <Typography variant={"caption"}>حذف</Typography>
                                <DeleteIcon
                                    onClick={(e) => {
                                    }}
                                    color={"primary"}
                                />
                            </>
                        )}
                    />
                    <CardContent sx={{margin: 0}}>

                        <TextField
                            name={"Name"}
                            value={inGate.Name || ""}
                            onChange={(e) => setInGate({...inGate, Name: e.target.value})}
                            margin="dense"
                            label="نام درگاه"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <Switch
                            checked={!!inGate.TrafficManagement}
                            onChange={(e) => setInGate({...inGate, TrafficManagement: e.target.checked})}
                        />
                        {inGate.TrafficManagement ?
                            <Typography variant={"caption"}>تراکم جمعیت در این درگاه به کاربر نمایش داده
                                بشود</Typography>
                            :
                            <Typography variant={"caption"}>تراکم جمعیت در این درگاه به کاربر نمایش داده
                                نشود</Typography>}
                        <FormControl fullWidth>
                            <Button variant={"contained"} type={"submit"}>ثبت</Button>
                        </FormControl>


                    </CardContent>
                </Card>
            </Form>
        </>
    );
};

export default _BaseGateData;
