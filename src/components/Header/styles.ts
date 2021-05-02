import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.ul)`
  height: 5rem;
  width: 100%;

  background: #000;
  color: #ddd;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5rem;

  list-style: none;
`;

export const Link = styled(motion.li)`
  cursor: pointer;
  font-size: 1.25rem;

  transition: 0.4s;

  &:hover,
  &.active {
    color: #fff;
    font-size: 1.5rem;
    border-bottom: 1px solid red;
    padding: 0.5rem;
  }
`;
