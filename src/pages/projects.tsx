import { GetStaticProps } from 'next';
import Head from 'next/head';

import { useElementScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';

import { Header } from '../components/ExternalHeader';

import { useStylesContext } from '../contexts/StylesContext';
import { api } from '../services/api';

import { FiChevronDown } from 'react-icons/fi';

import { Container, FirstSection, SecondSection } from '../styles/pages/projects';
import { ScrollButton } from '../styles/global';

type IProject = {
  id: string;
  title: string;
  resume: string;
  thumbnail: string;
  github_url: string;
  url: string;
};

type IProjectsProps = {
  projects: IProject[];
};

export default function Projects({ projects }: IProjectsProps) {
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState(false);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);
  scrollYProgress.onChange(setScroll);

  useEffect(() => {
    handleCurrentPage('projects');

    containeRef.current.addEventListener('scroll', () => {
      const section = document.getElementById('project-section');
      if (section.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          setActive(true);
        }, 200);
      } else {
        setTimeout(() => {
          setActive(false);
        }, 200);
      }
    });
  }, []);

  useEffect(() => {
    handleScroll(scroll);
  }, [scroll]);

  function goToTop() {
    containeRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function goToBottom() {
    console.log('entro2 ');
    containeRef.current.scroll({
      top: window.innerHeight - 80,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <Head>
        <title>&lt;Projetos /&gt;</title>
      </Head>

      <Header />

      <Container ref={containeRef}>
        <FirstSection>
          <h1>
            <span>&lt;</span>Projetos<span>&gt;</span>
          </h1>
          <p>
            Aqui você pode conferir alguns projetos que desenvolvi, desde projetos pessoais, clones
            de interfaces de grandes marcas, jogos, projetos desenvolvidos em workshops, entre
            outros.
          </p>
        </FirstSection>

        <SecondSection className={active ? 'active' : ''} id="project-section">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </SecondSection>
      </Container>

      <ScrollButton onClick={active ? goToTop : goToBottom}>
        <FiChevronDown color="#fff" className={active ? 'rotate' : ''} size={40} />
      </ScrollButton>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<IProject[]>('/projects', {
    params: {
      _sort: 'order',
      _order: 'asc',
    },
  });

  return {
    props: {
      projects: data,
    },
    revalidate: 60 * 60 * 8,
  };
};
