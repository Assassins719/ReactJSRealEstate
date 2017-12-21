import styled from 'styled-components';

export const Block = styled.div`
  background: ${props => (props.invert ? props.theme.colors.purple : 'white')};
  text-align: ${props => (props.center ? 'center' : 'none')};
  padding: 40px 30px 30px;
  margin-bottom: ${props => (props.headerForAnotherBlock ? 0 : '20px')};
`;

export const Page = styled.div`
  min-height: 100vh;
`;

