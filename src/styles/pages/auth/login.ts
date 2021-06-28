import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow-y: hidden;
`;

export const CardContainer = styled.div`
  height: 50vh;
  width: 25vw;

  background-color: ${(props) => props.theme.colors.textSecondary};
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 3rem;
  margin: 1rem;

  @media (max-width: 900px) {
    width: 95%;
  }

  h2 {
    color: ${(props) => props.theme.colors.backgroundSecondary};
    align-self: center;
    text-align: center;
  }

  button {
    align-self: center;
    background: #fff;

    span {
      color: #111;
    }

    &:hover {
      background: #fff;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button.back {
      width: 3rem;
      height: 3rem;

      border: none;
      border-radius: 1rem;

      background: ${(props) => props.theme.colors.colorPrimary};

      display: flex;
      align-items: center;
      justify-content: center;

      transition: 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
