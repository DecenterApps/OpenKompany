import { combineReducers } from 'redux';
import kompanyReducer from './kompanyReducer';

const appReducer = combineReducers({
  kompany: kompanyReducer,
});

/*   Clears the store state    */
const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    // Leave permanent reducers here
    return appReducer({}, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
