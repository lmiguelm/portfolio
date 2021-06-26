import styled from 'styled-components';

export const Container = styled.textarea`
  height: 5rem;
  outline: none;

  padding: 1rem;

  border: none;
  border: 1px solid #000;
  color: ${(props) => props.theme.colors.backgroundSecondary};

  font-size: 1.25rem;

  transition: 0.4s;

  resize: none;
  height: 10rem;
  width: 100%;

  &::placeholder {
    transition: 0.4s;
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => props.theme.colors.colorPrimary};

    &::placeholder {
      transform: scale(0.9);
    }
  }

  &.error {
    border-bottom: 1px solid red;
    color: red;
  }
`;
