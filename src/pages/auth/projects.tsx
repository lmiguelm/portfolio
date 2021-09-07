import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';

import { Container, Card } from '../../styles/pages/auth/projects';

import { Button } from '../../components/Button';
import { database, storage } from '../../services/firebase';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

import { IProject, ISlides, IThumbnail, IVideo } from '../../../@types/lmiguelm/project';
import { Loading } from '../../components/Loading';
import { useProjects } from '../../hooks/useProjects';
import { IProjectFile, ProjectsModal } from '../../components/ProjectsModal';
import { AuthHeader } from '../../components/AuthHeader';

export type IProjectData = {
  id?: string;
  title: string;
  resume: string;
  about: string;
  knowledge: string;
  url: string;
  githubUrl: string;
};

export default function Projects() {
  const { loadedAuth } = useAuth({ route: 'private', header: 'private' });
  const { colors } = useTheme();
  const { loading: loadingProjects, projects } = useProjects();

  const [selectedProject, setSelectedProject] = useState<IProject>({} as IProject);

  const [loading, setLoading] = useState<boolean>(loadingProjects);

  const [showModal, setShowModal] = useState(false);

  function handleOpenModal(project: IProject) {
    setSelectedProject(project);
    setShowModal(true);
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  async function saveNewProject(data: IProjectData, file: IProjectFile) {
    setShowModal(false);
    setLoading(true);

    const { title, resume, githubUrl, about, knowledge, url } = data;
    const { images: imagesFile, video: videoFile, thumbnail: thumbnailFile } = file;

    try {
      const project = await database.ref('projects').push({
        title,
        resume,
        about,
        githubUrl,
        knowledge,
        url,
      } as IProject);

      const thumbnailRef = storage.ref(`/projects/${project.key}/thumbnail/${thumbnailFile.name}`);
      await thumbnailRef.put(thumbnailFile);
      const thumbnailUrl = {
        url: await thumbnailRef.getDownloadURL(),
        name: thumbnailFile.name,
      };

      if (videoFile) {
        const videoRef = storage.ref(`/projects/${project.key}/video/${videoFile.name}`);
        await videoRef.put(videoFile);
        const videoUrl = {
          url: await videoRef.getDownloadURL(),
          name: videoFile.name,
        };

        await database.ref(`projects/${project.key}`).update({
          video: videoUrl,
        });
      }

      const imagesUrl = await Promise.all(
        imagesFile.map(async (image) => {
          const projectRef = storage.ref(`/projects/${project.key}/slide/${image.name}`);
          await projectRef.put(image);
          return {
            name: image.name,
            url: await projectRef.getDownloadURL(),
          };
        })
      );

      await database.ref(`projects/${project.key}`).update({
        thumbnail: thumbnailUrl,
        images: imagesUrl,
      });

      toast.success(`${title} salvo com sucesso!`);
    } catch {
      toast.error(`Erro ao salvar!`);
    } finally {
      setLoading(false);
    }
  }

  async function editProject(data: IProjectData, file: IProjectFile) {
    setShowModal(false);
    setLoading(true);

    const { id: projectId } = data;
    const { images: imagesFile = [], thumbnail: thumbnailFile, video: videoFile } = file;

    let thumbnailUrl: IThumbnail = undefined;
    let videoUrl: IVideo = undefined;
    let imagesUrl: ISlides[] = undefined;

    try {
      if (thumbnailFile) {
        const thumbnailRef = storage.ref(`/projects/${projectId}/thumbnail/${thumbnailFile.name}`);
        await thumbnailRef.put(thumbnailFile);
        thumbnailUrl = {
          url: await thumbnailRef.getDownloadURL(),
          name: thumbnailFile.name,
        };
      }

      if (videoFile) {
        const videoRef = storage.ref(`/projects/${projectId}/video/${videoFile.name}`);
        await videoRef.put(videoFile);
        videoUrl = {
          url: await videoRef.getDownloadURL(),
          name: videoFile.name,
        };
      }

      if (imagesFile.length !== 0) {
        imagesUrl = await Promise.all(
          imagesFile.map(async (image) => {
            const projectRef = storage.ref(`/projects/${projectId}/slide/${image.name}`);
            await projectRef.put(image);
            return {
              name: image.name,
              url: await projectRef.getDownloadURL(),
            };
          })
        );
      }

      await database.ref(`projects/${projectId}`).update(data);

      if (thumbnailUrl) {
        await database.ref(`projects/${projectId}`).update({
          thumbnail: thumbnailUrl,
        } as IProject);
      }

      if (videoUrl) {
        await database.ref(`projects/${projectId}`).update({
          video: videoUrl,
        } as IProject);
      }

      if (imagesUrl) {
        await database.ref(`projects/${projectId}`).update({
          images: imagesUrl,
        } as IProject);
      }

      toast.success(`Projeto editado com sucesso!`);
    } catch {
      toast.error('Erro ao salvar!');
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveProject(projectId: string) {
    setLoading(true);
    await database.ref(`/projects/${projectId}`).remove();
    setLoading(false);
    toast.success(`Projeto removido com sucesso!`);
  }

  if (loading || !loadedAuth) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>&lt; Dashboard /&gt;</title>
      </Head>

      <AuthHeader />

      <Container>
        <Button onClick={() => handleOpenModal({} as IProject)}>Adicionar</Button>

        <main className="grid">
          {projects.map((project) => (
            <Card key={project.id}>
              <header>
                <img src={project.thumbnail.url} alt={project.title} />
              </header>

              <main className="card">
                <h3>{project.title}</h3>
                <p>{project.resume}</p>
              </main>

              <footer>
                <button onClick={() => handleOpenModal(project)} type="button">
                  Editar
                </button>

                <button onClick={() => handleRemoveProject(project.id)} type="button">
                  Remover
                </button>
              </footer>
            </Card>
          ))}
        </main>
      </Container>

      {showModal && (
        <ProjectsModal
          closeModal={handleCloseModal}
          project={selectedProject}
          editProject={editProject}
          newProject={saveNewProject}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: colors.backgroundSecondary,
            color: colors.textPrimary,
            zIndex: 999999999,
          },
        }}
        containerStyle={{
          zIndex: 9999999999999,
        }}
      />
    </>
  );
}
