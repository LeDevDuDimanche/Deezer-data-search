/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFilteredTracks, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import FoundTracksList from 'components/FoundTracksList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadTracks } from '../App/actions';
import { changeSearchQuery } from './actions';
import { makeSelectSearchQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {

    if (this.props.searchQuery && this.props.searchQuery.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, foundTracks } = this.props;
    const foundTracksListProps = {
      loading,
      error,
      foundTracks,
    };

    return (
      <article>
        <Helmet>
          <title>Deezer api explorer</title>
          <meta name="description" content="Search the deezer api" />
        </Helmet>
        <div>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <Input
                  id="username"
                  type="text"
                  placeholder="i need a dollar"
                  value={this.props.searchQuery}
                  onChange={this.props.onChangeSearchInput}
                />
              </label>
            </Form>
            <FoundTracksList {...foundTracksListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  searchQuery: PropTypes.string,
  onChangeSearchedTrack: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearchInput: (evt) => dispatch(changeSearchQuery(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadTracks());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  foundTracks: makeSelectFilteredTracks(),
  searchQuery: makeSelectSearchQuery(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withReducer = injectReducer({ key: 'home', reducer });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
