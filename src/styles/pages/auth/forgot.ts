import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};

  display: flex;
  justify-content: center;
  align-items: center;

  overflow-y: hidden;
`;

export const CardContainer = styled.div`
  height: 90vh;

  width: 35vw;

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

  h1 {
    color: ${(props) => props.theme.colors.backgroundSecondary};
    align-self: center;
    user-select: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    span {
      display: flex;
      align-items: center;
      color: red;
      display: none;
    }

    span.message-error {
      display: initial;
      user-select: none;
      margin: -1rem 0 0 0;
      font-size: 0.75rem;
    }
  }

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
`;
