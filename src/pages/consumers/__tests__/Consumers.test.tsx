import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Consumers from '../Consumers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Consumers />, div);
  ReactDOM.unmountComponentAtNode(div);
});
