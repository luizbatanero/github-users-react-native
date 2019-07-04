import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

import { ProgressBar } from './styles';

export default class WebViewProgress extends Component {
  static propTypes = {
    source: PropTypes.shape({
      ui: PropTypes.string,
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
    const { source } = this.props;
    const { loading, loadingPercent } = this.state;

    console.tron.log(source);

    return (
      <>
        {loading && <ProgressBar percent={loadingPercent} />}
        <WebView
          source={source}
          style={{ flex: 1 }}
          onLoadStart={this.handleLoadStart}
          onLoadProgress={this.handleLoadProgress}
          onLoadEnd={this.handleLoadEnd}
        />
      </>
    );
  }
}
