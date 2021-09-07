import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useTransform, useViewportScroll } from 'framer-motion';

import { database } from '../services/firebase';

import { IProject, TypeFirebaseProjects } from '../../@types/lmiguelm/project';
import { ISkill, TypeFirebaseSkills } from '../../@types/lmiguelm/skills';
import { ITool, TypeFirebaseTools } from '../../@types/lmiguelm/tools';

import { PublicHeader } from '../components/PublicHeader';

import { About } from '../screens/About';
import { Contact } from '../screens/Contact';
import { Landing } from '../screens/Landing';
import { Projects } from '../screens/Projects';

import { Container, Section, ScrollButton } from '../styles/pages/landing';
import { FiChevronUp } from 'react-icons/fi';
import Head from 'next/head';

type Props = {
  skills: ISkill[];
  tools: ITool[];
  projects: IProject[];
  toggleTheme: () => void;
};

export default function Home({ projects, skills, tools, toggleTheme }: Props) {
  const { scrollYProgress } = useViewportScroll();

  const opacityHeader = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const opacityButton = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  function handleGoToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <Container>
      <Head>
        <title>&lt; lmiguelm /&gt;</title>
      </Head>

      <PublicHeader style={{ opacity: opacityHeader }} />

      <Section id="landing">
        <Landing toggleTheme={toggleTheme} />
      </Section>

      <Section id="about">
        <About skills={skills} tools={tools} />
      </Section>

      <Section id="projects">
        <Projects projects={projects} />
      </Section>

      <Section id="contact">
        <Contact />
      </Section>

      <ScrollButton style={{ opacity: opacityButton }} onClick={handleGoToTop}>
        <FiChevronUp color="#fff" size={40} />
      </ScrollButton>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const skills: TypeFirebaseSkills = await (await database.ref('skills').get()).val();
  const skillsParsed = Object.entries(skills ?? {}).map(([key, value]) => {
    return {
      id: key,
      ...value,
    } as ISkill;
  });

  const tools: TypeFirebaseTools = await (await database.ref('tools').get()).val();
  const toolsParsed = Object.entries(tools ?? {}).map(([key, value]) => {
    return {
      id: key,
      ...value,
    } as ITool;
  });

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
      skills: skillsParsed ?? [],
      tools: toolsParsed ?? [],
      projects: projectsParsed.reverse() ?? [],
    },
    revalidate: 300, // 10 min
  };
};
