/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_TRACKS, LOAD_NEXT_PAGE } from 'containers/App/constants';
import { tracksLoaded, tracksLoadingError, storeNextPage, nextPageLoaded } from 'containers/App/actions';

import { makeSelectSearchQuery } from 'containers/HomePage/selectors';
import { makeSelectDeezerScriptLoaded, makeSelectNextPageIndex, makeSelectNextPageURL } from 'containers/App/selectors';

function deezerApiFetch(requestURL) {
  return new Promise((resolve) => DZ.api(requestURL, function(response) {
    resolve(response);
  }))
}

function filterTracksInformations(rawTracks) {
  return rawTracks.map(t => {
    return {
      id: t.id,
      title: t.title,
      artistName: t.artist == null ? null : t.artist.name
    }
  })
}

function* getTracks(requestURL) {

  const deezerScriptLoaded = yield select(makeSelectDeezerScriptLoaded());

  if (!deezerScriptLoaded) {
    throw Error("Try again when deezer's script will be loaded");
  }


  try {
    const response = yield call(deezerApiFetch, requestURL);
    const rawTracks = response.data
    if (rawTracks == null) {
      return
    }

    const nextPageURL = response.next;
    if (nextPageURL != null && nextPageURL.length > 0) {
      yield put(storeNextPage(nextPageURL))
    }

    const tracks = yield call(filterTracksInformations, rawTracks)
    return tracks
  } catch (err) {
    console.error(err);
    yield put(tracksLoadingError(err));
    return
  }

}

function* getFirstTracks() {
  const searchedTrack = yield select(makeSelectSearchQuery());
  const requestURL = `/search/track?q=track:"${searchedTrack}"`;
  const tracks = yield call(getTracks, requestURL);
  yield put(tracksLoaded(tracks, searchedTrack));

}

function* getNextPage() {
  const nextPageURL = yield select(makeSelectNextPageURL());
  if (nextPageURL == null || nextPageURL.length <= 0) {
    console.log("no next page stored")
    return;
  }

  const tracks = yield call(getTracks, nextPageURL)

  yield put(nextPageLoaded(tracks))
}

export default function* rootSaga() {
  yield takeLatest(LOAD_TRACKS, getFirstTracks);
  yield takeLatest(LOAD_NEXT_PAGE, getNextPage);
}
