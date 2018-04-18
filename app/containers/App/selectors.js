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
);

export const makeSelectNextPageIndex = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nextPageIndex')
);


const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

export const makeSelectFilters = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('filters')
)

const makeSelectFoundTracks = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('foundTracks')
);

function containsAllWordsOfFilterTerm(str, filterTerm) {
  const words = filterTerm.split(/\s+/).filter(w => w.length > 0);

  return words.reduce(((z, word) => {
    return z && str.indexOf(word) >= 0;
  }), true);
}

function shouldKeepTrack(track, filters) {
  return filters.reduce((acc, filter) => {
    const trackColumnKey = filter.get('columnKey');
    const filterTerm = filter.get('filterTerm').toLowerCase();
    const trackColumn = track[trackColumnKey].toLowerCase();
    const matches =
      acc && containsAllWordsOfFilterTerm(trackColumn, filterTerm);

    return matches;
  }, true);
}

const makeSelectFilteredTracks = () => createSelector(
  [makeSelectFoundTracks(), makeSelectFilters()],
  ((foundTracks, filters) => {
    if (!foundTracks) {
      return [];
    }

    if (!filters) {
      return foundTracks;
    }

    const filterResult = foundTracks.filter((t) => shouldKeepTrack(t, filters));
    return filterResult;
  })
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectSearchedTrack,
  makeSelectLoading,
  makeSelectFoundTracks,
  makeSelectError,
  makeSelectDeezerScriptLoaded,
  makeSelectFilteredTracks,
  makeSelectLocation,
};
