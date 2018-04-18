import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectSearchedTrack,
  makeSelectLoading,
  makeSelectError,
  makeSelectFoundTracks,
  makeSelectLocation,
  makeSelectFilteredTracks,
  makeSelectFilters,
} from '../selectors';

import { initialState } from '../reducer';

describe('makeSelectSearchedTrack', () => {
  const searchedTrackSelector = makeSelectSearchedTrack();
  it('should select the current searched track', () => {
    const searchedTrack = 'oinqowinfdqwf';
    const mockedState = fromJS({
      global: {
        searchedTrack: searchedTrack
      },
    });
    expect(searchedTrackSelector(mockedState)).toEqual(searchedTrack);
  });
});


describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});


describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectFoundTracks', () => {
  const tracksSelector = makeSelectFoundTracks();
  it('should select an empty list of tracks', () => {
    const tracks = fromJS([]);
    const mockedState = fromJS({
      global: {
        foundTracks: tracks
      },
    });
    expect(tracksSelector(mockedState)).toEqual(tracks);
  });
});

describe('makeSelectFilter', () => {
  const filtersSelector = makeSelectFilters();
  it('should select an empty list of filters when no filters are in the store', () => {
    const filters = fromJS([]);
    const mockedState = fromJS({
      global: {
        foundTracks: [],
        filters: filters
      }
    });
    expect(filtersSelector(mockedState)).toEqual(filters)
  });
});

describe('makeSelectFilteredTracks', () => {
  const filteredTracksSelector = makeSelectFilteredTracks();
  it('should select an empty list of tracks where no tracks or filters are in the store', () => {
    const tracks = fromJS([]);
    const mockedState = fromJS({
      global: {
        foundTracks: tracks,
        filters: []
      },
    });
    expect(filteredTracksSelector(mockedState)).toEqual(tracks);
  });

  it('should select no tracks as those tracks dont contain all filters keywords on title', () => {
    const tracks = [
      {
        id: 1,
        title: "satisfaction",
        artistName: "Rolling Stones"
      },
      {
        id: 2,
        title: "heroes",
        artistName: "David Bowie"
      }
    ];

    let mockedState = fromJS({
      global: {
        foundTracks: false,
        filters: [{
          columnKey: 'title',
          filterTerm: 'something random'
        }]
      }
    });

    mockedState = mockedState.setIn('global', 'foundTracks', tracks);

    expect(filteredTracksSelector(mockedState)).toEqual([]);
  });

  it('should select only 2 of the 3 tracks', () => {
    const expectedTracks = [
      {
        id: 1,
        title: "what is love",
        artistName: "Haddaway"
      },
      {
        id: 2,
        title: "what what what? love",
        artistName: "i dont know"
      }
    ];

    const unwantedTrack = {
      id: 3,
      title: "titre random",
      artistName: "artiste random"
    }



    let mockedState = fromJS({
      global: {
        foundTracks: false,
        filters: [{
          columnKey: 'title',
          filterTerm: 'what love'
        }]
      }
    });
    mockedState =
      mockedState.setIn(['global', 'foundTracks'], expectedTracks.concat(unwantedTrack))
      console.log("ONLY 2 OF 3", mockedState)
    expect(filteredTracksSelector(mockedState)).toEqual(expectedTracks);
  });


  it("should chain filters correctly", () => {
    const expectedTrack = {
      id: 1,
      title: "what is love",
      artistName: "Haddaway"
    };

    const unwantedTracks = [
      {
        id: 2,
        title: "Life",
        artistName: "Haddaway"
      },
      {
        id: 3,
        title: "I'm bored",
        artistName: "Iggy Pop"
      }
    ];

    const filters = fromJS([
      {
        columnKey: 'title',
        filterTerm: 'what love'
      },
      {
        columnKey: 'title',
        filterTerm: 'love what love love'
      },
      {
        columnKey: 'artistName',
        filterTerm: 'haddaway'
      }
    ]);

    let mockedState = fromJS({
      global: {
        foundTracks: false,
        filters: filters
      }
    });
    mockedState = mockedState.setIn(['global', 'foundTracks'], unwantedTracks.concat([expectedTrack]))

    expect(filteredTracksSelector(mockedState)).toEqual([expectedTrack]);

  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.get('location').toJS());
  });
});
