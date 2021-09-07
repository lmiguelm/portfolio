import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundPrimary};
  height: 100vh;
  overflow-y: scroll;

  display: flex;
  justify-content: center;

  padding: 2rem 20rem;

  @media (max-width: 1600px) {
    padding: 2rem 8rem;
  }

  @media (max-width: 900px) {
    padding: 2rem 5rem;
  }

  @media (max-width: 720px) {
    padding: 2rem;
  }
`;

export const Page = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  width: 793px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Content = styled(motion.section)`
  padding: 2rem 4rem;
  margin: 1rem 0rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};

  @media (max-width: 720px) {
    padding: 2rem 1rem;
  }

  header {
    margin-bottom: 5rem;

    a {
      transition: 0.2s;

      &:hover {
        filter: brightness(0.7);
      }
    }

    h1 {
      font-size: 3rem;
      text-align: center;
      margin-bottom: 1.25rem;

      span {
        color: ${(props) => props.theme.colors.colorSecondary};
      }
    }

    div.link-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      margin: 2rem 0rem;
    }

    @media (max-width: 720px) {
      h1 {
        font-size: 2rem;
      }
    }

    p {
      line-height: 2rem;
      text-align: justify;
      text-indent: 1.5em;
    }
  }

  main {
    h2 {
      margin-bottom: 1rem;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.colorSecondary};
    }

    p {
      line-height: 2rem;
      text-align: justify;
      text-indent: 1.5em;
    }

    div {
      margin-bottom: 5rem;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      height: 60%;
      width: 90%;

      max-height: 600px;
    }
  }
`;
