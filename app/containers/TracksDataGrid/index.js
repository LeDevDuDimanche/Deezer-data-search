const ReactDataGrid = require('react-data-grid');
const React = require('react');

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {SORT_TRACKS} from 'containers/App/constants'
import saga from './saga'
import { connect } from 'react-redux';
import { compose } from 'redux';

class TrackList extends React.Component {
  constructor(props, context) {
    super(props, context);
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
        sortable: true
      }
    ];
  }

  rowGetter = (rows) => (i) => {
    return rows[i];
  };

  render() {
    let {tracks, handleGridSort} = this.props

    return  (
      <ReactDataGrid
        onGridSort={handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter(tracks)}
        rowsCount={tracks.length}
        minHeight={500} />);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleGridSort: (sortColumn, sortDirection) => dispatch({
      type: SORT_TRACKS,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    })
  }
}


const withSaga = injectSaga({ key: 'dataGridSaga', saga });
const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withSaga,
  withConnect,
)(TrackList);
