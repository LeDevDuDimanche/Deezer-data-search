/**
 * Gets the repositories of the user from Github
 */

import { put, select, takeLatest, call } from 'redux-saga/effects';
import { SORT_TRACKS, SORT_ROWS_SUCCESS } from 'containers/App/constants';
import { makeSelectFoundTracks } from 'containers/App/selectors'

function sort(sortColumn, sortDirection, rows) {
  const comparer = (a, b) => {
    if (sortDirection === 'ASC') {
      return a[sortColumn] > b[sortColumn];
    } else if (sortDirection === 'DESC') {
      return a[sortColumn] < b[sortColumn];
    }
  };

  return sortDirection === 'NONE' ? rows : rows.sort(comparer)
}

export function* _getSortedTracks({sortColumn, sortDirection}) {
  const foundTracks = yield select(makeSelectFoundTracks())

  if (foundTracks == null) {
    return
  }

  yield put({
    type: SORT_ROWS_SUCCESS,
    sortedRows: sort(sortColumn, sortDirection, foundTracks)
  })
}

/*start getTracks on each dispatched action of type LOAD_TRACKS*/
export default function* getSortedTracks() {
  yield takeLatest(SORT_TRACKS, _getSortedTracks)
}
