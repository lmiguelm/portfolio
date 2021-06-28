import styled from 'styled-components';

export const Title = styled.p`
  color: ${(props) => props.theme.colors.colorSecondary};
  font-size: 1.25rem;
  filter: brightness(0.9);
  margin: 1rem 0 -1.5rem 0;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 5.5rem);
  gap: 0.5rem;
  padding: 0.87rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.backgroundPrimary};

  .image-container {
    display: flex;
    justify-content: flex-end;

    .icon-container {
      background: red;
      position: absolute;
      cursor: pointer;
      z-index: 9;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }

    img,
    video {
      height: 5rem;
      width: 5rem;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 1rem;
      font-size: 2.5rem;
    }
  }
`;

export const Input = styled.label`
  cursor: pointer;

  height: 5rem;
  width: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  font-size: 2.5rem;
  border: 2px dashed ${(props) => props.theme.colors.backgroundPrimary};

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  input {
    display: none;
  }
`;
