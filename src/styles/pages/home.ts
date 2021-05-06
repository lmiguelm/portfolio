import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: #000;
  height: calc(100vh - 5rem);

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10rem;

  padding: 5rem;

  overflow: hidden;

  @media (max-width: 900px) {
    gap: 3rem;
  }
`;

export const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;

  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Possível implementação no futuro */

  h1 {
    line-height: 3.5rem;
    font-size: 3.5rem;
    color: #fff;

    span {
      color: #9290c9;
    }
  }
  h2 {
    font-weight: 400;
    font-size: 2rem;
  }

  button {
    align-self: center;
    margin-top: 3rem;
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
  color: #fff;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
