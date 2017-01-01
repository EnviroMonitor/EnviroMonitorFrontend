export const FETCH_DATA_FOR_LOCATION = 'FETCH_DATA_FOR_LOCATION';
export const RECEIVE_DATA_FOR_LOCATION = 'RECEIVE_DATA_FOR_LOCATION';
export const INVALIDATE_LOCATION_DATA = 'INVALIDATE_LOCATION_DATA';

export const fetchDataForLocation = (location, range) => ({
    type: FETCH_DATA_FOR_LOCATION,
    location,
    range
});

export const receiveDataForLocation = (data) => ({
    type: RECEIVE_DATA_FOR_LOCATION,
    data
});

export const invalidateLocationData = () => ({
    type: INVALIDATE_LOCATION_DATA
});