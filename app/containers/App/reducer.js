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
  STORE_NEXT_PAGE_INDEX,
  SET_NO_NEXT_PAGE,
  FILTER_CLEAR,
  FILTER_CHANGE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  searchedTrack: false,
  foundTracks: false,
  deezerScriptLoaded: false,
  nextPageIndex: false,
  filters: false,
});

function appReducer(state = initialState, action) {

  switch (action.type) {
    case DEEZER_SCRIPT_LOADED:
      return state
        .set('deezerScriptLoaded', true)
    case STORE_NEXT_PAGE_INDEX:
      return state
        .set('nextPageIndex', action.nextPageIndex)
    case LOAD_TRACKS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('foundTracks', initialState.foundTracks)
        .set('nextPageIndex', initialState.nextPageIndex);
    case SET_NO_NEXT_PAGE:
      return state.set('nextPageIndex', initialState.nextPageIndex);
    case SORT_TRACKS:
      return state.set('loading', true);
    case LOAD_NEXT_PAGE_SUCCESS:
      const currentFoundTracks = state.get('foundTracks');
      return state
        .set('foundTracks', currentFoundTracks.concat(action.nextTracks))
    case SORT_ROWS_SUCCESS:
      return state
        .set('foundTracks', action.sortedRows)
        .set('loading', false);
    case FILTER_CLEAR:
      return state.set('filters', initialState.filters);
    case FILTER_CHANGE:
      const newFilter = fromJS({
        filterTerm: action.filterTerm,
        columnKey: action.columnKey
      });
      let oldFilters = state.get('filters');
      if (!oldFilters) {
        oldFilters = fromJS([]);
      }
      const newFilters = oldFilters
        .filter(f => f.columnKey !== newFilter.columnKey)
        .push(newFilter)
      console.log("NEWFILTERS", newFilters)
      return state.set('filters', newFilters);
    case LOAD_TRACKS_SUCCESS:
      return state
        .set('foundTracks', action.tracks)
        .set('loading', false)
        .set('searchedTrack', action.searchedTrack)
    case LOAD_TRACKS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
