import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import TracksDataGrid from 'containers/TracksDataGrid';


function FoundTracksList({loading, error, foundTracks}) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (foundTracks) {
    return <TracksDataGrid tracks={ foundTracks }/>;
  }

  return null;
}

FoundTracksList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  foundTracks: PropTypes.any,
};

export default FoundTracksList;
