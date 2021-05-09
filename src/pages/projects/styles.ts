import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: #111;
  height: calc(100vh - 5rem);
  overflow-y: scroll;

  display: flex;
  justify-content: center;

  padding: 2rem 20rem;

  @media (max-width: 1600px) {
    padding: 2rem 8rem;
  }

  @media (max-width: 900px) {
    padding: 2rem 5rem;
  }

  @media (max-width: 720px) {
    padding: 2rem;
  }
`;

export const Header = styled(motion.header)`
  height: 130vh;

  background: #222;

  width: 100%;

  img {
    height: 40rem;
    width: 100%;
  }

  @media (max-width: 720px) {
    img {
      height: 15rem;
      width: 100%;
    }
  }
`;
