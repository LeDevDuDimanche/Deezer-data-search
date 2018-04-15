/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TRACKS, LOAD_NEXT_PAGE } from 'containers/App/constants';
import { tracksLoaded, tracksLoadingError, storeNextPage, nextPageLoaded } from 'containers/App/actions';

import { getTracks } from 'utils/sagaCommons'
import { makeSelectSearchQuery } from 'containers/HomePage/selectors';




function* getFirstTracks() {
  const searchedTrack = yield select(makeSelectSearchQuery());
  const requestURL = `/search/track?q=track:"${searchedTrack}"`;
  const tracks = yield call(getTracks, requestURL);
  yield put(tracksLoaded(tracks, searchedTrack));

}

export default function* rootSaga() {
  yield takeLatest(LOAD_TRACKS, getFirstTracks);
}
