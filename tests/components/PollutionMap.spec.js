import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PollutionMap from '../../app/components/PollutionMap';

describe('<PollutionMap/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PollutionMap/>);
    });

    it('Making sure it has <Map/> element defined', () => {
        expect(wrapper.find('Map')).to.exist;
    });

    it('Making sure it has <TileLayer/> element defined', () => {
        expect(wrapper.find('TileLayer')).to.exist;
    });
});
