import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  background: #333;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #444;
  padding: 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 50px;
  background: #444;
  color: #fff;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 0 15px;
  border-width: 1px;
  border-color: ${props => (props.error ? '#d45353' : '#444')};
`;

export const SubmitButton = styled.View`
  justify-content: center;
  align-items: stretch;
  background: #7159c1;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const SubmitButtonInner = styled(RectButton)`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const User = styled.View`
  padding: 20px;
  border-bottom-width: ${props => (props.lastItem ? '0' : '1px')};
  border-color: #444;
  flex-direction: row;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-shrink: 1;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #444;
  margin-right: 12px;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #eee;
  font-weight: bold;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  padding-right: 20px;
`;

export const ArrowIcon = styled(Icon)`
  margin-left: auto;
`;
