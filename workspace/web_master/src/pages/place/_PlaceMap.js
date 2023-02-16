import React, {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import L from "leaflet";


function MapFunctions({setPosition,location}) {
    const map = useMap()
    useMapEvents({
        click(e){
            setPosition([e.latlng.lat, e.latlng.lng])
            map.flyTo(e.latlng, 18)
            location(e.latlng.lat,e.latlng.lng)
        },
        locationfound(e) {
        }
    })

}

const _PlaceMap = ({place,location}) => {
    const [position,setPosition]=useState([place.Latitude, place.Longitude])
    const iconSize = {x:63,y:72}
    const iconPerson = new L.Icon({
        iconUrl: '/assets/images/location.png',
        iconRetinaUrl:null,
        iconAnchor: [iconSize.x/2, iconSize.y],
        popupAnchor: [0, -iconSize.y],
        shadowUrl: '/assets/images/locationShadow.png',
        shadowSize: [iconSize.x, iconSize.y],
        shadowAnchor: [iconSize.x/2, iconSize.y],
        iconSize: [iconSize.x, iconSize.y]
    });

    return (

        <MapContainer style={{height:300,width:"100%"}} center={position} zoom={18} scrollWheelZoom={true}>

            <MapFunctions setPosition={setPosition} location={location} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={iconPerson} >
                <Popup>
                    {place.Name}
                </Popup>
            </Marker>
        </MapContainer>
    )
};

export default _PlaceMap;
