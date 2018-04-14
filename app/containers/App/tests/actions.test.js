import {
  LOAD_TRACKS,
  LOAD_TRACKS_SUCCESS,
  LOAD_TRACKS_ERROR,
} from '../constants';

import {
  loadTracks,
  reposLoaded,
  repoLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadTracks', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_TRACKS,
      };

      expect(loadTracks()).toEqual(expectedResult);
    });
  });

  describe('reposLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: LOAD_TRACKS_SUCCESS,
        repos: fixture,
        username,
      };

      expect(reposLoaded(fixture, username)).toEqual(expectedResult);
    });
  });

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_TRACKS_ERROR,
        error: fixture,
      };

      expect(repoLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
