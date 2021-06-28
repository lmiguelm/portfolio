import styled from 'styled-components';

export const Container = styled.button`
  height: 4rem;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  border: none;
  outline: none;

  border: 3px solid ${(props) => props.theme.colors.colorPrimary};
  border-radius: 0.5rem;
  background: ${(props) => props.theme.colors.backgroundPrimary};

  color: ${(props) => props.theme.colors.textSecondary};

  font-size: 1.5rem;

  transition: 0.4s;

  animation: border 0.5s infinite;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  @keyframes border {
    0% {
      border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    }
    100% {
      border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    }
  }

  &:hover {
    background: ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textSecondary : '#fff')};
    filter: brightness(0.9);
  }
`;
