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

    input {
      height: 5rem;
      outline: none;

      padding: 2rem 1rem;

      border: none;
      border-bottom: 1px solid #000;
      color: #333;

      font-size: 1.25rem;

      transition: 0.4s;

      &::placeholder {
        transition: 0.4s;
      }

      &:focus {
        border-bottom: 1px solid #356eca;
        color: #356eca;

        &::placeholder {
          transform: scale(0.9);
        }
      }

      &.error {
        border-bottom: 1px solid red;
        color: red;
      }
    }

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

    button {
      margin: 2rem 0;

      height: 5rem;
      outline: none;

      border: 1px solid #ddd;
      border-radius: 1rem;

      color: #000;
      background-color: #fff;

      font-size: 1.25rem;
      text-transform: uppercase;
      font-weight: bold;

      cursor: not-allowed;

      transition: 0.2s;

      &.active {
        border: 1px solid #356eca;
        color: #356eca;
        cursor: pointer;
      }

      &.active:hover {
        color: #fff;
        background-color: #356eca;
      }
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

  a {
    align-self: center;

    display: flex;
    align-items: center;

    font-size: 1rem;
    font-weight: bold;

    color: #356eca;

    user-select: none;
  }
`;
