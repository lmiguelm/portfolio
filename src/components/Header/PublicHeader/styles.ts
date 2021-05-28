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

  transition: 0.4s;

  gap: 5rem;

  @media (max-width: 720px) {
    gap: 2rem;
  }

  list-style: none;

  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Possível implementação no futuro */

  &.scrolling {
    background: #222;
  }
`;

export const Link = styled(motion.li)`
  cursor: pointer;
  font-size: 1.25rem;

  transition: 0.4s;

  &:hover,
  &.active {
    color: #fff;
    font-size: 1.5rem;
    border-bottom: 2px solid #356eca;
    padding: 0.5rem;

    @media (max-width: 720px) {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 720px) {
    font-size: 1rem;
  }
`;
