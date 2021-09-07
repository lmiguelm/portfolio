import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 1rem;

  width: 25rem;
  min-height: 35rem;
  max-height: 55rem;

  padding: 1rem;

  cursor: pointer;

  transition: filter 0.4s;

  &:hover {
    filter: brightness(0.8);
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
`;

export const Content = styled.main`
  margin: 2rem;
  user-select: none;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
  text-align: left;
  color: ${(props) => props.theme.title};
`;

export const Resume = styled.p`
  text-align: justify;
  color: ${(props) => props.theme.colors.textPrimary};
  word-wrap: break-word;
  width: 20rem;
`;

export const Footer = styled.footer`
  word-wrap: break-word;
  width: 20rem;

  display: flex;
  justify-content: space-between;
`;
