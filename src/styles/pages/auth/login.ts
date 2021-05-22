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
  height: 90vh;

  min-width: 35vw;

  background-color: #fff;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 3rem;
  margin: 1rem;

  h1 {
    color: #222;
    align-self: center;
    user-select: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    label {
      margin-top: 1rem;
      color: #000;
      cursor: pointer;

      user-select: none;

      input[type='checkbox'] {
        padding: 0rem;
        cursor: pointer;
        height: inherit;
      }
    }

    span {
      display: flex;
      align-items: center;
      color: red;
    }

    span {
      display: none;
    }

    span.message-error {
      display: initial;
      user-select: none;
      margin: -1rem 0 0 0;
      font-size: 0.75rem;
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

      background: #356eca;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }

    a {
      align-self: center;

      display: flex;
      align-items: center;

      font-size: 1rem;
      font-weight: bold;

      color: #356eca;

      user-select: none;
    }
  }
`;
