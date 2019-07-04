import styled from 'styled-components/native';

export const ProgressBar = styled.View`
  height: 4px;
  background: #4f3998;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: ${props => `${props.percent * 100}%`};
`;
