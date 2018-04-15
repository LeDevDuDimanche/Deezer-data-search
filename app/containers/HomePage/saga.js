/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TRACKS } from 'containers/App/constants';
import { tracksLoaded, tracksLoadingError } from 'containers/App/actions';

import { makeSelectSearchQuery } from 'containers/HomePage/selectors';
import { makeSelectDeezerScriptLoaded } from 'containers/App/selectors';

function deezerApiFetch(requestURL) {
  return new Promise((resolve) => DZ.api(requestURL, function(response) {
    resolve(response.data);
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

export function* getTracks() {
  const searchedTrack = yield select(makeSelectSearchQuery());

  const deezerScriptLoaded = yield select(makeSelectDeezerScriptLoaded());

  if (!deezerScriptLoaded) {
    throw Error("Try again when deezer's script will be loaded");
  }

  const requestURL = `/search/track?q=track:"${searchedTrack}"`;
  try {
    const rawTracks = yield call(deezerApiFetch, requestURL);

    let tracks = []
    if (tracks != null) {
      tracks = filterTracksInformations(rawTracks)
    }

    console.log("FOUND TRACKS = ", tracks);
    yield put(tracksLoaded(tracks, searchedTrack));
  } catch (err) {
    console.error(err);
    yield put(tracksLoadingError(err));
  }
}

/*start getTracks on each dispatched action of type LOAD_TRACKS*/
export default function* fetchTracks() {
  yield takeLatest(LOAD_TRACKS, getTracks)
}
