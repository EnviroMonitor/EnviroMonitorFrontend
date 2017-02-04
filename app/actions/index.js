import { getAPI } from '../request';
import { API_GET_STATION_DATA } from '../urls'
import { METRIC_TYPES } from '../helpers/mapMarkers';

export const FETCH_DATA_FOR_LOCATION = 'FETCH_DATA_FOR_LOCATION';
export const RECEIVE_DATA_FOR_LOCATION = 'RECEIVE_DATA_FOR_LOCATION';
export const INVALIDATE_LOCATION_DATA = 'INVALIDATE_LOCATION_DATA';

export const fetchDataForLocation = (northEast, southWest) => ({
    type: FETCH_DATA_FOR_LOCATION,
    northEast,
    southWest
});

export const receiveDataForLocation = (data) => ({
    type: RECEIVE_DATA_FOR_LOCATION,
    data
});

export const invalidateLocationData = () => ({
    type: INVALIDATE_LOCATION_DATA
});


export const invalidateAndFetchData = (northEast, southWest) => {
    return (dispatch) => {
        dispatch(invalidateLocationData());
        dispatch(fetchDataForLocation(northEast, southWest));
        return getAPI(API_GET_STATION_DATA, {
            northEast,
            southWest
        }).then((response) => {
                dispatch(receiveDataForLocation(
                    [
                        // TODO it should have data from repsonse
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
                    ]
                ))
            }


        );
    }
};