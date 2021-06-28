import React, { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { useElementScroll } from 'framer-motion';
import { ProjectCard } from '../components/ProjectCard';

import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import {
  Container,
  FirstSection,
  PaginationContainer,
  SecondSection,
} from '../styles/pages/projects';

import { useAuth } from '../hooks/useAuth';
import { useStylesContext } from '../hooks/useStyles';

import { ScrollButton } from '../components/ScrollButton';
import { IProject, TypeFirebaseProjects } from '../../types/lmiguelm/project';
import { database } from '../services/firebase';

type IProjectsProps = {
  allProjects: IProject[];
};

export default function Projects({ allProjects }: IProjectsProps) {
  const { handleSetHeader } = useAuth();
  const { handleCurrentPage, handleScroll } = useStylesContext();

  const [scroll, setScroll] = useState(0);
  const [projectsFiltered, setProjectsFiltered] = useState<IProject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itensPerPage = 4;

  // TODO: melhorar lógica.
  let pages: number[] = [];
  for (let i = 0; i < Math.round(allProjects.length / itensPerPage); i++) {
    pages.push(i);
  }

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);
  scrollYProgress.onChange(setScroll);

  useEffect(() => {
    handleSetHeader('public');
    handleCurrentPage('projects');

    const filtered = allProjects.slice(0, 4);
    setProjectsFiltered(filtered);
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
    containeRef.current.scroll({
      top: window.innerHeight - 80,
      left: 0,
      behavior: 'smooth',
    });
  }

  function nextPage() {
    const newCurrentPage = currentPage + 1;

    const min = itensPerPage * currentPage;
    const max = itensPerPage * newCurrentPage;

    const filtered = allProjects.slice(min, max);

    setProjectsFiltered(filtered);
    setCurrentPage(newCurrentPage);
  }

  function previuosPage() {
    let newCurrentPage = currentPage - 1;

    if (newCurrentPage <= 0) newCurrentPage = 1;

    let min = itensPerPage * newCurrentPage - itensPerPage;
    const max = itensPerPage * newCurrentPage;

    if (newCurrentPage == 1) min = 0;

    const filtered = allProjects.slice(min, max);

    setProjectsFiltered(filtered);
    setCurrentPage(newCurrentPage);
  }

  function handlePage(index: number) {
    const newCurrentPage = index;

    const max = itensPerPage * newCurrentPage;
    let min = max - 4;

    if (newCurrentPage == 1) min = 0;

    const filtered = allProjects.slice(min, max);

    setProjectsFiltered(filtered);
    setCurrentPage(newCurrentPage);
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
          {projectsFiltered.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </SecondSection>

        <PaginationContainer>
          <a
            href="#project-section"
            onClick={previuosPage}
            className={currentPage === 1 ? 'pagination-item disabled' : 'pagination-item'}
          >
            <FiChevronLeft />
          </a>

          {pages.map((_, index) => (
            <a
              href="#project-section"
              onClick={() => handlePage(index + 1)}
              key={index + 1}
              className={currentPage == index + 1 ? 'pagination-item active' : 'pagination-item'}
            >
              {index + 1}
            </a>
          ))}

          <a
            href="#project-section"
            onClick={nextPage}
            className={
              pages.length === currentPage ? 'pagination-item disabled' : 'pagination-item'
            }
          >
            <FiChevronRight />
          </a>
        </PaginationContainer>
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
      allProjects: projectsParsed,
    },
    revalidate: 300, // 10 min
  };
};
