import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {noDataIcon, okIcon, warningIcon, errorIcon} from '../helpers/mapMarkers';
import { invalidateAndFetchData } from '../actions';



export class PollutionMap extends React.Component {

    componentDidMount() {
        console.info('invalidate!')
        this.props.invalidateAndFetchData([52.229, 21.011], 5, 5);
    }

    render () {
        const center = [52.229, 21.011];

        const data = this.props.data.toJS();

        const markers = data.map((markerData, iterator) => {
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

        return (<Map center={center} zoom={13}>
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
