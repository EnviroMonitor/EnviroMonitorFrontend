import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SmogMap from '../../app/components/SmogMap';

describe('<SmogMap/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SmogMap/>);
    });

    it('Making sure it has <Map/> element defined', () => {
        expect(wrapper.find('Map')).to.exist;
    });

    it('Making sure it has <TileLayer/> element defined', () => {
        expect(wrapper.find('TileLayer')).to.exist;
    });
});
