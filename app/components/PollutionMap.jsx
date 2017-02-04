import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {noDataIcon, okIcon, warningIcon, errorIcon} from '../helpers/mapMarkers';
import { invalidateAndFetchData } from '../actions';



export class PollutionMap extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            mapCenter: [52.229, 21.011],
            zoom: 13
        };

        this.handleMoveEnd = this.handleMoveEnd.bind(this);
        this.handleZoomEnd = this.handleZoomEnd.bind(this);
    }

    componentDidMount () {
        this.getGeolocation();
    }

    getGeolocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.updatePosition(position.coords.latitude, position.coords.longitude);
            });
        }
        // TODO - some geolocation warning? Or a fallback of some kind?
    }

    updatePosition (lat, lng) {
        const bounds = this.refs.map.leafletElement.getBounds();
        const zoom = this.refs.map.leafletElement.getZoom();
        this.setState({
            mapCenter: [lat, lng],
            zoom
        });
        this.props.invalidateAndFetchData(bounds.getNorthEast(), bounds.getSouthWest());
    }

    handleMoveEnd () {
        console.info('center', this.refs.map.leafletElement.getCenter());
        console.info('zoom', this.refs.map.leafletElement.getZoom());
        console.info('bounds', this.refs.map.leafletElement.getBounds());

        const center = this.refs.map.leafletElement.getCenter();
        this.updatePosition(center.lat, center.lng);
    }

    handleZoomEnd () {
        console.info('center', this.refs.map.leafletElement.getCenter());
        console.info('zoom', this.refs.map.leafletElement.getZoom());
        console.info('bounds', this.refs.map.leafletElement.getBounds());
    }

    extractMarkers(stationData) {
        return stationData.map((markerData, iterator) => {
            const value = markerData.value;
            let icon;
            if (value === null) {
                icon = noDataIcon;
            } else if (value < 50) {
                icon = okIcon;
            } else if (value < 150) {
                icon = warningIcon;
            } else {
                icon = errorIcon;
            }

            return (
                <Marker key={iterator} position={markerData.position} icon={icon}>
                    <Popup>
                        <span>{markerData.description}</span>
                    </Popup>
                </Marker>
            );
        });
    }

    render () {
        const { mapCenter, zoom } = this.state;
        const data = this.props.data.toJS();

        const markers = this.extractMarkers(data);

        return (
            <Map center={mapCenter}
                 ref='map'
                 onMoveend={this.handleMoveEnd}
                 onZoomend={this.handleZoomEnd}
                 zoom={zoom}>
                {this.props.mapSpec}
                {markers}
            </Map>)
    }
}
PollutionMap.propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    data: React.PropTypes.object.isRequired,
    invalidateAndFetchData: React.PropTypes.func.isRequired,
    mapSpec: React.PropTypes.node,
};

const mapStateToProps = (state) => ({
    isFetching: state.get('mapData').get('isFetching'),
    data: state.get('mapData').get('data')
});

const mapDispatchToProps = (dispatch) => ({
    invalidateAndFetchData: bindActionCreators(invalidateAndFetchData, dispatch)
});

export const ConnectedPollutionMap = connect(mapStateToProps, mapDispatchToProps)(PollutionMap);

const PollutionMapWrapper = () => {

    const mapSpec = (
        <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
    );

    return (<ConnectedPollutionMap mapSpec={mapSpec}/>)
};

export default PollutionMapWrapper
