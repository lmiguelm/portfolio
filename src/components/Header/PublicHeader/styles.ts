import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.nav)`
  height: 5rem;
  width: 100%;

  background: ${(props) => props.theme.colors.backgroundPrimary};
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

export const Link = styled(motion.label)`
  cursor: pointer;
  font-size: 1.25rem;

  transition: 0.4s;

  &.active,
  &:hover {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 1.5rem;
    border-bottom: 2px solid ${(props) => props.theme.colors.colorPrimary};
    padding: 0.5rem;
  }
`;
