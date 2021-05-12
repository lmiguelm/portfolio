import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Container = styled(motion.div)`
  background: #111;
  height: calc(100vh - 5rem);
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
  background: #222;

  width: 100%;
`;

export const Content = styled(motion.section)`
  padding: 2rem 4rem;
  margin: 1rem 0rem;
  background: #222;

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
        color: #9290c9;
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
  }

  main {
    h2 {
      margin-bottom: 1rem;
      text-transform: uppercase;
      color: #9290c9;
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
    }
  }
`;
