import React, {useContext, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Form} from "react-bootstrap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {Place_query} from "../../../network/api/place.api";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Button, Grid, LinearProgress, Typography} from "@mui/material";
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
        map = L.map("kt_leaflet_map", {center: [tehranCenterLat, tehranCenterLong], zoom: 15,
            minZoom: 14,
            maxZoom: 16});

        prepareMap(map);
    }, []);


    useEffect(() => {
        if (!map) return;
        // map.locate().on("locationfound", function (e) {
        //     console.log("e",e);
        //     map.flyTo([e.latitude, e.longitude], 14)
        // }).on("locationerror", function (e) {
        //     error.showError({message: "خطا در دسترسی به موقعیت مکانی",});
        // });
    }, []);


    const prepareMap = (map) => {
        map.panTo(map.getCenter());
        // set leaflet tile layer
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            variant: "rastertiles/voyager",
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

    function getPopup(place){
        const popupContainer = document.createElement("div");
        ReactDOM.render(
            <>
                <Grid textAlign={"right"} >
                    <Typography sx={{fontFamily:"IRANSans-web"}} variant={"h6"}>{place.Name}</Typography>
                    <Typography sx={{fontFamily:"IRANSans-web",mb:2}} variant={"caption"}>{place.Address}</Typography>
                    <img width="100%" src={place.Multimedias[0].Url+"&width=400"}  />
                    <Button variant={"contained"} sx={{fontFamily:"IRANSans-web",mt:1,color:"#ffffff !important",bgcolor:"#e7333e"}} fullWidth color={"primary"} href={"/place/" + place.Id + "-" + fixTextToSlug(place.Name)} >اطلاعات بیشتر</Button>
                </Grid>
            </>,
            popupContainer
        );
        return popupContainer;
    }

    function addMarker(place) {
        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [16, 30],
            popupAnchor: [-19, -35],
            className: "leaflet-marker",
        });

        let marker = L.marker([place.Latitude, place.Longitude], {icon: leafletIcon, title: place.Name});

        marker.bindPopup(getPopup(place));
        marker.on('click', function (e) {

            marker.openPopup();
            // navigate("/place/" + place.Id + "-" + fixTextToSlug(place.Name), {replace: false});
        });
        if (markerLayer) {
            marker.addTo(markerLayer);
        }

        function getIconHtml() {
            return ` <span class="svg-icon svg-icon-danger svg-icon-3x">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="15" y="0" width="30" height="30"/>
                    <path fill="#3F3F3F" d="M9.76,18.59L9.34,18.5c-0.21-0.04-0.41-0.15-0.57-0.3l0,0c-0.39-0.37-0.72-0.8-0.98-1.27 C7.01,15.47,6.71,13.84,6.92,12c0.02-0.21,0.05-0.4-0.13-0.57c-1.08-1.06-2.14-2.14-3.27-3.27C3.46,8.29,3.42,8.34,3.4,8.39 C3.36,8.46,3.32,8.54,3.3,8.62c-1.73,4.96-0.88,9.44,2.72,13.26c2.63,2.79,0.66,0.69,2.88,2.92l0,0c0.04,0.04,0.08,0.08,0.13,0.13 c0.08,0.08,0.17,0.18,0.27,0.27l0,0c1.19,1.17,2.43,2.3,3.72,3.39c0.67,0.57,1.43,0.96,2.46,0.91c0.77-0.04,2.86-1.95,3.92-2.94 c0.43-0.33,0.82-0.7,1.13-1.13c0.95-1.34,1.92-2.66,3.01-3.92c0.27-0.31,0.39-0.63,0.39-0.96c0.2-0.55,0.03-1.1-0.47-1.59 c-0.74-0.71-1.57-1.34-2.4-1.98c-0.33-0.25-0.7-0.28-1.11,0.03c-0.39,0.29-0.57,0.3-1.07,0.44c-0.47,0.13-0.64,0.32-0.47,0.59 c0.12,0.2,0.25,0.39,0.38,0.59c0.05,0.08,0.14,0.16,0.24,0.18c0.06,0.12,0.27,0.1,0.36,0.23c0.12,0.17,0,0.14,0.08,0.19 c0.01,0.02,0.02,0.04,0.04,0.06c0.03,0.05,0.07,0.1,0.1,0.15c0.01,0.03,0.03,0.07,0.04,0.1c0.22,0.45,0.43,0.86,1.23,0.8 c0.29-0.02,0.5,0.21,0.54,0.45c0,0,0,0.01-0.01,0.01h0.01c0.02,0.14-0.02,0.29-0.14,0.4c-0.32,0.28-0.68,0.53-1.03,0.78l-4.91,2.56 l-0.28-0.47c-0.5-0.72-0.58-1.34-0.76-2.2c-0.15-0.75-0.48-1.48-1.2-2.11c-0.4-0.35-0.89-0.59-1.41-0.71L9.76,18.59z"/>
                    <path fill="#E3343F" d="M26.64,17.77c-1.19-1.23-2.27-2.35-3.36-3.46c-0.2-0.21-0.17-0.45-0.15-0.7c0.29-4.77-3.35-8.7-8.12-8.73 C12.1,4.87,9.79,6.09,8.17,8.52c-0.23,0.34-0.33,0.4-0.66,0.09C6.65,7.83,5.89,6.96,5.06,6.15C4.8,5.9,4.76,5.74,4.99,5.43 c3.99-5.4,12.08-6.55,17.46-2.5c4.42,3.34,6.14,8.85,4.52,13.97C26.89,17.13,26.79,17.36,26.64,17.77z"/>
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
