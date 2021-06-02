import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 5rem);
  max-height: calc(100vh - 5rem);
  background: ${(props) => props.theme.colors.backgroundSecondary};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
