import styled from 'styled-components';

export const Container = styled.button`
  border: none;

  height: 3rem;
  width: 3rem;
  border-radius: 1rem;

  background: ${(props) => props.theme.colors.colorPrimary};
  z-index: 9999;

  position: fixed;

  bottom: 0;
  right: 0;
  margin: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    filter: brightness(0.7);
  }

  svg {
    transition: transform 0.4s;

    &.rotate {
      transform: rotate(180deg);
    }
  }
`;
