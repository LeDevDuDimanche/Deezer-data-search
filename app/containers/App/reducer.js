/*
 * AppReducer
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
  LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS,
  LOAD_TRACKS_ERROR,
  DEEZER_SCRIPT_LOADED,
  SORT_ROWS_SUCCESS,
  SORT_TRACKS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  searchedTrack: false,
  foundTracks: false,
  deezerScriptLoaded: false
});

function appReducer(state = initialState, action) {
  console.log(`in app reducer action type = ${action.type}`)
  switch (action.type) {
    case DEEZER_SCRIPT_LOADED:
      return state
        .set('deezerScriptLoaded', true)
    case LOAD_TRACKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('foundTracks', false);
    case SORT_TRACKS:
      return state.set('loading', true)
    case SORT_ROWS_SUCCESS:
      return state
        .set('foundTracks', action.sortedRows)
        .set('loading', false)
    case LOAD_TRACKS_SUCCESS:
      return state
        .set('foundTracks', action.tracks)
        .set('loading', false)
        .set('searchedTrack', action.searchedTrack);
    case LOAD_TRACKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
