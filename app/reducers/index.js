import Immutable from 'immutable';

import {
    INVALIDATE_LOCATION_DATA,
    FETCH_DATA_FOR_LOCATION,
    RECEIVE_DATA_FOR_LOCATION
} from '../actions';

const initialState = {
    isFetching: false,
    data: {},
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

