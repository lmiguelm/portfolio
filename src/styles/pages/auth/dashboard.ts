import styled from 'styled-components';

export const Header = styled.header`
  height: 5rem;
  background-color: #222;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  min-height: calc(100vh - 5rem);
  overflow: hidden;

  background-color: #000;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 2rem;
  }

  div {
    height: 25rem;
    width: 25rem;

    background-color: #222;
    border-radius: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap: 2rem;

    cursor: pointer;

    transition: 0.2s;

    @media (max-width: 720px) {
      height: 20rem;
      width: 20rem;
    }

    &:hover {
      transform: scale(1.1);
      border: 1px solid #356eca;
    }

    h1 {
      span:last-child {
        color: #356eca;
      }
    }
  }
`;
