import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
`;

export const Wrapper = styled.div`
  height: 100vh;

  background: ${(props) => props.theme.colors.backgroundPrimary};
  background-image: url('../../../wallpapers/wallpaper-projects.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top 30%;
`;

export const TextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  line-height: 3.5rem;
  font-size: 3.5rem;
  color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textPrimary : '#fff')};
  margin-bottom: 1rem;

  opacity: 0;
  transform: translateY(50%);
  transition: transform 0.6s;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  span {
    color: ${(props) => props.theme.colors.colorSecondary};
  }

  @media (max-width: 720px) {
    margin-top: -50px;
  }
`;

export const Description = styled.p`
  max-width: 50%;
  text-align: justify;
  text-indent: 1.5em;
  color: ${(props) => (props.theme.title === 'dark' ? props.theme.colors.textPrimary : '#ddd')};

  opacity: 0;
  transform: translateY(-50%);
  transition: transform 0.6s;

  &.animate {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 720px) {
    max-width: 80%;
  }
`;

export const Content = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.backgroundPrimary};

  padding: 2rem 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  border-bottom: 0.7px solid ${(props) => props.theme.colors.border};

  @media (max-width: 768px) {
    padding: 2rem 0.75rem;
  }
`;
