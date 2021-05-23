import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Container } from '../../styles/pages/auth/dashboard';

import { Header } from '../../components/AuthHeader/index';

import { FiGithub, FiTool, FiAward } from 'react-icons/fi';
import { useEffect } from 'react';

import Typewriter from 'typewriter-effect/dist/core';
import { api } from '../../services/api';

type IUser = {
  id: string;
  name: string;
  email: string;
};

type IDashboardProps = {
  user: IUser;
};

export default function Dashboard({ user }: IDashboardProps) {
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

  return (
    <>
      <Header />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.access_token;
  const currentUser = ctx.req.cookies.current_user;

  try {
    if (!token && !currentUser) {
      throw new Error();
    }

    await api.get('http://localhost:3333/api/validating/token', {
      headers: {
        Authorization: JSON.parse(token),
      },
    });

    return {
      props: {
        user: JSON.parse(currentUser),
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
