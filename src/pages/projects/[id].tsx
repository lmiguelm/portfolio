import React, { useEffect, useRef, useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

import { Container, Content, Page } from '../../styles/pages/projects/project';
import { useElementScroll } from 'framer-motion';
import { FiChevronLeft } from 'react-icons/fi';

import { ScrollButtonBack } from '../../styles/global';
import { database } from '../../services/firebase';
import { IProject, TypeFirebaseProjects } from '../../../@types/lmiguelm/project';

type IProjectProps = {
  project: IProject;
};

export default function Project({ project }: IProjectProps) {
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

  function goBack() {
    Router.push('/#projects');
  }

  return (
    <>
      <Head>
        <title>&lt; {project.title} /&gt;</title>
      </Head>

      <Container
        ref={containeRef}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <Page>
          {project.images.length == 1 ? (
            <Image
              src={project.images[0].url}
              alt={project.images[0].name}
              width={1920}
              height={1080}
              draggable={false}
            />
          ) : (
            <Slide>
              {project.images.sort().map((image) => (
                <Image
                  draggable={false}
                  key={image.id}
                  src={image.url}
                  alt={image.name}
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
                {project.url && (
                  <a target="_blank" href={project.url}>
                    Acessar
                  </a>
                )}

                {project.githubUrl && (
                  <a target="_blank" href={project.githubUrl}>
                    Ver no GitHub
                  </a>
                )}
              </div>
            </header>

            <main>
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

            <footer>
              {project.video && (
                <video controls>
                  <source type="video/webm" src={project.video.url} />
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
  const projects: TypeFirebaseProjects = await (await database.ref('projects').get()).val();
  const ids = Object.entries(projects ?? {}).map(([key]) => key);

  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;

  const project = await database.ref(`/projects/${id}`).get();
  const parsedProject = {
    id: project.key,
    ...project.val(),
    images: Object.entries(project.val().images ?? {}).map(([key, value]: any) => {
      return {
        id: key,
        name: value.name,
        url: value.url,
      };
    }),
  };

  if (!project.val()) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      project: parsedProject,
    },
    revalidate: 300, // 10 min
  };
};
