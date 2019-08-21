import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as React from 'react';
import { AboutPage } from '../AboutPage';
import AboutPageEn from '../AboutPage_en.html';
import AboutPageNo from '../AboutPage_no.html';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('AboutPage', () => {
  it('should render norwegian text', () => {
    const wrapper = shallow(<AboutPage />);
    expect(wrapper.find(AboutPageNo).length).toBe(1);
    expect(wrapper.find(AboutPageEn).length).toBe(0);
  });

  it('should render english text', () => {
    const wrapper = shallow(<AboutPage language={'en'} />);
    expect(wrapper.find(AboutPageEn).length).toBe(1);
    expect(wrapper.find(AboutPageNo).length).toBe(0);
  });

  it('should have norwegian text', () => {
    const wrapper = shallow(<AboutPageNo />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should have english text', () => {
    const wrapper = shallow(<AboutPageEn />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
