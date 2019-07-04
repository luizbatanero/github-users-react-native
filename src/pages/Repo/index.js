import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WebViewProgress from '../../components/WebViewProgress';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { navigation } = this.props;

    return (
      <WebViewProgress source={{ uri: navigation.getParam('repo').html_url }} />
    );
  }
}
