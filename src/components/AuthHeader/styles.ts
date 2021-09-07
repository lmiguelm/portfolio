import styled from 'styled-components';

export const Container = styled.ul`
  height: 5rem;
  width: 100%;

  background: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.textPrimary};

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: 0.4s;

  list-style: none;

  user-select: none;

  padding: 0rem 3rem;

  li {
    button {
      display: flex;
      justify-content: center;
      align-items: center;

      border: none;
      border-radius: 0.5rem;
      outline: none;

      height: 2.5rem;
      width: 2.5rem;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.7);
      }

      &#add {
        width: 15rem;
        background: ${(props) => props.theme.colors.colorPrimary};
        font-weight: bold;
        text-transform: uppercase;
        color: ${(props) => props.theme.colors.textSecondary};
      }
    }
  }
`;
