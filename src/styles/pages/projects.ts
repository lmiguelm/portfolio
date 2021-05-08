import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: #111;
  height: calc(100vh - 5rem);
  overflow-y: scroll;
`;

export const FirstSection = styled(motion.section)`
  height: 100%;

  background: #000;
  background-image: url('./wallpapers/wallpaper-projects.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top 50%;
  background-attachment: fixed;

  opacity: 0.9;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    line-height: 3.5rem;
    font-size: 3.5rem;
    color: #fff;
    margin-bottom: 1rem;

    span {
      color: #9290c9;
    }
  }
  p {
    max-width: 50%;
    text-align: justify;
    text-indent: 1.5em;
  }

  @media (max-width: 720px) {
    h1 {
      margin-top: -50px;
    }
    p {
      max-width: 80%;
    }
  }
`;

export const SecondSection = styled(motion.section)`
  background: #000;

  opacity: 0;
  padding: 2rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  transition: 0.4s ease-in-out;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(1, 1fr);
  }

  &.active {
    opacity: 1;
  }
`;
