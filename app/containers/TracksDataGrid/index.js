const ReactDataGrid = require('react-data-grid');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
const React = require('react');

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { SORT_TRACKS, LOAD_NEXT_PAGE, FILTER_CLEAR, FILTER_CHANGE } from 'containers/App/constants';
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
        locked: true,
        resizable: true,
      },
      {
        key: 'title',
        name: 'Title',
        width: 350,
        sortable: true,
        filterable: true,
        resizable: true,
      },
      {
        key: 'artistName',
        name: 'artist name',
        width: 300,
        sortable: true,
        filterable: true,
        resizable: true,
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
    const { tracks, handleGridSort, handleFilterChange, handleFilterClear } = this.props
    console.log("TRACKS IN RENDER OF TRACKS DATA GRID", tracks)
    const self = this;
    const rowsCount = tracks.length
    return  (
      <ReactDataGrid
        onGridSort={handleGridSort}
        columns={this._columns}
        rowGetter={this.createRowGetter(tracks)}
        rowsCount={rowsCount}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={(filter) => handleFilterChange(filter.filterTerm, filter.column.key) }
        onClearFilters={ handleFilterClear }
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
    handleFilterChange: (filterTerm, columnKey) => dispatch({
        type: FILTER_CHANGE,
        filterTerm,
        columnKey,
    }),
    handleFilterClear: () => dispatch({type: FILTER_CLEAR}),
  }
}

const withSaga = injectSaga({ key: 'dataGridSaga', saga });
const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(TrackList);
