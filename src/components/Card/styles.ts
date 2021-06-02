import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 5.5rem;
  width: 5.5rem;
  border-radius: 1rem;

  background-color: ${(props) => props.theme.colors.backgroundSecondary};

  cursor: pointer;

  transition: filter 0.2s;

  img {
    height: 3.5rem;
    width: 3.5rem;
  }

  &:hover {
    filter: brightness(0.9);
    border: 2px solid ${(props) => props.theme.colors.colorPrimary};
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

  min-height: 40rem;
  max-height: 43rem;
  width: 35rem;

  background: ${(props) => props.theme.colors.backgroundSecondary};
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

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 13rem;
      width: 13rem;
      border-radius: 1rem;

      background: ${(props) => props.theme.colors.backgroundPrimary};

      img {
        height: 10rem;
        width: 10rem;
      }
    }

    h2 {
      color: ${(props) => props.theme.colors.textSecondary};
    }

    p {
      color: ${(props) => props.theme.colors.textSecondary};
      max-width: 75%;
    }

    a {
      color: ${(props) => props.theme.colors.textSecondary};
      text-align: center;
      margin-top: 1rem;
    }
  }

  @media (max-width: 720px) {
    width: 90%;
    height: 30rem;
  }
`;
