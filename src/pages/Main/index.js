import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  SubmitButtonInner,
  List,
  User,
  UserInfo,
  Avatar,
  Name,
  Bio,
  ArrowIcon,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'GitHub Users',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser, loading } = this.state;

    if (!newUser || loading) return;

    this.setState({ loading: true });

    try {
      const response = await api.get(`/users/${newUser}`);

      if (users.find(user => user.name === response.data.name)) {
        throw new Error('User already added to the list.');
      }

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
    }

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading, error } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Add user"
            value={newUser}
            onChangeText={text =>
              this.setState({ newUser: text, error: false })
            }
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
            error={error}
          />
          <SubmitButton>
            <SubmitButtonInner loading={loading} onPress={this.handleAddUser}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#fff" />
              )}
            </SubmitButtonInner>
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item, index }) => (
            <RectButton onPress={() => this.handleNavigate(item)}>
              <User lastItem={index === users.length - 1}>
                <Avatar source={{ uri: item.avatar }} />
                <UserInfo>
                  <Name>{item.name}</Name>
                  {item.bio && <Bio>{item.bio}</Bio>}
                </UserInfo>
                <ArrowIcon name="keyboard-arrow-right" size={24} color="#666" />
              </User>
            </RectButton>
          )}
        />
      </Container>
    );
  }
}
