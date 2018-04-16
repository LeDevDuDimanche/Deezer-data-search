export function getSearchedTrackURL(searchedTrack, index) {
  const prefix = `/search/track?q=track:"${searchedTrack}"`;
  return index == null ?  prefix : (prefix + "&index=" + index);
}
