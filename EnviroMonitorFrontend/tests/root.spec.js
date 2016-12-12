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
        expect(wrapper.find('h1')).to.exist;
    });

    it('Making sure it\'s rendered by react', () => {
        expect(wrapper.find('h1').text()).to.contain('I\'ve been rendered with React');
    });
});