/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectSearchedTrack = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('searchedTrack')
);

const makeSelectDeezerScriptLoaded = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('deezerScriptLoaded')
)

export const makeSelectNextPageURL = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nextPageURL')
)

const makeSelectNextPageIndex = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nextPageIndex')
)

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectFoundTracks = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('foundTracks')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectSearchedTrack,
  makeSelectLoading,
  makeSelectError,
  makeSelectDeezerScriptLoaded,
  makeSelectFoundTracks,
  makeSelectLocation,
};
