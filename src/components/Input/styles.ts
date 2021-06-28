import styled from 'styled-components';

export const Container = styled.input`
  height: 5rem;
  outline: none;

  padding: 2rem 2rem;

  border: none;
  border-bottom: 1px solid #000;
  color: ${(props) => props.theme.colors.backgroundSecondary};

  font-size: 1.25rem;

  transition: 0.2s;

  &::placeholder {
    transform: scale(1.1);
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => props.theme.colors.colorPrimary};
  }
`;
