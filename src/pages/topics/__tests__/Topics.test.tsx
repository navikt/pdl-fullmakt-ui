import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Topics from '../Topics';

it('renders Topics page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Topics />, div);
  ReactDOM.unmountComponentAtNode(div);
});
