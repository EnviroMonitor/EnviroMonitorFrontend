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

    it('Making sure it has <SmogMap/> element defined', () => {
        expect(wrapper.find('SmogMap')).to.exist;
    });

    it('Making sure it has <Data/> element defined', () => {
        expect(wrapper.find('SmogMap')).to.exist;
    });
});
