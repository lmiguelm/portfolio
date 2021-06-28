import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundPrimary};
  height: calc(100vh - 5rem);
  overflow-y: scroll;
`;

export const FirstSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  min-height: calc(100vh - 5rem);

  background: ${(props) => props.theme.colors.backgroundPrimary};
  background-image: url('./wallpapers/wallpaper-about.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top 30%;
  background-attachment: fixed;

  div {
    flex: 1;
  }

  @media (max-width: 720px) {
    align-items: flex-start;
    background-image: none;
    div:first-child {
      display: none;
    }
  }
`;

export const SecondSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  min-height: calc(100vh - 5rem);

  transition: ease-in-out 0.3s;

  opacity: 0;

  &.active {
    opacity: 1;
  }

  @media (max-width: 720px) {
    justify-content: flex-start;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2rem;

  h1 {
    font-size: 3.5rem;
    max-width: 100%;
    line-height: 4rem;
    margin-bottom: 1.5rem;
    color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textSecondary : '#fff')};

    span {
      color: ${(props) => props.theme.colors.colorSecondary};
    }
  }

  p {
    max-width: 75%;
    line-height: 2rem;
    text-align: justify;
    text-indent: 1.5em;
    color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textSecondary : '#ddd')};
  }

  a {
    margin-top: 3rem;
    margin-right: 20%;
    align-self: center;
    text-decoration: none;
  }

  @media (max-width: 1366px) {
    h1 {
      max-width: 100%;
    }

    p {
      max-width: 100%;
    }

    a {
      margin-top: 2rem;
      align-self: center;
      margin-right: 0;
    }
  }

  @media (max-width: 720px) {
    h1 {
      max-width: 100%;
      color: ${(props) => props.theme.colors.textPrimary};
    }
    p {
      max-width: 100%;
      color: ${(props) => props.theme.colors.textSecondary};
    }
    button {
      margin-top: 2rem;
      align-self: center;
      margin-right: 0;
    }
  }
`;

export const CardContainer = styled(motion.section)`
  border: 1px solid ${(props) => props.theme.colors.colorPrimary};
  background: ${(props) => props.theme.colors.backgroundPrimary};
  border-radius: 0.5rem;

  margin: 1rem 2rem;

  &:last-child {
    margin-top: 1rem;
  }

  display: flex;
  align-items: center;

  padding: 4rem;

  h1 {
    font-size: 3rem;
    max-width: 50%;
    text-align: center;

    span {
      font-size: 3rem;
      max-width: 50%;
      text-align: center;

      &:last-child {
        color: ${(props) => props.theme.colors.colorSecondary};
      }
    }

    @media (max-width: 720px) {
      h1,
      span {
        font-size: 2.25rem;
      }
    }
  }

  span {
    font-size: 1rem;
    max-width: 50%;
    text-align: justify;
    text-indent: 1.5em;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card {
    flex: 2;
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-columns: repeat(auto-fit, 5.5rem);
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
  }

  &:last-child {
    margin-top: 2rem;
  }

  @media (max-width: 1366px) {
    flex-direction: column;

    span {
      max-width: 100%;
    }

    .info {
      margin-bottom: 3rem;
      flex-direction: column;
    }

    &:last-child {
      flex-direction: column-reverse;
    }

    h1,
    span {
      max-width: 100%;
    }
  }
`;
