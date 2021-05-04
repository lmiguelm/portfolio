import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 5.5rem;
  width: 5.5rem;
  border-radius: 1rem;

  background: rgba(100, 100, 100, 0.4);

  cursor: pointer;

  transition: filter 0.2s;

  img {
    height: 3.5rem;
    width: 3.5rem;
  }

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 1200px) {
    height: 4rem;
    width: 4rem;

    img {
      height: 2.5rem;
      width: 2.5rem;
    }
  }

  @media (max-width: 900px) {
    height: 5rem;
    width: 5rem;
  }

  @media (max-width: 720px) {
    height: 3rem;
    width: 3rem;

    img {
      height: 2rem;
      width: 2rem;
    }
  }
`;

export const Modal = styled(motion.div)`
  z-index: 99999;

  position: fixed;
  margin: auto;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  height: 40rem;
  width: 35rem;

  background: rgba(100, 100, 100, 1);
  border-radius: 1rem;
  opacity: 1 !important;

  padding: 2rem;

  svg {
    position: absolute;
    right: 0;
    margin-right: 1rem;
    cursor: pointer;
    transition: filter 0.2s;
    background: red;

    &:hover {
      filter: brightness(0.9);
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 2rem;

    height: 100%;

    img {
      height: 10rem;
      width: 10rem;
    }

    h2 {
      color: #000;
    }

    p {
      color: #000;
      max-width: 75%;
    }

    a {
      color: #000;
      text-align: center;
      margin-top: 1rem;
    }
  }

  @media (max-width: 720px) {
    width: 90%;
    height: 30rem;
  }
`;
