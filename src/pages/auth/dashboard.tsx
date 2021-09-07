import Head from 'next/head';
import Link from 'next/link';
import Routes from 'next/router';

import { Container } from '../../styles/pages/auth/dashboard';

import { FiGithub, FiTool, FiAward } from 'react-icons/fi';
import React, { useEffect } from 'react';

import Typewriter from 'typewriter-effect/dist/core';

import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../components/Loading';
import { AuthHeader } from '../../components/AuthHeader';

export default function Dashboard() {
  const { loadedAuth } = useAuth({ header: 'private', route: 'private' });

  useEffect(() => {
    const projects = document.getElementById('projects');
    const tools = document.getElementById('tools');
    const skills = document.getElementById('skills');

    const writterProjects = new Typewriter(projects, {
      loop: true,
    });
    const writterTools = new Typewriter(tools, {
      loop: true,
    });
    const writterSkills = new Typewriter(skills, {
      loop: true,
    });

    writterSkills
      .typeString('_Habilidades')
      .pauseFor(1500)
      .deleteAll()
      .typeString('Skills_')
      .pauseFor(1500)
      .start();
    writterTools
      .typeString('Ferramentas_')
      .pauseFor(1500)
      .deleteAll()
      .typeString('_Tools')
      .pauseFor(1500)
      .start();
    writterProjects
      .typeString('_Projetos')
      .pauseFor(1500)
      .deleteAll()
      .typeString('_Projects')
      .pauseFor(1500)
      .start();
  }, []);

  if (!loadedAuth) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>&lt; Dashboard /&gt;</title>
      </Head>

      <AuthHeader />

      <Container>
        <Link href="/auth/projects">
          <div>
            <FiGithub size={100} color="#fff" />
            <h1 id="projects"></h1>
          </div>
        </Link>

        <Link href="/auth/tools">
          <div>
            <FiTool size={100} color="#fff" />
            <h1 id="tools"></h1>
          </div>
        </Link>

        <Link href="/auth/skills">
          <div>
            <FiAward size={100} color="#fff" />
            <h1 id="skills"></h1>
          </div>
        </Link>
      </Container>
    </>
  );
}
