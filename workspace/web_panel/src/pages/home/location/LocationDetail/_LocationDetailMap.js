import React, {useEffect, useState} from 'react';
import "./map.css"
import * as L from "leaflet";
import {useHistory} from "react-router-dom";
import Notice from "../../../partials/content/Notice";
import {Portlet, PortletBody, PortletHeader} from "../../../partials/content/Portlet";
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
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", mapOptions).addTo(map);


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
