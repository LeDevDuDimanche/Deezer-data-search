/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TRACKS,
  LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS_ERROR,
  DEEZER_SCRIPT_LOADED,
  STORE_NEXT_PAGE_URL,
  LOAD_NEXT_PAGE_SUCCESS,
} from './constants';

export function storeNextPage(nextPageURL) {
  return {
    type: STORE_NEXT_PAGE_URL,
    nextPageURL: nextPageURL,
  }
}

export function loadTracks() {
  return {
    type: LOAD_TRACKS,
  };
}

export function nextPageLoaded(nextTracks) {
  return {
    type: LOAD_NEXT_PAGE_SUCCESS,
    nextTracks: nextTracks,
  }
}

export function deezerScriptLoaded() {
  return { type: DEEZER_SCRIPT_LOADED };
}

export function tracksLoaded(tracks, searchedTrack) {
  return {
    type: LOAD_TRACKS_SUCCESS,
    tracks,
    searchedTrack,
  };
}

export function tracksLoadingError(error) {
  return {
    type: LOAD_TRACKS_ERROR,
    error,
  };
}
