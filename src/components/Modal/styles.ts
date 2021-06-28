import styled from 'styled-components';

export const Container = styled.form`
  z-index: 99999;

  position: fixed;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  height: 90vh;
  width: 50rem;
  overflow-y: scroll;

  background: ${(props) => props.theme.colors.textSecondary};

  display: flex;
  flex-direction: column;

  padding: 3rem;

  svg.close {
    position: absolute;
    right: 0;
    margin-right: 3rem;
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }
`;
