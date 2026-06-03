import React from 'react';
import {Card, CardActionArea} from "@mui/material";
import {useNavigate} from "react-router";

const _UserAddGroupCredit = () => {

    const navigate = useNavigate();

    return (
        <>
            <Card sx={{m: 2}}>
                <CardActionArea sx={{p: 2, textAlign: "center"}}  onClick={() => navigate("/sport/gympin/increaseGroups")}>
                    افزایش اعتبار گروهی
                </CardActionArea>
            </Card>
        </>
    );
};

export default _UserAddGroupCredit;
