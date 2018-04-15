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
  LOAD_NEXT_PAGE_SUCCESS,
  STORE_NEXT_PAGE_URL,
  SET_NO_NEXT_PAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  searchedTrack: false,
  foundTracks: false,
  deezerScriptLoaded: false,
  nextPageURL: false,
});

function appReducer(state = initialState, action) {
  console.log(`in app reducer action:`, action)

  switch (action.type) {
    case DEEZER_SCRIPT_LOADED:
      return state
        .set('deezerScriptLoaded', true)
    case STORE_NEXT_PAGE_URL:
      return state
        .set('nextPageURL', action.nextPageURL)
    case LOAD_TRACKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('foundTracks', false)
        .set('nextPageURL', initialState.nextPageURL);
    case SET_NO_NEXT_PAGE:
      return state.set('nextPageURL', initialState.nextPageURL);
    case SORT_TRACKS:
      return state.set('loading', true);
    case LOAD_NEXT_PAGE_SUCCESS: 
      return state
        .set('foundTracks', state.get('foundTracks').concat(action.nextTracks));
    case SORT_ROWS_SUCCESS:
      return state
        .set('foundTracks', action.sortedRows)
        .set('loading', false);
    case LOAD_TRACKS_SUCCESS:
      return state
        .set('foundTracks', action.tracks)
        .set('loading', false)
        .set('searchedTrack', action.searchedTrack)
        .set('nextPageIndex', action.nextPageIndex);
    case LOAD_TRACKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
