/**
 * Gets the repositories of the user from Github
 */

 import { makeSelectNextPageIndex, makeSelectFoundTracks, makeSelectSearchedTrack } from 'containers/App/selectors';
 import { put, select, takeLatest, call, take } from 'redux-saga/effects';
 import { getTracks } from 'utils/sagaCommons'
 import { getSearchedTrackURL } from 'utils/urlCommons'
import { LOAD_NEXT_PAGE, LOAD_TRACKS_SUCCESS, SORT_TRACKS, SORT_ROWS_SUCCESS, LOAD_NEXT_PAGE_SUCCESS } from 'containers/App/constants';
import { nextPageLoaded } from './actions';


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

function* getSortedTracks({sortColumn, sortDirection}) {
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
  const nextPageIndex = yield select(makeSelectNextPageIndex());
  if (!nextPageIndex) {
    console.log("no next page stored")
    return;
  }

  const searchedTrack = yield select(makeSelectSearchedTrack());

  const nextPageRelativeURL = getSearchedTrackURL(searchedTrack, nextPageIndex)
  const tracks = yield call(getTracks, nextPageRelativeURL);
  yield put(nextPageLoaded(tracks));
}

export default function* rootSaga() {
  yield takeLatest(SORT_TRACKS, getSortedTracks);

  while (true) {
    yield take(LOAD_NEXT_PAGE)
    console.log("AFTER LOAD NEXT PAGE")
    yield call(getNextPage)
    console.log("AFTER getNextPage")
  }
}
