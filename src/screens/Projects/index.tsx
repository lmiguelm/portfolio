import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IProject } from '../../../@types/lmiguelm/project';
import { ProjectCard } from '../../components/ProjectCard';

import { Container, TextContainer, Wrapper, Title, Description, Content } from './styles';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1366, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

type Props = {
  projects: IProject[];
};

export function Projects({ projects }: Props) {
  const total = projects.length;
  const healf = projects.length / 2;

  const firstSection = projects.slice(0, healf);
  const secondSection = projects.slice(healf, total);

  useEffect(() => {
    window.addEventListener('scroll', handleDetectOnScroll);
    return () => window.removeEventListener('scroll', handleDetectOnScroll);
  }, []);

  function handleDetectOnScroll() {
    const textContainer = document.getElementById('text-container');
    const title = document.getElementById('title');
    const description = document.getElementById('description');

    if (textContainer.getBoundingClientRect().top * 3 < window.innerHeight) {
      title.classList.add('animate');
      description.classList.add('animate');
    }
  }

  return (
    <Container>
      <Wrapper>
        <TextContainer id="text-container">
          <Title id="title">
            <span>&lt;</span>Projetos<span>&gt;</span>
          </Title>
          <Description id="description">
            Aqui você pode conferir alguns projetos que desenvolvi, desde projetos pessoais, clones
            de interfaces de grandes marcas, jogos, projetos desenvolvidos em workshops, entre
            outros.
          </Description>
        </TextContainer>
      </Wrapper>

      <Content>
        <Carousel swipeable autoPlay responsive={responsive} infinite>
          {firstSection.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </Carousel>

        <br />

        <Carousel swipeable autoPlay responsive={responsive} infinite>
          {secondSection.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </Carousel>
      </Content>
    </Container>
  );
}
