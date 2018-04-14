/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectSearchQuery = () => createSelector(
  selectHome,
  (homeState) => homeState.get('searchQuery')
);

export {
  selectHome,
  makeSelectSearchQuery,
};
