import { makeSelectDeezerScriptLoaded, makeSelectNextPageIndex } from 'containers/App/selectors';
import { call, put, select } from 'redux-saga/effects';
import { tracksLoadingError, storeNextPage, setNoNextPage } from 'containers/App/actions';

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
      artistName: t.artist == null ? "no informations" : t.artist.name
    }
  })
}

export function* getTracks(requestURL) {

  const deezerScriptLoaded = yield select(makeSelectDeezerScriptLoaded());

  if (!deezerScriptLoaded) {
    throw Error("Try again when deezer's script will be loaded");
  }

  try {
    const response = yield call(deezerApiFetch, requestURL);
    const rawTracks = response.data
    if (rawTracks == null) {
      console.log("NULL RESPONSE!!!", response, requestURL)
      return
    }

    const nextPageURL = response.next;

    if (nextPageURL != null && nextPageURL.length > 0) {
      const nextPageIndexMatch = nextPageURL.match(/.*index=(\d+)/)
      if (nextPageIndexMatch != null) {
        const nextIndex = parseInt(nextPageIndexMatch[1])
        yield put(storeNextPage(nextIndex))
      }
    } else {
      yield put(setNoNextPage())
    }

    const tracks = yield call(filterTracksInformations, rawTracks);
    return tracks
  } catch (err) {
    console.error(err);
    yield put(tracksLoadingError(err));
    return
  }

}
