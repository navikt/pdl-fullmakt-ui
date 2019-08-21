import { combineReducers } from 'redux';
import availabilityReducer from './availability/availabilityReducer';

export default combineReducers({
  availability: availabilityReducer
});
