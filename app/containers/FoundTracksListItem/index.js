/**
 * FoundTracksListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import { makeSelectSearchedTrack } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';


/*album: Object { id: 54302092, title: "Good Things", cover: "https://api.deezer.com/album/54302092/image", … }
​​
artist: Object { id: 10183, name: "Aloe Blacc", link: "https://www.deezer.com/artist/10183", … }
​​
duration: 243
​​
explicit_lyrics: false
​​
id: 445997982
​​
link: "https://www.deezer.com/track/445997982"
​​
preview: "https://cdns-preview-2.dzcdn.net/stream/c-21415d695fa50f209d4e204c52187903-3.mp3"
​​
rank: 775041
​​
readable: true
​​
title: "I Need A Dollar"
​​
title_short: "I Need A Dollar"
​​
title_version: ""
​​
type: "track"*/

export class FoundTracksListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;

    // Put together the content of the repository
    const content = (
      <Wrapper>
        {item.title}
        {false && <IssueLink href={`${item.html_url}/issues`} target="_blank">
          <IssueIcon />
          <FormattedNumber value={item.open_issues_count} />
        </IssueLink>}
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
    );
  }
}

FoundTracksListItem.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.string,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectSearchedTrack(),
}))(FoundTracksListItem);
