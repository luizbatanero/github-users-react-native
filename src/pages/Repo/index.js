import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import { ProgressBar } from './styles';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    loadingPercent: 0,
    loading: false,
  };

  handleLoadStart = () => {
    this.setState({ loading: true });
  };

  handleLoadProgress = e => {
    this.setState({ loadingPercent: e.nativeEvent.progress });
  };

  handleLoadEnd = () => {
    this.setState({ loading: false });
  };

  render() {
    const { navigation } = this.props;
    const { loading, loadingPercent } = this.state;

    return (
      <>
        {loading && <ProgressBar percent={loadingPercent} />}
        <WebView
          source={{ uri: navigation.getParam('repo').html_url }}
          style={{ flex: 1 }}
          onLoadStart={this.handleLoadStart}
          onLoadProgress={this.handleLoadProgress}
          onLoadEnd={this.handleLoadEnd}
        />
      </>
    );
  }
}
