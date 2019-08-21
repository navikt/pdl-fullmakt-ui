import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DataLineage from '../DataLineage';

it('renders DataLineage page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataLineage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
