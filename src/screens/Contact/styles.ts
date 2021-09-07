import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  height: 100vh;
  background: ${(props) => props.theme.colors.backgroundSecondary};

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;

export const AnimationContainer = styled(motion.div)`
  flex: 1.5;
  width: 35rem;
  height: 35rem;

  opacity: 0;
  transform: translateY(50%);

  transition: transform 0.6s;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 720px) {
    display: none;
  }
`;

export const Section = styled(motion.section)`
  flex: 1;
  display: flex;
  flex-direction: column;

  opacity: 0;
  transform: translateY(50%);

  transition: transform 0.6s;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
    font-size: 4rem;

    span {
      color: ${(props) => props.theme.colors.colorSecondary};
    }
  }

  p {
    max-width: 75%;
    line-height: 2rem;
    text-align: justify;
    text-indent: 1.5em;
  }
  strong {
    margin-top: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1rem;
  }
  a {
    filter: brightness(0.6);
  }

  @media (max-width: 720px) {
    justify-content: center;
    align-items: center;
  }
`;

export const IconsContainer = styled(motion.ul)`
  list-style: none;
  gap: 0.5rem;

  display: flex;

  margin-top: 0.5rem;
`;

export const Icon = styled(motion.li)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.textSecondary};

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
