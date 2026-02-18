import React, {useEffect, useState} from 'react';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField, Typography} from "@mui/material";
import {CheckCircle, Edit} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

const _ContractInput = ({required,faName,Name,width, value,setContractValue}) => {

    const [editMode, setEditMode] = useState(false);
    const [inValue, setInValue] = useState(value);
    useEffect(() => {
        setInValue(value)
    }, [value]);

    function setContValue(){
        setContractValue(Name,inValue);
        setEditMode(false);
    }

    return (<>
        {editMode?<>

            <FormControl sx={{ mb: 1,mx: 1, width: width }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">{faName}</InputLabel>
                <Input
                    type={'text'}
                    value={inValue}
                    autoFocus
                    onChange={(e)=>setInValue(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <Button
                                size={"small"}
                                color={"success"}
                                variant={"contained"}
                                onClick={(e)=>setContValue()}
                            >
                                ثبت
                            </Button>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>:<>
            {value ? <Grid sx={{mx: 1,display:"inline"}} onClick={(e) => setEditMode("true")}>
                    <Edit/>
                    <Typography sx={{fontWeight: 500}} component={"b"} variant={"subtitle1"} textAlign={"center"}>{inValue}</Typography>
                </Grid> :
                <Grid sx={{mx: 3,display:"inline"}} onClick={(e) => setEditMode("true")}>
                    <Edit color={required?"error":"inherit"}/>
                    <Typography sx={{fontWeight: 900}} component={"b"} variant={"h6"} color={required?"error":"inherit"} textAlign={"center"}>ثبت نشده</Typography>
                </Grid>}
        </>}
    </>);
};

export default _ContractInput;
