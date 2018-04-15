/**
 * Gets the repositories of the user from Github
 */

import { LOAD_TRACKS, LOAD_NEXT_PAGE } from 'containers/App/constants';
import { nextPageLoaded } from './actions';

import { makeSelectNextPageURL } from 'containers/App/selectors';

import { put, select, takeLatest, call } from 'redux-saga/effects';
import { SORT_TRACKS, SORT_ROWS_SUCCESS } from 'containers/App/constants';
import { makeSelectFoundTracks } from 'containers/App/selectors'
import { getTracks } from 'utils/sagaCommons'

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

function* _getSortedTracks({sortColumn, sortDirection}) {
  const foundTracks = yield select(makeSelectFoundTracks())

  if (foundTracks == null) {
    return
  }

  yield put({
    type: SORT_ROWS_SUCCESS,
    sortedRows: sort(sortColumn, sortDirection, foundTracks)
  })
}

function* getNextPage() {
  const nextPageURL = yield select(makeSelectNextPageURL());
  if (!nextPageURL || nextPageURL.length <= 0) {
    console.log("no next page stored")
    return;
  }

  const nextPageRelativeURL =
    nextPageURL.replace("jsonp", "json").replace(/.*api\.deezer\.com/, "")
  const tracks = yield call(getTracks, nextPageRelativeURL);
  yield put(nextPageLoaded(tracks));
}

export default function* rootSaga() {
  yield takeLatest(SORT_TRACKS, _getSortedTracks);
  yield takeLatest(LOAD_NEXT_PAGE, getNextPage);
}
