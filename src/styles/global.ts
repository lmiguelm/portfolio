import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins, sans-serif;
    scroll-behavior: smooth;
  }

  span, p, h2, h3, h4, h1 , a, strong {
    color: ${(props) => props.theme.colors.textPrimary};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar {
    width: 6px;
    background: ${(props) => props.theme.colors.backgroundSecondary};
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.colorPrimary};;
  }
    
`;

export const ScrollButtonBack = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: 1rem;

  background: ${(props) => props.theme.colors.colorPrimary};
  z-index: 9999;

  position: fixed;

  bottom: 0;
  right: 0;
  margin: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    filter: brightness(0.7);
  }

  svg {
    transition: transform 0.4s;

    &.rotate {
      transform: rotate(-90deg);
    }
    &.rotate2 {
      transform: rotate(90deg);
    }
  }
`;

export const FormButton = styled.button`
  margin: 2rem 0;

  height: 5rem;
  outline: none;

  border: 1px solid ${(props) => props.theme.colors.textPrimary};
  border-radius: 1rem;

  color: #000;
  background-color: ${(props) => props.theme.colors.textSecondary};

  font-size: 1.25rem;
  text-transform: uppercase;
  font-weight: bold;

  cursor: not-allowed;

  transition: 0.2s;

  &.active {
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => props.theme.colors.colorPrimary};
    cursor: pointer;
  }

  &.active:hover {
    color: ${(props) => props.theme.colors.textSecondary};
    background-color: ${(props) => props.theme.colors.colorPrimary};
  }
`;

export const Blur = styled.div`
  height: 100vh;
  width: 100%;

  overflow: hidden;
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;

  z-index: 99998;

  background-color: rgba(0, 0, 0, 0.9);
`;
