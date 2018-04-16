const ReactDataGrid = require('react-data-grid');
const React = require('react');

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {SORT_TRACKS, LOAD_NEXT_PAGE } from 'containers/App/constants';
import saga from './saga'
import { connect } from 'react-redux';
import { compose } from 'redux';

class TrackList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.rowOffsetHeight = 0;

    this._columns = [
      {
        key: 'id',
        name: 'ID',
        width: 100,
        locked: true
      },
      {
        key: 'title',
        name: 'Title',
        width: 350,
        sortable: true,
        filterable: true
      },
      {
        key: 'artistName',
        name: 'artist name',
        width: 300,
        sortable: true,
        filterable: true
      }
    ];
  }

  createRowGetter(rows) {
    return (i) => rows[i]
  }

  onScroll(rowsCount, trackList) {
    return (e) => {
      let { fetchNextPage } = trackList.props;

      let halfWayVScroll = parseInt((rowsCount * trackList.rowOffsetHeight) / 2 - 50);
      let currentVScroll = e.scrollTop;
      if (currentVScroll >= halfWayVScroll) {
          fetchNextPage();
      }
    }
  }

  render() {
    let {tracks, handleGridSort} = this.props
    const self = this;
    const rowsCount = tracks.length
    return  (
      <ReactDataGrid
        onGridSort={handleGridSort}
        columns={this._columns}
        rowGetter={this.createRowGetter(tracks)}
        rowsCount={rowsCount}
        minHeight={500}
        ref={(element) => {
          if (element == null) {
            return
          }

          const base = element.base;
          base.onScroll = self.onScroll(rowsCount, self);
          self.rowOffsetHeight = element.getRowOffsetHeight();
        }}
      />);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleGridSort: (sortColumn, sortDirection) => dispatch({
      type: SORT_TRACKS,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    }),
    fetchNextPage: () => {
      dispatch({ type: LOAD_NEXT_PAGE })
    },
  }
}

const withSaga = injectSaga({ key: 'dataGridSaga', saga });
const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(TrackList);
