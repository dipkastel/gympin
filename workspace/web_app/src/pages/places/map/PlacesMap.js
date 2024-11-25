import React, {useContext, useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import {Place_query} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {LinearProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {fixTextToSlug} from "../../../helper/utils";

const PlacesMap = () => {

    const error = useContext(ErrorContext);
    const tehranCenterLat = 35.7019;
    const tehranCenterLong = 51.4047;
    const navigate = useNavigate()
    const [leaflet, setLeaflet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    var markerLayer = null;
    var map = null;


    function getPlacesInrange() {

        setIsLoading(true);
        Place_query({
            queryType: "FILTER",
            Status: "Active",
            Option: null,
            MAXlatitude: map?.getBounds()?._northEast?.lat,
            MINlatitude: map?.getBounds()?._southWest?.lat,
            MAXlongitude: map?.getBounds()?._northEast?.lng,
            MINlongitude: map?.getBounds()?._southWest?.lng,
            paging: {Page: 0, Size: 60}
        }).then(result => {
            setIsLoading(false);
            addMarkers(result.data.Data.content);
        }).catch(e => {
            try {
                error.showError({message: e.response.data.Message});
            } catch (f) {
                error.showError({message: "خطا نا مشخص",});
            }
        });
    }

    useEffect(() => {
        if (leaflet) return;
        if (map) return;
        map = L.map("kt_leaflet_map", {center: [tehranCenterLat, tehranCenterLong], zoom: 13,});
        prepareMap(map);
    }, []);


    const prepareMap = (map) => {
        map.panTo(map.getCenter());
        // set leaflet tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        setLeaflet(map);
        markerLayer = L.layerGroup().addTo(map)
        map.on('moveend', getPlacesInrange);
        getPlacesInrange();
    };


    function addMarkers(places) {
        markerLayer.clearLayers();
        places.forEach(place => {
            if (place.Latitude != null && place.Longitude != null)
                addMarker(place);
        });
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

        let marker = L.marker([place.Latitude, place.Longitude], {icon: leafletIcon, title: place.Name});
        marker.on('click', function (e) {
            navigate("/place/" + place.Id + "-" + fixTextToSlug(place.Name), {replace: false});
        });
        if (markerLayer) {
            marker.addTo(markerLayer);
        }

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
            {isLoading && <LinearProgress/>}
            <Form.Group controlId="MyMap">
                <div id="kt_leaflet_map" className={"map"}/>
            </Form.Group>
        </div>
    );
};

export default PlacesMap;
