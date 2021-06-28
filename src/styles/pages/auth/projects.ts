import styled from 'styled-components';

export const Container = styled.div`
  height: calc(100vh - 5rem);
  overflow-y: scroll;
  margin: 0 auto;

  background-color: ${(props) => props.theme.colors.backgroundPrimary};

  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    margin: 1rem;
  }

  main.grid {
    flex: 1;
    height: inherit;

    display: grid;
    width: 100%;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, 25rem);
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  width: 25rem;

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

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
      height: 10rem;
      width: 10rem;
      align-self: center;
    }

    div {
      position: absolute;
      bottom: 0;

      margin-left: 160px;
      margin-bottom: -10px;

      background-color: ${(props) => props.theme.colors.colorPrimary};

      width: 3.25rem;
      height: 3.25rem;
      border-radius: 1rem;

      display: flex;
      justify-content: center;
      align-items: center;

      cursor: pointer;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  main.card {
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
      padding: 0 0.5rem;
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
