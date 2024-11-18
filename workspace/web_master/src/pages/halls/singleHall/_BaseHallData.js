import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardContent, CardHeader, FormControl, Switch, TextField, Typography} from "@mui/material";
import {Form} from "react-bootstrap";
import {Halls_update} from "../../../network/api/halls.api";
import DeleteIcon from "@mui/icons-material/Delete";
import {ErrorContext} from "../../../components/GympinPagesProvider";

const _BaseHallData = ({hall, getHall}) => {
    const error = useContext(ErrorContext);
    const [inHall, setInHall] = useState({})

    useEffect(() => {
        setInHall(hall);
    }, [hall]);

    function updateHall(e) {
        e.preventDefault()
        Halls_update(inHall).then(result => {
            getHall();
            error.showError({message: "ثبت شد",});
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
            <Form onSubmit={(e) => updateHall(e)}>
                <Card elevation={3} sx={{borderRadius: 3,margin: 1}}>
                    <CardHeader
                        sx={{paddingBottom: 0}}
                        title={"ویرایش"}
                        action={(
                            <>
                                {inHall.Enable ?
                                    <Typography variant={"caption"}>فعال</Typography>
                                    :
                                    <Typography variant={"caption"}>غیر فعال</Typography>}
                                <Switch
                                    checked={!!inHall.Enable}
                                    onChange={(e) => setInHall({...inHall, Enable: e.target.checked})}
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
                            value={inHall.Name || ""}
                            onChange={(e) => setInHall({...inHall, Name: e.target.value})}
                            margin="dense"
                            label="نام سالن"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <Switch
                            checked={!!inHall.TrafficManagement}
                            onChange={(e) => setInHall({...inHall, TrafficManagement: e.target.checked})}
                        />
                        {inHall.TrafficManagement ?
                            <Typography variant={"caption"}>تراکم جمعیت در این سالن به کاربر نمایش داده
                                بشود</Typography>
                            :
                            <Typography variant={"caption"}>تراکم جمعیت در این سالن به کاربر نمایش داده
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

export default _BaseHallData;
