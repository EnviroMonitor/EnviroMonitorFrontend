import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import noDataImageUrl from '../../images/marker-no-data.png';
import Leaflet from 'leaflet'

console.info(noDataImageUrl);

const noDataIcon = Leaflet.icon({
    iconUrl: noDataImageUrl,
});

export default class SmogMap extends React.Component {
    render () {
        const position = [51.505, -0.09];
        const position2 = [51.515, -0.08];

        return (<Map center={position} zoom={13}>
            <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={noDataIcon}>
                <Popup>
                    <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                </Popup>
            </Marker>
            <Marker position={position2}>
                <Popup>
                    <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                </Popup>
            </Marker>
        </Map>)
    }
}