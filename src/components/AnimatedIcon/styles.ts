import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.li)`
  cursor: pointer;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.7);
  }
`;
