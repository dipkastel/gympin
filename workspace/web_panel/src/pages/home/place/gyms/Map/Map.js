import React, {useContext, useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletFooter, PortletHeader, PortletHeaderToolbar} from "../../../../partials/content/Portlet";
import Notice from "../../../../partials/content/Notice";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import {Form} from "react-bootstrap";
import "./map.css"
import {PlaceGym_query} from "../../../../../network/api/gym.api";
import {ErrorContext} from "../../../../../components/GympinPagesProvider";
import {useHistory} from "react-router-dom";
import Select from "react-select";

const Map = () => {
    const error = useContext(ErrorContext);
    const history = useHistory();
    const [leaflet, setLeaflet] = useState(null);
    const [markerLayer, setMarkerLayer] = useState(null);
    const [placeStatus, setPlaceStatus] = useState(null);

    useEffect(() => {
        if (leaflet) return;
        const map = L.map("kt_leaflet_map", {center: [35.7019, 51.4047], zoom: 12,});
        prepareMap(map);
    }, []);

    useEffect(() => {
        markerLayer?.clearLayers()
        getPlaces(0);
    }, [markerLayer,placeStatus]);

    const getPlaces = (page) => {
        PlaceGym_query({
            queryType: "FILTER",
            Status:placeStatus,
            paging: {Page: page, Size: 300, Desc: true}
        }).then((data) => {
            addMarkers(data.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message,});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    function addMarkers(places) {
        places.forEach(place => {
            if (place.Latitude != null && place.Longitude != null){
                addMarker(place);
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

    function getStatusOptions() {
        return [
            {value: null, label: "همه"},
            {value: "ACTIVE", label: "فعال"},
            {value: "INACTIVE", label: "غیر فعال"},
            {value: "PREREGISTER", label: "پیش ثبت نام"}
        ]
    }

    function addMarker(place) {
        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [0, 35],
            popupAnchor: [-19, -35],
            className: "leaflet-marker",
        });

        // markerl.clearLayers();
        let marker = L.marker([place.Latitude, place.Longitude], {icon: leafletIcon, title: place.Name});
        marker.on('click', function (e) {
            history.push({pathname: "/gyms/data/" + place.Id});
        });
        if(markerLayer)
        marker.addTo(markerLayer);

        function getIconHtml() {
            return ` <span class="svg-icon svg-icon-danger svg-icon-3x">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 21 21" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="25" height="25"/>
                    <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                    </svg>
                    </span>`;
        }
    }

    return (
        <>

            <Notice icon="flaticon-warning kt-font-primary">
                <p>موجودیت مرکز ورزشی به معنای محلی است که در آن ورزش انجام میشود</p>
                <p>
                    این مراکز میتواند سر پوشیده یا باز باشد و نوع فعالیت های آنها در
                    قسمت ورزش ها تایین میشود
                </p>
            </Notice>

            <Portlet>
                <PortletHeader
                    title="مراکز"
                    toolbar={
                        <PortletHeaderToolbar>
                            <Select
                                    className={"dropdown w-100"}
                                    menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    value={
                                        getStatusOptions().filter(option =>
                                            option.value === placeStatus)
                                    }
                                    options={getStatusOptions()}
                                    onChange={(e) => setPlaceStatus( e.value)}
                                />
                        </PortletHeaderToolbar>
                        }

                />

                <PortletBody>

                    <Form.Group controlId="MyMap">
                        <div id="kt_leaflet_map" className={"map"}/>
                    </Form.Group>
                </PortletBody>
                <PortletFooter>
                </PortletFooter>
            </Portlet>
        </>
    );
};

export default Map;
