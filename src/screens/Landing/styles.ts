import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';

import toggleThemeAnimation from '../../../public/lottie/toggleTheme.json';
import animation from '../../../public/lottie/59446-black-guy-animation.json';

export const Container = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundPrimary};
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  padding: 0 5rem;

  &::after {
    position: absolute;
    bottom: 0;
    content: '';
    width: 100%;
    height: 0.7px;
    background-color: ${(props) => props.theme.colors.border};
  }
`;

export const Content = styled.main`
  height: 90%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Footer = styled.footer`
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.25rem;
  padding-bottom: 2rem;
`;

export const AnimationWrapper = styled(motion.div).attrs({
  initial: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: [0, 1.25, 1],
  },
  transition: {
    duration: 1.25,
    bounce: 1,
  },
})`
  width: 50rem;
  height: 50rem;

  margin-top: -12rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Views = styled(motion.span).attrs({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  transition: {
    duration: 1,
  },
})`
  font-size: 0.8rem;

  strong {
    color: ${(props) => props.theme.colors.colorSecondary};
  }
`;

export const ToggleThemeContainer = styled.button`
  cursor: pointer;
  user-select: none;
  max-width: 5rem;
  max-height: 5rem;
  background-color: transparent;
  border: none;
`;

export const ToggleTheme = styled(Lottie).attrs({
  options: {
    animationData: toggleThemeAnimation,
    autoplay: false,
    loop: false,
  },
  speed: 1,
})``;

export const Animation = styled(Lottie).attrs({
  options: {
    animationData: animation,
    autoplay: false,
    loop: false,
  },
  speed: 1,
})``;
