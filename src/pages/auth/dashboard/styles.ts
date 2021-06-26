import styled from 'styled-components';

export const Header = styled.header`
  height: 5rem;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  min-height: calc(100vh - 5rem);
  overflow: hidden;

  background-color: ${(props) => props.theme.colors.backgroundPrimary};

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 2rem;
  }

  div {
    height: 25rem;
    width: 25rem;

    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    border: 1px solid ${(props) => props.theme.colors.backgroundSecondary};
    border-radius: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 2rem;

    cursor: pointer;

    transition: 0.2s;

    @media (max-width: 720px) {
      height: 20rem;
      width: 20rem;
    }

    &:hover {
      border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    }

    h1 {
      span:last-child {
        color: ${(props) => props.theme.colors.colorPrimary};
      }
    }
  }
`;
