import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import { useElementScroll } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';

import { FiChevronDown } from 'react-icons/fi';

import { Container, FirstSection, SecondSection } from '../styles/pages/projects';

import { ScrollButton } from '../components/ScrollButton';
import { IProject, TypeFirebaseProjects } from '../../@types/lmiguelm/project';
import { database } from '../services/firebase';

type IProjectsProps = {
  projects: IProject[];
};

export default function Projects({ projects }: IProjectsProps) {
  const [scroll, setScroll] = useState(0);

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);

  useEffect(() => {
    scrollYProgress.onChange(setScroll);

    return () => scrollYProgress.clearListeners();
  }, []);

  function goToTop() {
    containeRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function goToBottom() {
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

        <SecondSection className={scroll !== 0 ? 'active' : ''} id="project-section">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </SecondSection>
      </Container>

      <ScrollButton onClick={scroll !== 0 ? goToTop : goToBottom}>
        <FiChevronDown color="#fff" className={scroll !== 0 ? 'rotate' : ''} size={40} />
      </ScrollButton>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects: TypeFirebaseProjects = await (await database.ref('projects').get()).val();
  const projectsParsed = Object.entries(projects ?? {}).map(([key, value]) => {
    return {
      id: key,
      ...value,
      images: Object.entries(value.images ?? {}).map(([key, value]) => {
        return {
          id: key,
          name: value.name,
          url: value.url,
        };
      }),
    } as IProject;
  });

  return {
    props: {
      projects: projectsParsed.reverse() ?? [],
    },
    revalidate: 300, // 10 min
  };
};
