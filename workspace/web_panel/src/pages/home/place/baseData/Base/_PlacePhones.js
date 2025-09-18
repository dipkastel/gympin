import React, {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Add, Delete, Visibility, VisibilityOff} from "@mui/icons-material";
import Box from "@mui/material/Box";

const _PlacePhones = ({initialValue,onChange}) => {

    const [phones, setPhones] = useState(initialValue?.split(","));
    const [finalString, setFinalString] = useState(initialValue);

    const handleChange = (index, value) => {
        const updatedPhones = [...phones];
        updatedPhones[index] = value;
        setPhones(updatedPhones);
        setFinalString(updatedPhones.join(","));
        onChange(updatedPhones.join(","));
    };

    const addPhone = () => {
        const updatedPhones = [...phones, ""];
        setPhones(updatedPhones);
        setFinalString(updatedPhones.join(","));
    };

    const removePhone = (index) => {
        const updatedPhones = phones.filter((_, i) => i !== index);
        setPhones(updatedPhones);
        setFinalString(updatedPhones.join(","));
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {phones.map((phone, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1 }}>
                    <TextField
                        label={`شماره ${index + 1}`}
                        value={phone}
                        onChange={(e) => handleChange(index, e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removePhone(index)}
                    >
                        <Delete />
                    </Button>
                    <Button variant="outlined" color="primary" onClick={addPhone}>
                        <Add />
                    </Button>

                </Box>
            ))}
        </Box>
    );
};

export default _PlacePhones;
