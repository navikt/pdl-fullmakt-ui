import * as React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SaveCancel from '../SaveCancel';
import * as sinon from 'sinon';

describe('SaveCancel snapshot', () => {
  it('should match snapshot', () => {
    const onClickSave = sinon.spy();

    const component = (
      <SaveCancel
        id="2"
        saveLabel="Hii"
        onClickSave={onClickSave}
        cancelDisabled={true}
      />
    );

    const wrapper = shallow(component);
    expect(wrapper.find('#Save_2').hasClass('disabled')).toEqual(false);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should react on clickCancel', () => {
    const onClickSave = sinon.spy();
    const onClickCancel = sinon.spy();
    const wrapper = shallow(
      <SaveCancel onClickCancel={onClickCancel} onClickSave={onClickSave} />
    );
    wrapper.find('#Cancel_1').simulate('click');
    expect(onClickSave.calledOnce).toBe(false);
    expect(onClickCancel.calledOnce).toBe(true);
  });

  it('should react on clickSave', () => {
    const onClickSave = sinon.spy();
    const onClickCancel = sinon.spy();
    const wrapper = shallow(
      <SaveCancel onClickCancel={onClickCancel} onClickSave={onClickSave} />
    );
    wrapper.find('#Save_1').simulate('click');
    expect(onClickSave.calledOnce).toBe(true);
    expect(onClickCancel.calledOnce).toBe(false);
  });
});
