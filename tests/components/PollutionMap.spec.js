import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import geolocate from 'mock-geolocation';
import sinon from 'sinon';

import { ConnectedPollutionMap, PollutionMap } from '../../app/components/PollutionMap';
import PollutionMapWrapper from '../../app/components/PollutionMap';
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

    describe('Testing PollutionMapWrapper wrapper for coverage', () => {
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

    describe('Testing the PollutionMap functions', () => {
        const fetchDataSpy = sinon.spy();
        beforeEach(() => {
            wrapper = shallow(<PollutionMap
                isFetching={initialState.mapData.isFetching}
                data={Immutable.fromJS(initialState.mapData.data)}
                invalidateAndFetchData={fetchDataSpy}
            />);

            wrapper.instance().refs = {
                map: {
                    leafletElement: {
                        getZoom: () => 10,
                        getBounds: () => ({
                            getNorthEast:  () => [2, 2],
                            getSouthWest: () => [3, 3]
                        }),
                        getCenter: () => ({
                            lat: 1,
                            lng: 1
                        })
                    }
                }
            };
        });

        it('renders the wrapper correctly', () => {
            expect(wrapper.find(Map)).to.have.length(1);
        });

        it('check if updates on handleMoveEnd when lastUpdated > 20', () => {
            wrapper.setState({lastUpdated: Date.now() - 100});
            wrapper.instance().handleMoveEnd();

            const state = wrapper.state();

            expect(state.mapCenter).to.deep.equal([1, 1]);
            expect(state.zoom).to.equal(10);
            expect(fetchDataSpy.calledOnce).to.equal(true);
            expect(fetchDataSpy.calledWith([2, 2], [3, 3])).to.equal(true);
        });

        it('check if updates on handleMoveEnd when lastUpdated < 20', () => {
            wrapper.setState({lastUpdated: Date.now() - 10});
            wrapper.instance().handleMoveEnd();

            const state = wrapper.state();

            expect(state.mapCenter).to.deep.equal([52.229, 21.011]);
            expect(state.zoom).to.equal(13);
            expect(fetchDataSpy.calledWith([2, 2], [3, 3])).to.equal(true);
        });

        it('properly changing location, when method is called directly (for coverage)', () => {
            window.navigator.geolocation = {
                getCurrentPosition: (funcToCall) => {
                    funcToCall({
                        coords: {
                            latitude: 52.129,
                            longitude: 21.111
                        }
                    })
                }
            };

            wrapper.instance().getGeolocation();
            expect(wrapper.state().mapCenter).to.deep.equal([52.129, 21.111]);

            window.navigator.geolocation = undefined;
        });
    });

    describe('Tesing geolocation', () => {

        it('properly changing location', () => {

            geolocate.use();

            wrapper = shallow(<ConnectedPollutionMap/>, {
                context: {
                    store
                }
            });

            geolocate.send({
                latitude: 52.129,
                longitude: 21.111,
            });

            setTimeout( function () {
                try {
                    expect(wrapper.dive().state()).to.deep.equal({mapCenter: [52.129, 21.111]});
                    done();
                } catch( e ) {
                    done( e );
                }
            }, 100 );

            geolocate.restore()
        });
    });
});
