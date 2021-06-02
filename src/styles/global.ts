import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins, sans-serif;
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

export const Button = styled.button`
  height: 4rem;
  width: 14rem;

  border: none;
  outline: none;

  border: 3px solid ${(props) => props.theme.colors.colorPrimary};
  border-radius: 0.5rem;
  background: ${(props) =>
    props.theme.title === 'dark' ? 'trasnparent' : props.theme.colors.backgroundPrimary};

  color: ${(props) => props.theme.colors.textSecondary};

  font-size: 1.5rem;

  transition: 0.4s;

  animation: border 0.5s infinite;

  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none; /* Possível implementação no futuro */

  @keyframes border {
    0% {
      border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    }
    100% {
      border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    }
  }

  &:hover {
    background: ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textSecondary : '#fff')};
    filter: brightness(0.9);
  }
`;

export const ScrollButton = styled.div`
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
      transform: rotate(180deg);
    }
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
  }
`;

export const Input = styled.input`
  height: 5rem;
  outline: none;

  padding: 2rem 1rem;

  border: none;
  border-bottom: 1px solid #000;
  color: ${(props) => props.theme.colors.backgroundSecondary};

  font-size: 1.25rem;

  transition: 0.4s;

  &::placeholder {
    transition: 0.4s;
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => props.theme.colors.colorPrimary};

    &::placeholder {
      transform: scale(0.9);
    }
  }

  &.error {
    border-bottom: 1px solid red;
    color: red;
  }
`;

export const Textarea = styled.textarea`
  height: 5rem;
  outline: none;

  padding: 1rem;

  border: none;
  border: 1px solid #000;
  color: ${(props) => props.theme.colors.backgroundSecondary};

  font-size: 1.25rem;

  transition: 0.4s;

  resize: none;
  height: 10rem;
  width: 100%;

  &::placeholder {
    transition: 0.4s;
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
    color: ${(props) => props.theme.colors.colorPrimary};

    &::placeholder {
      transform: scale(0.9);
    }
  }

  &.error {
    border-bottom: 1px solid red;
    color: red;
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
