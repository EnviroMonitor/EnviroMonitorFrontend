import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { ConnectedPollutionMap } from '../../app/components/PollutionMap';
import PollutionMapWrapper from '../../app/components/PollutionMap';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { METRIC_TYPES } from '../../app/helpers/mapMarkers';
import { Map, Marker } from 'react-leaflet';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('<PollutionMap/>', () => {
    let wrapper;
    let store;
    const initialState = {
        mapData: {
            isFetching: false,
            data: [
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
        }
    };

    beforeEach(() => {
        store = mockStore(Immutable.fromJS(initialState));
    });

    describe('Testing the map element itself', () => {
        beforeEach(() => {
            wrapper = mount(<ConnectedPollutionMap/>, {
                context: {
                    store
                }
            });
        });

        it('Making sure it has <Map/> element defined', () => {
            expect(wrapper.find(Map)).to.have.length(1);
        });

        it('Making sure it has the right amount of <Marker/> elements defined', () => {
            expect(wrapper.find('Marker')).to.have.length(4);
        });
    });

    describe('Testing the wrapper', () => {
        beforeEach(() => {
            wrapper = shallow(<PollutionMapWrapper/>, {
                context: {
                    store
                }
            });
        });

        it('renders the wrapper correctly', () => {
            expect(wrapper.find(ConnectedPollutionMap)).to.have.length(1);
        });
    });
});
