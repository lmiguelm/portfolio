import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.nav)`
  height: 5rem;
  width: 100%;

  z-index: 999999;

  position: fixed;

  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-bottom: 0.75px solid ${(props) => props.theme.colors.border};

  color: ${(props) => props.theme.colors.textPrimary};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.4s;

  gap: 5rem;

  @media (max-width: 720px) {
    gap: 2rem;
  }

  list-style: none;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Link = styled(motion.a)`
  color: ${(props) => props.theme.colors.textPrimary};

  cursor: pointer;
  font-size: 1.25rem;

  transition: filter 0.4s;

  text-decoration: none;

  &:hover {
    filter: brightness(0.8);
    color: ${(props) => props.theme.colors.colorSecondary};
  }
`;
