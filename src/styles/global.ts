import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Poppins, sans-serif;
    color: #ddd;
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
    
`;

export const Button = styled.button`
  height: 4rem;
  width: 14rem;

  border: none;
  outline: none;

  border: 3px solid #356eca;
  border-radius: 0.5rem;
  background: transparent;

  color: #fff;

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
      border: 1px solid #356eca;
    }
    100% {
      border: 1px solid #245eca;
    }
  }

  &:hover {
    background: #356eca;
    filter: brightness(0.9);
  }
`;
