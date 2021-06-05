import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  z-index: 9999;

  display: flex;
  justify-content: space-between;

  gap: 2rem;
  padding: 2.5rem;

  cursor: default;

  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: 1rem;

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 2.5rem 0rem;

    h1 {
      margin-bottom: 1rem;

      span {
        color: ${(props) => props.theme.colors.colorSecondary};
      }
    }

    p {
      text-align: justify;
      text-indent: 1.5em;
    }

    div {
      margin-top: 2rem;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      article {
        gap: 2rem;

        a {
          filter: brightness(0.8);
          transition: 0.2s;

          &:hover {
            filter: brightness(0.6);
          }
        }
      }

      .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        transition: 0.2s;
        border-radius: 0.5rem;
        background: ${(props) => props.theme.colors.colorPrimary};

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:first-child {
      margin-top: -6rem;
    }

    div {
      padding: 0;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      h1 {
        text-align: center;
      }

      .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        transition: 0.2s;
        border-radius: 0.5rem;
        background: ${(props) => props.theme.colors.colorPrimary};

        &:hover {
          filter: brightness(0.8);
        }
      }
    }
  }

  @media (max-width: 720px) {
    /* img {
      align-self: center;
      height: 8rem;
      width: 15rem;
    } */
  }
`;
