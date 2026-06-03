import React from 'react';
import {Box, Card} from "@mui/material";
import {SvgColor} from "./SvgColor";

const DetailsSimpleData = ({
                               title,
                               total,
                               color = 'primary',
                               onClick
                           }) => {


    return (
        <>
            <Card sx={{m: 2, p: 3, bgcolor: `${color}.boxBg`, borderRadius: 4, position: "relative"}} onClick={onClick}>
                <SvgColor
                    src="/assets/images/bg/shape-square.svg"
                    sx={{
                        top: 0,
                        left: -20,
                        width: 240,
                        zIndex: 0,
                        height: 240,
                        opacity: 0.24,
                        position: 'absolute',
                        color: `${color}.main`,
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Box sx={{flexGrow: 1, minWidth: 112}}>
                        <Box sx={{my: 1, typography: 'subtitle2'}}>{title}</Box>
                        <Box sx={{typography: 'h4'}}>{total}</Box>
                    </Box>
                </Box>
            </Card>
        </>
    );
};

export default DetailsSimpleData;
