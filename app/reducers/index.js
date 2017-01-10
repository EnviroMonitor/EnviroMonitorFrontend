import Immutable from 'immutable';
import { METRIC_TYPES } from '../helpers/mapMarkers';

import {
    INVALIDATE_LOCATION_DATA,
    FETCH_DATA_FOR_LOCATION,
    RECEIVE_DATA_FOR_LOCATION
} from '../actions';

const initialState = {
    isFetching: false,
    data: [
        // TODO it should be empty under normal circumstances
        {
            type: METRIC_TYPES.PM10,
            position: [52.229, 21.032],
            description: "This marker should be blue",
            value: null
        },
        {
            type: METRIC_TYPES.PM10,
            position: [52.217, 20.987],
            description: "This marker should be green",
            value: 25
        },
        {
            type: METRIC_TYPES.PM10,
            position: [52.236, 20.976],
            description: "This marker should be orange",
            value: 75
        },
        {
            type: METRIC_TYPES.PM10,
            position: [52.259, 21.045],
            description: "This marker should be red",
            value: 200
        },
    ],
};

const mapData = (state = Immutable.fromJS(initialState), action) => {
    switch (action.type) {
        case INVALIDATE_LOCATION_DATA:
            return state.set('data', {});
        case FETCH_DATA_FOR_LOCATION:
            return state.set('isFetching', true);
        case RECEIVE_DATA_FOR_LOCATION:
            return state.set('isFetching', false)
                .set('data', action.data);
        default:
            return state;
    }
};

export default mapData

