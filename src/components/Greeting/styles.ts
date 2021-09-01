import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div``;

export const Title = styled.h2`
  h2 {
    font-weight: 400;

    @media (max-width: 900px) {
      font-size: 1.25rem;
    }
  }
`;

export const Name = styled.h1`
  line-height: 3.5rem;
  font-size: 3.5rem;
  color: ${(props) => props.theme.colors.textPrimary};
  min-width: 300px;

  span {
    color: ${(props) => props.theme.colors.colorSecondary};
  }

  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

export const Description = styled.h2`
  h2 {
    font-weight: 400;

    @media (max-width: 900px) {
      font-size: 1.25rem;
    }
  }
`;

export const IconsContainer = styled(motion.ul)`
  list-style: none;
  gap: 0.5rem;

  display: flex;

  margin-top: 1rem;
`;
