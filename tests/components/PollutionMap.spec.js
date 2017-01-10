import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PollutionMap from '../../app/components/PollutionMap';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Immutable from 'immutable';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('<PollutionMap/>', () => {
    let wrapper;
    let store;
    const initialState = {
        mapData: {
            isFetching: false,
            data: {}
        }
    };

    beforeEach(() => {
        store = mockStore(Immutable.fromJS(initialState));
        wrapper = shallow(<PollutionMap/>, {
            context: {
                store
            }
        });
    });

    it('Making sure it has <Map/> element defined', () => {
        expect(wrapper.find('Map')).to.exist;
    });

    it('Making sure it has <TileLayer/> element defined', () => {
        expect(wrapper.find('TileLayer')).to.exist;
    });
});
