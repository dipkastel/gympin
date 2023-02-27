import React, {Component} from 'react';
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import {Form} from "react-bootstrap";
import "./map.css"


var markerLayer = null;
let leaflet = null;
const tehranCenterLat = 35.7019;
const tehranCenterLong = 51.4047;
class PlaceMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedLat: props.place.Latitude==0?tehranCenterLat:props.place.Latitude,
            selectedLng: props.place.Longitude==0?tehranCenterLong:props.place.Longitude
        };
    }
    componentDidMount() {
        this.prepareMap();
    }
    prepareMap() {
        leaflet = L.map("kt_leaflet_map", {
            center: [this.state.selectedLat ,this.state.selectedLng],
            zoom: this.state.selectedLat==tehranCenterLat?10:18,
        });
        leaflet.panTo(leaflet.getCenter());
        // set leaflet tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(leaflet);

        markerLayer = L.layerGroup().addTo(leaflet);

        // PlaceMap onClick Action
        leaflet.on(
            "click",
            function (e) {
                this.addMarker(e.latlng);
                this.props.setFormValues("Latitude",e.latlng.lat)
                this.props.setFormValues("Longitude",e.latlng.lng)
            },
            this
        );

        this.addMarker(leaflet.getCenter());
    }
    addMarker(latlng) {
        // set custom SVG icon marker
        var leafletIcon = L.divIcon({
            html: getIconHtml(),
            bgPos: [60, 60],
            iconAnchor: [0, 35],
            popupAnchor: [-19, -35],
            className: "leaflet-marker",
        });

        markerLayer.clearLayers();
        L.marker(latlng, { icon: leafletIcon }).addTo(markerLayer);

        this.setState(() => ({
            selectedLat: latlng.lat,
            selectedLng: latlng.lng,
        }));

        function getIconHtml() {
            return `<span class="svg-icon svg-icon-danger svg-icon-3x">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 21 21" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="25" height="25"/>
                    <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/>
                    </g>
                    </svg>
                    </span>`;
        }
    }
    clearForm() {
        markerLayer.clearLayers();
    }
    render() {
        return (
            <div>
                <Form.Group controlId="MyMap">
                    <div id="kt_leaflet_map" className={"map"} />
                </Form.Group>
            </div>
        );
    }
}

export default PlaceMap;
