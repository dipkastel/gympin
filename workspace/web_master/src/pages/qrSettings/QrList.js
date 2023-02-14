import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {ErrorContext} from "../../components/GympinPagesProvider";
import QRCode from "react-qr-code";
import {Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@mui/material";
import {ShareRounded} from "@mui/icons-material";
import {Canvas} from "leaflet";
import {encryptId} from "../../helper/utils";

const QrList = () => {
    const location = useLocation();
    const error = useContext(ErrorContext);
    const [qrList, setQrList] = useState([])
    useEffect(() => {
        if (!location.state.size) {
            error.showError({message: "تعداد آیتم ها پیدا نشد",});
        }
        if (!location.state.item) {
            error.showError({message: "آیتم پیدا نشد",});
        }
        var qrListItems = [];
        for (let i = 1; i <= location.state.size; i++) {
            qrListItems.push({
                Name: location.state.item.ReplaceText,
                Value: encryptId("2" + location.state.item.Text + "-" + i,false),
                ItemNumber: i
            });
        }
        setQrList(qrListItems);
    }, [location]);

    function share(item) {
        var svg = document.getElementById(item.Value);
        var img = new Image();
        var canvas = document.createElement('canvas');



        var xml = new XMLSerializer().serializeToString(svg);
        var svg64 = btoa(xml);
        var b64Start = 'data:image/svg+xml;base64,';
        var image64 = b64Start + svg64;
        canvas.width = svg.width.baseVal.value;
        canvas.height = svg.height.baseVal.value;
        var ctx = canvas.getContext('2d');
        img.onload = function() {
            ctx.drawImage(img, 0, 0);

            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = item.Name+" "+item.ItemNumber+".png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            console.log(svg);
        };
        img.src = image64;

    }

    return (
        <div>
            {qrList.map((item, number) => (<div key={number}>

                <Card elevation={3} sx={{margin: 1}}>
                    <CardHeader
                        title={item.Name + " " + item.ItemNumber}
                        action={<IconButton onClick={e => share(item)}>
                            <ShareRounded/>
                        </IconButton>}
                    />
                    <CardContent>
                        <Grid
                            container
                            direction={"column"}
                            justifyContent="center"
                            alignItems="center">
                            <QRCode className={"qrCode"} id={item.Value} value={item.Value}/>
                            <Typography variant={"h6"} sx={{margin: 1}}>{item.Value}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </div>))}
        </div>
    );
};

export default QrList;
