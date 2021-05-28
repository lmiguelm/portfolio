import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../../services/api';

import { Container, Card } from '../../styles/pages/auth/projects';
import { useAuth } from '../../contexts/AuthContext';

type IProject = {
  id: string;
  title: string;
  resume: string;
  thumbnail: string;
  github_url: string;
  url: string;
};

type IProjectsProps = {
  initialProjects: IProject[];
};

export default function Tools({ initialProjects }: IProjectsProps) {
  const [projects, setTools] = useState(initialProjects);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  async function handleRemoveProject(id: string) {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_APP_URL}/projects/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar este projeto?`)) {
        const newProjetcs = projects.filter((project) => project.id !== id);
        setTools(newProjetcs);
      }
    } catch (error) {
      console.log('erro', error);
      alert('Erro interno do servidor!');
    }
  }

  return (
    <>
      <Head>
        <title>&lt; Dashboard /&gt;</title>
      </Head>
      <Container>
        {projects.map((project) => (
          <Card key={project.id}>
            <img src={project.thumbnail} alt={project.title} />

            <div>
              <h3>{project.title}</h3>
              <p>{project.resume}</p>
            </div>

            <footer>
              <Link href={`/auth/projects/edit?id=${project.id}`}>
                <button type="button">Editar</button>
              </Link>
              <button onClick={() => handleRemoveProject(project.id)} type="button">
                Remover
              </button>
            </footer>
          </Card>
        ))}
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

    const { data } = await api.get('/projects');

    return {
      props: {
        initialProjects: data,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};
