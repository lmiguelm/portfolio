import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: #000;
  height: calc(100vh - 5rem);
  overflow-y: scroll;
`;

export const FirstSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10rem;

  padding: 5rem;

  @media (max-width: 900px) {
    gap: 3rem;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  h1 {
    font-size: 4rem;
    max-width: 80%;
    line-height: 4rem;
    margin-bottom: 1.5rem;
    color: #fff;
  }

  p {
    max-width: 75%;
    line-height: 2rem;
    text-align: justify;
    text-indent: 1.5em;
  }

  button {
    margin-top: 3rem;
    align-self: center;
    margin-right: 20%;
  }

  @media (max-width: 720px) {
    h1 {
      max-width: 100%;
    }
    p {
      max-width: 100%;
    }
    button {
      margin-top: 2rem;
      align-self: center;
      margin-right: 0;
    }
  }
`;

export const AnimationContainer = styled(motion.div)`
  flex: 1;

  width: 35rem;
  height: 35rem;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const CardContainer = styled(motion.section)`
  border: 1px solid #356eca;
  background: #111;
  margin: 0rem 2rem;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;

  padding: 4rem;

  h1 {
    font-size: 3rem;
    max-width: 50%;
    text-align: center;
  }

  span {
    font-size: 1rem;
    max-width: 50%;
    text-align: center;
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

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 1rem;

    @media (max-width: 720px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  &:last-child {
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  @media (max-width: 1366px) {
    flex-direction: column;

    .info {
      margin-bottom: 3rem;
      flex-direction: column;
    }

    &:last-child {
      flex-direction: column-reverse;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;

    .info {
      margin-bottom: 3rem;
      flex-direction: column;
    }

    &:last-child {
      flex-direction: column-reverse;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;

    .info {
      margin-bottom: 3rem;
      flex-direction: column;
      align-items: flex-start;
      text-align: center;

      h1 {
        max-width: 100%;
      }
    }

    &:last-child {
      flex-direction: column-reverse;
    }

    span {
      max-width: 100%;
    }
  }
`;
