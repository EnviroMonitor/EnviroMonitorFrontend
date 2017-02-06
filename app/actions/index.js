import { getAPI } from '../request';
import { API_GET_STATION_DATA } from '../urls'

export const FETCH_DATA_FOR_LOCATION = 'FETCH_DATA_FOR_LOCATION';
export const RECEIVE_DATA_FOR_LOCATION = 'RECEIVE_DATA_FOR_LOCATION';
export const INVALIDATE_LOCATION_DATA = 'INVALIDATE_LOCATION_DATA';

export const fetchDataForLocation = (southWest, northEast) => ({
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


export const invalidateAndFetchData = (southWest, northEast) => {
    return (dispatch) => {
        dispatch(invalidateLocationData());
        dispatch(fetchDataForLocation(southWest, northEast));
        return getAPI(API_GET_STATION_DATA, {
            in_bbox: southWest.lat + "," + southWest.lng + "," + northEast.lat + "," + northEast.lng
        }).then((response) => {
                dispatch(receiveDataForLocation(
                    [
                        // TODO it should have data from repsonse
                        {
                            position: [52.229, 21.032],
                            description: "This marker should be blue",
                            last_metering: {
                                pm10: null,
                                pm25: null
                            }
                        },
                        {
                            position: [52.217, 20.987],
                            description: "This marker should be green",
                            last_metering: {
                                pm10: 25,
                                pm25: 25
                            }
                        },
                        {
                            position: [52.236, 20.976],
                            description: "This marker should be orange",
                            last_metering: {
                                pm10: 75,
                                pm25: 75
                            }
                        },
                        {
                            position: [52.259, 21.045],
                            description: "This marker should be red",
                            last_metering: {
                                pm10: 200,
                                pm25: 200
                            }
                        },
                    ]
                ))
            }


        );
    }
};
