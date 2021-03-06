import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  TrashButton,
  TrashIcon,
  Loading,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingMore,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    loadingMore: false,
    page: 1,
    hasMore: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.loadStars();
  }

  loadStars = async (page = 1) => {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');

    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${page}`
      );

      this.setState({
        stars: [...stars, ...response.data],
        page,
        loading: false,
        loadingMore: false,
        hasMore:
          response.headers.link && response.headers.link.includes('next'),
      });
    } catch (err) {
      this.setState({
        loading: false,
        loadingMore: false,
      });
    }
  };

  loadMore = () => {
    const { page, hasMore } = this.state;

    if (hasMore) {
      this.setState({ loadingMore: true });
      this.loadStars(page + 1);
    }
  };

  refreshList = async () => {
    await this.setState({ loading: true, stars: [] });
    this.loadStars();
  };

  handleNavigate = repo => {
    const { navigation } = this.props;

    navigation.navigate('Repo', { repo });
  };

  handleRemove = () => {
    const { navigation } = this.props;

    navigation.getParam('removeUser')();
    navigation.navigate('Main');
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading, loadingMore } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          {user.bio && <Bio>{user.bio}</Bio>}
          <TrashButton onPress={this.handleRemove}>
            <TrashIcon name="trash-o" />
          </TrashButton>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={loading}
          />
        )}
        {loadingMore && <LoadingMore />}
      </Container>
    );
  }
}
