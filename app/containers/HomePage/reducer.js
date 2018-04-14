/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  CHANGE_SEARCHED_TRACK,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  searchQuery: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCHED_TRACK:

      // Delete prefixed '@' from the github username
      return state
        .set('searchQuery', action.query.replace(/@/gi, ''));
    default:
      return state;
  }
}

export default homeReducer;
