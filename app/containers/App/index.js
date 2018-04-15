/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectScript } from '../../utils/scriptInjector';
import { deezerScriptLoaded } from './actions';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { onDeezerScriptLoaded } = this.props;

    injectScript('https://e-cdns-files.dzcdn.net/js/min/dz.js')
      .then(onDeezerScriptLoaded);
  }

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <div id="dz-root"></div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </AppWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDeezerScriptLoaded: () => dispatch(deezerScriptLoaded())
});

export default connect(null, mapDispatchToProps)(App);
