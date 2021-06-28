import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 5rem);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: ${(props) => props.theme.colors.backgroundPrimary};
`;
