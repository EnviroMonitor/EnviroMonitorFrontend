import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Root from '../app/root';

describe('<Root/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Root/>);
    });

    it('shows the main component', () => {
        expect(wrapper.find('div.root')).to.exist;
    });

    it('Making sure it has <PollutionMap/> element defined', () => {
        expect(wrapper.find('PollutionMap')).to.exist;
    });

    it('Making sure it has <DataHolder/> element defined', () => {
        expect(wrapper.find('DataHolder')).to.exist;
    });
});
