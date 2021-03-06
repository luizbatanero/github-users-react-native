import { ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: #333;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #444;
  position: relative;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #444;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #eee;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const TrashButton = styled(RectButton)`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  background: #383838;
`;

export const TrashIcon = styled(Icon).attrs({
  size: 20,
  color: '#666',
})``;

export const Loading = styled(ActivityIndicator).attrs({
  color: '#7159c1',
  size: 'large',
})`
  margin-top: 20px;
`;

export const LoadingMore = styled(ActivityIndicator).attrs({
  color: '#7159c1',
})`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled(RectButton)`
  background: #444;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #fff;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #888;
  margin-top: 2px;
`;
