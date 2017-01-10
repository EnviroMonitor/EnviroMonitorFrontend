import React from 'react';
import { connect } from 'react-redux';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {noDataIcon, okIcon, warningIcon, errorIcon} from '../helpers/mapMarkers';



class PollutionMap extends React.Component {
    render () {
        const position = [51.505, -0.09];
        const position2 = [51.515, -0.08];
        const position3 = [51.525, -0.07];
        const position4 = [51.535, -0.06];

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
            <Marker position={position2} icon={okIcon}>
                <Popup>
                    <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                </Popup>
            </Marker>
            <Marker position={position3} icon={warningIcon}>
                <Popup>
                    <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                </Popup>
            </Marker>
            <Marker position={position4} icon={errorIcon}>
                <Popup>
                    <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                </Popup>
            </Marker>
        </Map>)
    }
}
PollutionMap.propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    data: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isFetching: state.get('mapData').get('isFetching'),
    data: state.get('mapData').get('data')
});

export default connect(mapStateToProps)(PollutionMap);
