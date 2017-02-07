import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import fetchMock from 'fetch-mock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
import { FAKE_DOMAIN } from '../app/request';

import * as actions from '../app/actions';


describe('Actions', () => {
    it('Create basic test for fetchDataForLocation', () => {
        const expectedAction = {
            type: actions.FETCH_DATA_FOR_LOCATION,
            northEast: [1, 1],
            southWest: [1, 1]
        };
        expect(actions.fetchDataForLocation([1, 1], [1, 1])).to.deep.equal(expectedAction);
    });

    it('Create basic test for receiveDataForLocation', () => {
        const expectedAction = {
            type: actions.RECEIVE_DATA_FOR_LOCATION,
            data: [
                {
                    position: [52.259, 21.045],
                    description: "This marker should be red",
                    last_metering: {
                        pm10: 200,
                        pm25: 200
                    }
                },
            ]
        };

        expect(actions.receiveDataForLocation(expectedAction.data)).to.deep.equal(expectedAction);
    });

    it('Create basic test for invalidateLocationData', () => {
        const expectedAction = {
            type: actions.INVALIDATE_LOCATION_DATA
        };
        expect(actions.invalidateLocationData()).to.deep.equal(expectedAction);
    });

    it('Create basic test for invalidateAndFetchData', () => {
        const expectedActions = [
            {
                type: actions.INVALIDATE_LOCATION_DATA
            },
            {
                type: actions.FETCH_DATA_FOR_LOCATION,
                northEast: [1, 1],
                southWest: [1, 1]
            },
            {
                type: actions.RECEIVE_DATA_FOR_LOCATION,
                data: [
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
            }
        ];

        const store = mockStore({});

        fetchMock.mock(FAKE_DOMAIN + '*', {
            headers: {'Content-Type': 'application/json'},
            body: {}
        });

        store.dispatch(actions.invalidateAndFetchData([1, 1], [1, 1])).then(
            () => expect(store.getActions()).to.deep.equal(expectedActions)
        );

        fetchMock.restore();
    });
});
