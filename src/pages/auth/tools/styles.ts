import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 5rem);
  overflow-y: scroll;

  background-color: ${(props) => props.theme.colors.backgroundPrimary};

  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  align-items: center;
  justify-items: center;
  padding: 2rem;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1220px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (max-width: 500px) {
    padding: 2rem 0rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  width: 45vh;

  gap: 4rem;
  padding: 2rem;

  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 1rem;

  user-select: none;

  transition: 0.2s;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
  }

  img {
    height: 10rem;
    width: 10rem;
    align-self: center;
  }

  div {
    h3 {
      text-align: center;
      margin-bottom: 1rem;
    }

    p {
      line-height: 1.5rem;
      text-align: justify;
      font-size: 0.857rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    button {
      width: 50%;
      height: 4rem;

      border: none;
      border-radius: 0.5rem;
      outline: none;

      background: ${(props) => props.theme.colors.textSecondary};
      font-weight: 600;
      text-transform: uppercase;
      font-size: 1rem;

      transition: filter 0.4s;

      &:hover {
        filter: brightness(0.9);

        &:first-child {
          background: yellow;
        }
        &:last-child {
          color: ${(props) => props.theme.colors.textSecondary};
          background: red;
        }
      }
    }
  }
`;
