import React, {useEffect, useState} from 'react';
import "./map.css"
import * as L from "leaflet";
import {useHistory} from "react-router-dom";
import {Form} from "react-bootstrap";

const _LocationDetailMap = ({centerLat, centerLng, mapPolygon}) => {

    const history = useHistory();
    const [leaflet, setLeaflet] = useState(null);
    const [markerLayer, setMarkerLayer] = useState(null);
    const [polygon, setPolygon] = useState(null);



    useEffect(() => {
        if (leaflet) return;
        const map = L.map("kt_leaflet_map", {center: [35.7019, 51.4047], zoom: 12,});
        prepareMap(map);
    }, []);
    function onMapClick(event){
        alert(JSON.stringify(event));
    }
    const prepareMap = (map) => {
        map.panTo(map.getCenter());
        // set leaflet tile layer
        const mapOptions = {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            eventHandlers:e=>onMapClick(e)
        };
        L.tileLayer("https://map.ir/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2YWYwMWE4NzU2MTFiOWQyNGRhOTk2YzU2ZDU0MTE3MDUxMzA5Y2U4ZTJkNTJhYmFkZDJiMTA5MDRmOGQ5OTlmZTZkNTA2OWE5OWVjMjFmIn0.eyJhdWQiOiIzOTA1MSIsImp0aSI6ImI2YWYwMWE4NzU2MTFiOWQyNGRhOTk2YzU2ZDU0MTE3MDUxMzA5Y2U4ZTJkNTJhYmFkZDJiMTA5MDRmOGQ5OTlmZTZkNTA2OWE5OWVjMjFmIiwiaWF0IjoxNzc2NTAwMjQ5LCJuYmYiOjE3NzY1MDAyNDksImV4cCI6MTc3OTA5MjI0OSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.CeXLZ1EdUvf0WdbzV7oXL7xnLtr72_OBKR8e6vftiFOqmJP_gOizLEhQkLfvSFDlZZGf9IrsiXmLwjor7pTgD3_8vVuBqMA7jA-udIobGPcJm_Vu3dI6gf8wpjLfY2JQVd4IJ3lDS15aGuB0fELhGmcAS7mE2yaFti4OI05oq9xb53Q-Yc95rujqTQBAyfJkTXPYa9DCXPqAmIsefNTxHC-K1AJmXrNB1_43Y1IhuKiWwn7BO1OsA3E38YYuXbpkruyDP06nzaliigp1ozk2btiz3CQmDTJu1jIHvyn7E23JQrIgzoHFkloVu-GqziHd2HgMS-Uh8RSgQytBoiCbkQ", mapOptions).addTo(map);


        const polygon = [
            [35.70, 51.43],
            [35.74,  51.48],
            [35.73,  51.45],
            [35.65,  51.35],
        ]
        const blueOptions = { color: 'blue',draggable:true }
        polygon.map(point=>{
            L.marker(point,blueOptions).addTo(map);
        })
        addPolygon(polygon,map);
        setLeaflet(map);


    };

    function addPolygon(bounds,map){
        const purpleOptions = { color: 'purple' }
        L.polygon(bounds,purpleOptions).addTo(map);
    }

    return (
                    <Form.Group controlId="MyMap">
                        <div id="kt_leaflet_map" className={"map"}/>
                    </Form.Group>
    );
};

export default _LocationDetailMap;
