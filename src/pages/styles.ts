import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundPrimary};
  height: calc(100vh - 5rem);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10rem;

  overflow: hidden;

  span.view {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    font-size: 0.8rem;
    position: fixed;
    bottom: 0;
    margin: 2rem;
    margin-bottom: 6rem;

    strong {
      color: ${(props) => props.theme.colors.colorSecondary};
    }
  }

  @media (max-width: 900px) {
    gap: 3rem;
    padding: 5rem;
  }
`;

export const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;

  min-width: 50%;

  @media (max-width: 900px) {
    min-width: auto;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  h1 {
    line-height: 3.5rem;
    font-size: 3.5rem;
    color: ${(props) => props.theme.colors.textPrimary};
    min-width: 300px;

    span {
      color: ${(props) => props.theme.colors.colorSecondary};
    }

    @media (max-width: 900px) {
      font-size: 2rem;
    }
  }
  h2 {
    font-weight: 400;

    @media (max-width: 900px) {
      font-size: 1.25rem;
    }
  }
`;

export const AnimationContainer = styled(motion.div)`
  margin-top: -10rem;
  width: 50rem;
  height: 50rem;

  @media (max-width: 720px) {
    display: none;
  }
`;

export const IconsContainer = styled(motion.ul)`
  list-style: none;
  gap: 0.5rem;

  display: flex;

  margin-top: 1rem;
`;

export const Icon = styled(motion.li)`
  cursor: pointer;
  color: ${(props) => props.theme.colors.textPrimary};

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
