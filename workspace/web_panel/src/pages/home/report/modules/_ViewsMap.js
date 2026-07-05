import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
import {ErrorContext} from "../../../../components/GympinPagesProvider";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import {service_getUserMapViews} from "../../../../network/api/service.api";
import {Form} from "react-bootstrap";
import "./map.css"

const _ViewsMap = () => {
    const error = useContext(ErrorContext);
    const [leaflet, setLeaflet] = useState(null);
    const [markerLayer, setMarkerLayer] = useState(null);

    useEffect(() => {
        if (leaflet) return;
        const map = L.map("kt_leaflet_map", {center: [35.7019, 51.4047], zoom: 12,});
        prepareMap(map);
    }, []);

    useEffect(() => {
        markerLayer?.clearLayers()
        service_getUserMapViews().then(result => {
            console.log(result.data.Data);
            addMarkers(result.data.Data)
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }, [markerLayer]);

    function addMarkers(views) {
        views.forEach(view => {
            if (view.Latitude != null && view.Longitude != null) {
                addMarker(view);
            }
        });
    }

    const prepareMap = (map) => {
        map.panTo(map.getCenter());
        // set leaflet tile layer
        L.tileLayer("https://map.ir/shiveh/xyz/1.0.0/Shiveh:Shiveh@EPSG:3857@png/{z}/{x}/{y}.png?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2YWYwMWE4NzU2MTFiOWQyNGRhOTk2YzU2ZDU0MTE3MDUxMzA5Y2U4ZTJkNTJhYmFkZDJiMTA5MDRmOGQ5OTlmZTZkNTA2OWE5OWVjMjFmIn0.eyJhdWQiOiIzOTA1MSIsImp0aSI6ImI2YWYwMWE4NzU2MTFiOWQyNGRhOTk2YzU2ZDU0MTE3MDUxMzA5Y2U4ZTJkNTJhYmFkZDJiMTA5MDRmOGQ5OTlmZTZkNTA2OWE5OWVjMjFmIiwiaWF0IjoxNzc2NTAwMjQ5LCJuYmYiOjE3NzY1MDAyNDksImV4cCI6MTc3OTA5MjI0OSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.CeXLZ1EdUvf0WdbzV7oXL7xnLtr72_OBKR8e6vftiFOqmJP_gOizLEhQkLfvSFDlZZGf9IrsiXmLwjor7pTgD3_8vVuBqMA7jA-udIobGPcJm_Vu3dI6gf8wpjLfY2JQVd4IJ3lDS15aGuB0fELhGmcAS7mE2yaFti4OI05oq9xb53Q-Yc95rujqTQBAyfJkTXPYa9DCXPqAmIsefNTxHC-K1AJmXrNB1_43Y1IhuKiWwn7BO1OsA3E38YYuXbpkruyDP06nzaliigp1ozk2btiz3CQmDTJu1jIHvyn7E23JQrIgzoHFkloVu-GqziHd2HgMS-Uh8RSgQytBoiCbkQ", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        setLeaflet(map);
        var markerLaye = L.layerGroup().addTo(map)
        setMarkerLayer(markerLaye);
    };

    function addMarker(view) {
        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [0, 35],
            popupAnchor: [-19, -35],
            className: "leaflet-marker",
        });

        // markerl.clearLayers();
        let marker = L.marker([view.Latitude, view.Longitude], {icon: leafletIcon, title: view.Name});
        if (markerLayer)
            marker.addTo(markerLayer);

        function getIconHtml() {
            return ` <span class="svg-icon svg-icon-danger svg-icon-3x">
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="url(#gradient-fill)"/>
<defs>
<radialGradient id="gradient-fill" x1="0" y1="0" x2="200" y2="0" radientUnits="userSpaceOnUse">
<stop offset="0" stop-color="#d7000070" />
<stop offset="0.2" stop-color="#d7000033" />
<stop offset="0.5" stop-color="#d7000022" />
<stop offset="0.8" stop-color="#d7000011" />
<stop offset="1" stop-color="#d7000000" />
</radialGradient>
</defs>
</svg>
                    </span>`;
        }
    }


    return (
        <>

            <Portlet>
                <PortletHeader
                    title="مشاهده کاربران روی نقشه"
                />

                <PortletBody>

                    <Form.Group controlId="MyMap">
                        <div id="kt_leaflet_map" className={"map"}/>
                    </Form.Group>
                </PortletBody>
            </Portlet>


        </>
    );
};

export default _ViewsMap;
