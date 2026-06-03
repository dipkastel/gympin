import React from 'react';
import {Card, CardActionArea} from "@mui/material";
import {useNavigate} from "react-router";

const _UserAddCredit = () => {

    const navigate = useNavigate();

    return (
        <>
            <Card sx={{m: 2}}>
                <CardActionArea sx={{p: 2, textAlign: "center"}} onClick={() => navigate("/sport/gympin/increaseSelect")}>
                    اعتبار دهی مناسبتی (انتخابی)
                </CardActionArea>
            </Card>
        </>
    );
}
export default _UserAddCredit;
