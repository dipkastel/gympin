import React, {useRef} from "react";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {toAbsoluteUrl} from "../../helper";

function QuickStatsIcon({title, text, icon,onClick}) {
    return (
        <>
            <Card onClick={onClick}>

                <CardContent sx={{
                    backgroundImage: `url(${toAbsoluteUrl("/media/bg/quickCardBg.png")})`,
                    backgroundSize: "cover"
                }}>
                    {icon}
                    <Typography sx={{pt:1}} variant={"h5"}>{title}</Typography>
                    <div className="kt-widget26__content">
                        <span className="kt-widget26__number"></span>
                        <span className="kt-widget26__desc">{text}</span>
                    </div>
                </CardContent>
            </Card>
        </>

    );
}


export default QuickStatsIcon;
