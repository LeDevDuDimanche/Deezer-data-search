import { LOAD_NEXT_PAGE_SUCCESS } from 'containers/App/constants'

export function nextPageLoaded(nextTracks) {
  return {
    type: LOAD_NEXT_PAGE_SUCCESS,
    nextTracks: nextTracks,
  }
}
