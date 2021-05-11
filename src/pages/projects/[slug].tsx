import React, { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

import { api } from '../../services/api';

import { Container, Content, Page } from '../../styles/pages/project';
import { useElementScroll } from 'framer-motion';
import { useStylesContext } from '../../contexts/StylesContext';
import { ScrollButton } from '../../styles/global';
import { FiChevronUp } from 'react-icons/fi';

type IProject = {
  id: string;
  title: string;
  resume: string;
  thumbnail: string;
  github_url: string;
  url: string;
  video: string;
  knowledge: string;
  about: string;
  images: Array<{
    id: string;
    url: string;
  }>;
};

type IProjectProps = {
  project: IProject;
};

export default function Project({ project }: IProjectProps) {
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState(false);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);
  scrollYProgress.onChange(setScroll);

  useEffect(() => {
    handleCurrentPage('projects');

    containeRef.current.addEventListener('scroll', () => {
      const section = document.getElementById('project');
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

  return (
    <>
      <Head>
        <title>&lt; {project.title} /&gt;</title>
      </Head>

      <Container ref={containeRef}>
        <Page>
          <Slide>
            {project.images.map((image) => (
              <img src={image.url} alt={`${project.title} - ${image.id}`} key={image.id} />
            ))}
          </Slide>

          <Content>
            <header>
              <h1>
                <span>&lt;</span>
                {project.title}
                <span>&gt;</span>
              </h1>

              <span>{project.resume}</span>

              <div className="link-container">
                {project.url && (
                  <a target="_blank" href={project.url}>
                    Acessar
                  </a>
                )}
                <a target="_blank" href={project.github_url}>
                  Ver no GitHub
                </a>
              </div>
            </header>

            <main id="project">
              {project.about && (
                <div className="about">
                  <h2>Sobre</h2>
                  <p>{project.about}</p>
                </div>
              )}

              {project.knowledge && (
                <div className="knowledge">
                  <h2>Conhecimentos</h2>
                  <p>{project.knowledge}</p>
                </div>
              )}
            </main>

            {project.video && (
              <footer>
                <video controls>
                  <source type="video/webm" src={project.video} />
                  <strong>Seu navegador não possui suporte para videos. </strong>
                </video>
              </footer>
            )}
          </Content>
          <br />
          <br />
        </Page>
      </Container>

      <ScrollButton onClick={goToTop} className={active ? 'scrolling' : ''}>
        <FiChevronUp size={40} />
      </ScrollButton>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<IProject[]>('/projects');

  const paths = data.map((project) => {
    return {
      params: {
        slug: project.id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const { data } = await api.get<IProject>(`/projects/${slug}`);

  if (!data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      project: {
        id: data.id,
        title: data.title,
        resume: data.resume,
        thumbnail: data.thumbnail,
        github_url: data.github_url,
        url: data.url,
        video: data.video,
        knowledge: data.knowledge,
        about: data.about,
        images: data.images,
      },
    },
  };
};
