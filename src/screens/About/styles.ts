import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  height: 100vh;

  background: ${(props) => props.theme.colors.backgroundSecondary};
  background-image: url('../../../wallpapers/wallpaper-about.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center top 30%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 720px) {
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    background-image: none;
  }
`;

export const ApresentationContainer = styled.div`
  width: 50%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-right: 5rem;

  border: 0.7px solid ${(props) => props.theme.colors.border};
  border-right: none;
  border-radius: 1.5rem 0rem 0px 1.5rem;
  background: ${(props) => props.theme.colors.backgroundSecondary};

  opacity: 0;
  transform: translateY(50%);

  transition: transform 0.6s;

  &.animate-apresentation {
    opacity: 1;
    transform: translateY(0);
  }

  .button-link {
    margin-top: 3rem;
    text-decoration: none;
    align-self: center;
  }

  @media (max-width: 720px) {
    border: none;
    width: 100%;
    padding: 2rem;
  }
`;

export const Name = styled.h1`
  color: ${(props) => props.theme.colors.textSecondary};

  line-height: 4rem;
  margin-bottom: 1.5rem;
  font-size: 3rem;

  span {
    color: ${(props) => props.theme.colors.colorSecondary};
  }

  @media (max-width: 1366px) {
    width: 100%;
  }

  @media (max-width: 720px) {
    text-align: center;
    width: 100%;
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;

export const History = styled.p`
  line-height: 2rem;
  text-align: justify;
  text-indent: 1.5em;
  color: ${(props) => props.theme.colors.textSecondary};

  @media (max-width: 1366px) {
    max-width: 100%;
  }

  @media (max-width: 720px) {
    max-width: 100%;
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

export const Content = styled.div`
  background: ${(props) => props.theme.colors.backgroundSecondary};
  border-bottom: 0.7px solid ${(props) => props.theme.colors.border};
`;

export const SkillsContainer = styled.div`
  padding: 60px;

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

export const ToolsContainer = styled.div`
  padding: 0px 60px 90px 60px;

  @media (max-width: 768px) {
    padding: 0px 30px 60px 30px;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  color: ${(props) => props.theme.colors.colorSecondary};

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1.5rem;
  }
`;
