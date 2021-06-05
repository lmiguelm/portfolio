import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../../services/api';

import { Container, Card } from '../../styles/pages/auth/projects';
import { useAuth } from '../../contexts/AuthContext';

import { IProject } from '../../../types/lmiguelm/IProject';
import { FormEvent } from 'react';
import { Button, Input, Textarea } from '../../styles/global';
import { Modal } from '../../components/Modal';

type IProjectsProps = {
  initialProjects: IProject[];
};

export default function projects({ initialProjects }: IProjectsProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [project, setProject] = useState<IProject>({} as IProject);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  async function handleRemoveProject(id: string) {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_APP_URL}/projects/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar este projeto?`)) {
        const newProjetcs = projects.filter((project) => project.id !== id);
        setProjects(newProjetcs);
      }
    } catch (error) {
      alert('Erro interno do servidor!');
    }
  }

  function handleOpenModalEdit(project: IProject) {
    setProject(project);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(!showModal);
  }

  async function handleEdit(event: FormEvent) {
    event.preventDefault();

    const { title, about, url, github_url, knowledge, resume } = project;

    if (
      title.length == 0 ||
      about.length == 0 ||
      url.length == 0 ||
      github_url.length == 0 ||
      knowledge.length == 0 ||
      resume.length == 0
    ) {
      alert('Campos não podem ser vazios!');
      return;
    }

    try {
      await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/projects/update/${project.id}`, project);

      const newprojects = projects.map((element) => {
        if (element.id == project.id) {
          return {
            ...element,
            ...project,
          };
        }
        return element;
      });

      setProjects(newprojects as []);
      setShowModal(false);

      alert('Habilidade editada com sucesso!');
    } catch {
      alert('Erro ao editar habilidade');
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
              <button onClick={() => handleOpenModalEdit(project)} type="button">
                Editar
              </button>
              <button onClick={() => handleRemoveProject(project.id)} type="button">
                Remover
              </button>
            </footer>
          </Card>
        ))}
      </Container>

      {showModal && (
        <Modal closeModal={handleCloseModal} handleSubmit={project.id ? handleEdit : () => {}}>
          <Input
            type="text"
            placeholder="Nome"
            value={project.title}
            onChange={(event) => setProject({ ...project, title: event.target.value })}
          />

          <Input
            type="text"
            placeholder="Url"
            value={project.url}
            onChange={(event) => setProject({ ...project, url: event.target.value })}
          />

          <Input
            type="text"
            placeholder="Url no GitHub"
            value={project.github_url}
            onChange={(event) => setProject({ ...project, github_url: event.target.value })}
          />

          <Textarea
            placeholder="Descrição"
            value={project.resume}
            onChange={(event) => setProject({ ...project, resume: event.target.value })}
          />

          <Textarea
            placeholder="Sobre"
            value={project.about}
            onChange={(event) => setProject({ ...project, about: event.target.value })}
          />

          <Textarea
            placeholder="Conhecimentos"
            value={project.knowledge}
            onChange={(event) => setProject({ ...project, knowledge: event.target.value })}
          />

          <Button type="submit" style={{ alignSelf: 'center' }}>
            Salvar
          </Button>
        </Modal>
      )}
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
