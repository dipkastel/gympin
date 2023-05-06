import React, {useEffect, useState} from 'react';
import {Card, Grid, Typography} from "@mui/material";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import {Form} from "react-bootstrap";

const _PlaceMap = ({place}) => {
    const [leaflet, setLeaflet] = useState(null);
    const [markerLayer, setMarkerLayer] = useState(null);
    var map = null

    useEffect(() => {
        if(!place.Latitude||!place.Longitude) return;
        prepareMap();
    }, []);

    useEffect(() => {
        if(!place.Latitude||!place.Longitude) return;
            try{
                if(leaflet)
                addMarker(place);
            }catch (e) {}
    }, [leaflet]);


    const prepareMap = () => {
        if (L.DomUtil.get("kt_leaflet_map") != null) {
            L.DomUtil.get("kt_leaflet_map")._leaflet_id = null;
            try{
                map.remove();
            }catch (e) {}
        }
        console.log([place.Latitude,place.Longitude],place)
        map = L.map("kt_leaflet_map", {center: [place.Latitude,place.Longitude],zoom:15,});
        // set leaflet tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
        setLeaflet(map);
        map.panTo(map.getCenter());

        var markerLaye = L.layerGroup().addTo(map)
        setMarkerLayer(markerLaye);
    };

    function addMarker(place){
        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [0, 35],
            popupAnchor: [-19, -35],
            className: "leaflet-marker",
        });

        // markerl.clearLayers();
        let marker = L.marker([place.Latitude,place.Longitude], { icon: leafletIcon,title:place.Name });
        console.log(marker)
        marker.on('click', function(e) {
            // history.push({pathname: "/place/data/" + place.Id});
        });
        marker.addTo(markerLayer);

        map.panTo(marker.getLatLng());
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
        <div>
            <Card elevation={3} sx={{margin: 1, padding: 1}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid>
                        <Form.Group controlId="MyMap">
                            <div id="kt_leaflet_map" className={"map"} />
                        </Form.Group>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default _PlaceMap;
