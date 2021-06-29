import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Routes from 'next/router';
import { FiX } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

import { Modal } from '../../components/Modal';

import { Container, Card } from '../../styles/pages/auth/projects';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea';
import { database, storage } from '../../services/firebase';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

import {
  IProject,
  ISlides,
  IThumbnail,
  IVideo,
  TypeFirebaseProjects,
} from '../../../types/lmiguelm/project';
import { Loading } from '../../components/Loading';
import { InputFile } from '../../components/InputFile';
import { useForm } from 'react-hook-form';

type IProjectData = {
  title: string;
  resume: string;
  about: string;
  knowledge: string;
  url: string;
  githubUrl: string;
};

export default function Projects() {
  const { handleSetHeader, user, loadedAuth } = useAuth();
  const { colors } = useTheme();
  const { register, handleSubmit } = useForm();

  const [id, setId] = useState<string | undefined>(undefined);
  const [thumbnail, setThumbnail] = useState<IThumbnail>();
  const [video, setVideo] = useState<IVideo>();
  const [images, setImages] = useState<ISlides[]>([]);

  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [videoFile, setVideoFile] = useState<File>();
  const [imagesFile, setImagesFile] = useState<File[]>([]);

  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user && loadedAuth) {
      Routes.push('/auth/login');
    }
  }, [user, loadedAuth]);

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  useEffect(() => {
    setLoading(true);
    const projectRef = database.ref('projects');

    projectRef.on('value', (response) => {
      const projects: TypeFirebaseProjects = response.val() ?? ({} as TypeFirebaseProjects);

      const parsedProjects: IProject[] = Object.entries(projects).map(([key, value]) => {
        return {
          id: key,
          title: value.title ?? '',
          about: value.about ?? '',
          githubUrl: value.githubUrl ?? '',
          knowledge: value.knowledge ?? '',
          resume: value.resume ?? '',
          url: value.url ?? '',
          video: value.video,
          thumbnail: value.thumbnail ?? ({} as IThumbnail),
          images: Object.entries(value.images ?? {}).map(([key, value]) => {
            return {
              id: key,
              name: value.name,
              url: value.url,
            };
          }),
        };
      });

      setProjects(parsedProjects.reverse());
      setLoading(false);
    });

    return () => projectRef.off('value');
  }, []);

  function handleOpenModalEdit(project: IProject) {
    setId(project.id);
    setImages(project.images);
    setVideo(project.video);
    setThumbnail(project.thumbnail);
    setShowModal(true);
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    clearData();
  }, []);

  function handleSelectImagesSlide(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImagesFile((oldstate) => [...oldstate, selectedImages[0]]);

    const selectedImagesPreview = selectedImages.map((image) => {
      return {
        name: image.name,
        url: URL.createObjectURL(image),
      };
    });
    setImages((oldstate) => [...oldstate, selectedImagesPreview[0]]);
  }

  function handleSelectImageThumbnail(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImage = Array.from(event.target.files);
    setThumbnailFile(selectedImage[0]);

    const selectedImagesPreview = {
      name: selectedImage[0].name,
      url: URL.createObjectURL(selectedImage[0]),
    };

    setThumbnail(selectedImagesPreview);
  }

  function handleSelectVideo(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files[0].type !== 'video/mp4') {
      toast.error('Formato inválido! Insira um video no formato MP4');
      return;
    }

    const selectedVideo = Array.from(event.target.files);
    setVideoFile(selectedVideo[0]);

    const selectedVideoPreview = {
      name: selectedVideo[0].name,
      url: URL.createObjectURL(selectedVideo[0]),
    };

    setVideo(selectedVideoPreview);
  }

  function handleRemoveImageSlide(image: string) {
    setImages((oldstate) => oldstate.filter((img) => img.name !== image));
    setImagesFile((oldstate) => oldstate.filter((img) => img.name !== image));
  }

  function handleRemoveImageThumbnail() {
    setThumbnail(undefined);
    setThumbnailFile(undefined);
  }

  function handleRemoveVideo() {
    setVideo(undefined);
    setVideoFile(undefined);
  }

  function clearData() {
    setThumbnail(undefined);
    setVideo(undefined);
    setImages([]);
    setThumbnailFile(undefined);
    setVideoFile(undefined);
    setImagesFile([]);
  }

  async function handleSaveNewProject(data: IProjectData) {
    setShowModal(false);
    setLoading(true);

    const { title, resume, githubUrl, about, knowledge, url } = data;

    if (title.trim() === '' || resume.trim() === '' || githubUrl.trim() === '') {
      setLoading(false);
      toast.error('Campos obrigatórios não informados');
      return;
    }

    try {
      const project = await database.ref('projects').push({
        title,
        resume,
        about,
        githubUrl,
        knowledge,
        url,
      } as IProject);

      const thumbnailRef = storage.ref(`/projects/${project.key}/thumbnail/${thumbnail.name}`);
      await thumbnailRef.put(thumbnailFile);
      const thumbnailUrl = {
        url: await thumbnailRef.getDownloadURL(),
        name: thumbnail.name,
      };

      if (videoFile) {
        const videoRef = storage.ref(`/projects/${project.key}/video/${video.name}`);
        await videoRef.put(videoFile);
        const videoUrl = {
          url: await videoRef.getDownloadURL(),
          name: thumbnail.name,
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
      clearData();
    } catch {
      toast.error(`Erro ao salvar!`);
    } finally {
      setLoading(false);
    }
  }

  async function handleEditProject(data: IProjectData) {
    setShowModal(false);
    setLoading(true);

    let thumbnailUrl: IThumbnail = undefined;
    let videoUrl: IVideo = undefined;
    let imagesUrl: ISlides[] = undefined;

    try {
      if (thumbnailFile) {
        const thumbnailRef = storage.ref(`/projects/${id}/thumbnail/${thumbnail.name}`);
        await thumbnailRef.put(thumbnailFile);
        thumbnailUrl = {
          url: await thumbnailRef.getDownloadURL(),
          name: thumbnail.name,
        };
      }

      if (videoFile) {
        const videoRef = storage.ref(`/projects/${id}/video/${video.name}`);
        await videoRef.put(videoFile);
        videoUrl = {
          url: await videoRef.getDownloadURL(),
          name: thumbnail.name,
        };
      }

      if (imagesFile.length !== 0) {
        imagesUrl = await Promise.all(
          imagesFile.map(async (image) => {
            const projectRef = storage.ref(`/projects/${id}/slide/${image.name}`);
            await projectRef.put(image);
            return {
              name: image.name,
              url: await projectRef.getDownloadURL(),
            };
          })
        );
      }

      if (!data.title) {
        delete data.title;
      }
      if (!data.resume) {
        delete data.resume;
      }
      if (!data.about) {
        delete data.about;
      }
      if (!data.githubUrl) {
        delete data.githubUrl;
      }
      if (!data.knowledge) {
        delete data.knowledge;
      }
      if (!data.url) {
        delete data.url;
      }

      await database.ref(`projects/${id}`).update(data);

      if (thumbnailUrl) {
        await database.ref(`projects/${id}`).update({
          thumbnail: thumbnailUrl,
        } as IProject);
      }

      if (videoUrl) {
        await database.ref(`projects/${id}`).update({
          video: videoUrl,
        } as IProject);
      }

      if (imagesUrl) {
        await database.ref(`projects/${id}`).update({
          images: imagesUrl,
        } as IProject);
      }

      toast.success(`Projeto editado com sucesso!`);
    } catch {
      toast.error('Erro ao salvar!');
    } finally {
      clearData();
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

      <Container>
        <Button onClick={() => setShowModal(true)}>Adicionar</Button>

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
                <button onClick={() => handleOpenModalEdit(project)} type="button">
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
        <Modal
          closeModal={handleCloseModal}
          onSubmit={id ? handleSubmit(handleEditProject) : handleSubmit(handleSaveNewProject)}
        >
          <Input type="text" placeholder="Título" {...register('title')} />

          <Textarea placeholder="Resumo" {...register('resume')} />

          <Textarea placeholder="Sobre" {...register('about')} />

          <Textarea placeholder="Conhecimentos" {...register('knowledge')} />

          <Input type="text" placeholder="Link" {...register('url')} />

          <Input type="text" placeholder="Link no github" {...register('githubUrl')} />

          <InputFile title="Selecione a thumbnail" onChange={handleSelectImageThumbnail}>
            {thumbnail && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveImageThumbnail} />
                </div>
                <img src={thumbnail.url} alt={thumbnail.name} />
              </div>
            )}
          </InputFile>

          <InputFile title="Selecione um vídeo" onChange={handleSelectVideo}>
            {video && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveVideo} />
                </div>
                <video controls>
                  <source type="video/webm" src={video.url} />
                  <strong>Seu navegador não possui suporte para videos. </strong>
                </video>
              </div>
            )}
          </InputFile>

          <InputFile title="Selecione as imagens para o slide" onChange={handleSelectImagesSlide}>
            {images.map((image) => (
              <div className="image-container" key={image.url}>
                <div className="icon-container">
                  <FiX color="#fff" onClick={() => handleRemoveImageSlide(image.name)} />
                </div>
                <img src={image.url} alt={image.name} />
              </div>
            ))}
          </InputFile>

          <Button type="submit" style={{ alignSelf: 'center' }}>
            Salvar
          </Button>
        </Modal>
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
