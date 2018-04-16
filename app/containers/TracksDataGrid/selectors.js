import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

export const makeSelectAllowedToFetchNextPage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('allowedToFetchNextPage')
);
