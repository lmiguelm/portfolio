import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background: ${(props) => props.theme.colors.backgroundPrimary};
  height: calc(100vh - 5rem);
  overflow-y: scroll;
`;

export const FirstSection = styled(motion.section)`
  height: 100%;

  background: ${(props) => props.theme.colors.backgroundPrimary};
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
    color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textPrimary : '#fff')};
    margin-bottom: 1rem;

    span {
      color: ${(props) => props.theme.colors.colorSecondary};
    }
  }
  p {
    max-width: 50%;
    text-align: justify;
    text-indent: 1.5em;
    color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textPrimary : '#ddd')};
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
  background: ${(props) => props.theme.colors.backgroundPrimary};

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
