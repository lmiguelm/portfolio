import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10rem;
  width: 10rem;
  border-radius: 1rem;

  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  border: 0.75px solid ${(props) => props.theme.colors.border};

  cursor: pointer;

  transition: filter 0.4s;

  img {
    height: 7rem;
    width: 7rem;
  }

  @media (max-width: 768px) {
    height: 5rem;
    width: 5rem;

    img {
      height: 3.5rem;
      width: 3.5rem;
    }
  }

  &:hover {
    filter: brightness(0.8);
    border: 0.75px solid ${(props) => props.theme.colors.colorPrimary};
  }
`;
