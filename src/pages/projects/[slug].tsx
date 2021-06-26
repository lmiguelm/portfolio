import React, { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

import { Container, Content, Page } from './project';
import { useElementScroll } from 'framer-motion';
import { FiChevronLeft } from 'react-icons/fi';

import Router from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { useStylesContext } from '../../hooks/useStyles';
import { IProject } from '../../../types/lmiguelm/IProject';
import { api } from '../../services/api';
import { ScrollButtonBack } from '../../styles/global';

type IProjectProps = {
  project: IProject;
};

export default function Project({ project }: IProjectProps) {
  const [scroll, setScroll] = useState(0);

  const { handleCurrentPage, handleScroll } = useStylesContext();

  const containeRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { scrollYProgress } = useElementScroll(containeRef);
  scrollYProgress.onChange(setScroll);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleCurrentPage('projects');
    handleSetHeader('public');
  }, []);

  useEffect(() => {
    handleScroll(scroll);
    console.log(scroll);
  }, [scroll]);

  function goToTop() {
    containeRef.current.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  function goBack() {
    Router.push('/projects');
  }

  return (
    <>
      <Head>
        <title>&lt; {project.title} /&gt;</title>
      </Head>

      <Container ref={containeRef}>
        <Page>
          {project.images.length == 1 ? (
            <Image
              src={project.images[0].url}
              alt={`${project.title} - ${project.images[0].id}`}
              key={project.images[0].id}
              width={1920}
              height={1080}
            />
          ) : (
            <Slide>
              {project.images.sort().map((image) => (
                <Image
                  src={image.url}
                  alt={`${project.title} - ${image.id}`}
                  key={image.id}
                  width={1920}
                  height={1080}
                />
              ))}
            </Slide>
          )}

          <Content>
            <header>
              <h1>
                <span>&lt;</span>
                {project.title}
                <span>&gt;</span>
              </h1>

              <p>{project.resume}</p>

              <div className="link-container">
                {project.url && project.url != 'null' && (
                  <a target="_blank" href={project.url}>
                    Acessar
                  </a>
                )}
                <a target="_blank" href={project.github_url}>
                  Ver no GitHub
                </a>
              </div>
            </header>

            <main>
              {project.about && project.about != 'null' && (
                <div className="about">
                  <h2>Sobre</h2>
                  <p>{project.about}</p>
                </div>
              )}

              {project.knowledge && project.knowledge != 'null' && (
                <div className="knowledge">
                  <h2>Conhecimentos</h2>
                  <p>{project.knowledge}</p>
                </div>
              )}
            </main>

            <footer>
              {project.video && project.video != 'null' && (
                <video controls>
                  <source type="video/webm" src={project.video} />
                  <strong>Seu navegador não possui suporte para videos. </strong>
                </video>
              )}
            </footer>
          </Content>

          <br />
          <br />
        </Page>
      </Container>

      <ScrollButtonBack onClick={scroll !== 0 ? goToTop : goBack}>
        <FiChevronLeft className={scroll !== 0 ? 'rotate2' : ''} color="#fff" size={40} />
      </ScrollButtonBack>
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
    revalidate: 60 * 60 * 8,
  };
};
