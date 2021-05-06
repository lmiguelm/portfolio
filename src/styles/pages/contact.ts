import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  height: calc(100vh - 5rem);
  background: #000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AnimationContainer = styled(motion.div)`
  flex: 1.5;
  width: 35rem;
  height: 35rem;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const Section = styled(motion.section)`
  flex: 1;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3rem;
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
  color: #fff;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
