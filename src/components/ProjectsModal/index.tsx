import React, { ChangeEvent, useEffect, useState } from 'react';

import { Container } from './styles';
import { Blur } from '../../styles/global';

import { FiX } from 'react-icons/fi';
import { InputFile } from '../InputFile';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from 'styled-components';
import { IProject, ISlides, IThumbnail, IVideo } from '../../../@types/lmiguelm/project';
import { IProjectData } from '../../pages/auth/projects';

type IModalProps = {
  project: IProject;
  closeModal(): void;
  newProject(data: IProjectData, file: IProjectFile): void;
  editProject(data: IProjectData, file: IProjectFile): void;
};

export type IProjectFile = {
  images: File[];
  thumbnail: File;
  video: File;
};

type IPreviewFile = {
  thumbnail: IThumbnail;
  images: ISlides[];
  video: IVideo;
};

export function ProjectsModal({ project, closeModal, editProject, newProject }: IModalProps) {
  const { register, handleSubmit } = useForm();
  const { colors } = useTheme();

  const [file, setFile] = useState<IProjectFile>({} as IProjectFile);

  const [preview, setPreview] = useState<IPreviewFile>({} as IPreviewFile);

  useEffect(() => {
    const { thumbnail, images, video } = project;

    thumbnail && setPreview((oldstate) => ({ ...oldstate, thumbnail }));
    images && setPreview((oldstate) => ({ ...oldstate, images }));
    video && setPreview((oldstate) => ({ ...oldstate, video }));
  }, []);

  function handleSelectThumbnail(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      toast.error('Selecione uma imagem para a thumbnail!');
      return;
    }

    const file = Array.from(event.target.files)[0];

    const preview = {
      name: file.name,
      url: URL.createObjectURL(file),
    };

    setFile((oldstate) => ({ ...oldstate, thumbnail: file }));
    setPreview((oldstate) => ({ ...oldstate, thumbnail: preview }));
  }

  function handleRemoveThumbnail() {
    setFile((oldstate) => ({ ...oldstate, thumbnail: null }));
    setPreview((oldstate) => ({ ...oldstate, thumbnail: { name: undefined, url: undefined } }));
  }

  function handleSelectVideo(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      toast.error('Selecione um video!');
      return;
    }

    const file = Array.from(event.target.files)[0];

    const preview = {
      name: file.name,
      url: URL.createObjectURL(file),
    };

    setFile((oldstate) => ({ ...oldstate, video: file }));
    setPreview((oldstate) => ({ ...oldstate, video: preview }));
  }

  function handleRemoveVideo() {
    setFile((oldstate) => ({ ...oldstate, video: null }));
    setPreview((oldstate) => ({ ...oldstate, video: { name: undefined, url: undefined } }));
  }

  function handleSelectImagesSlide(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      toast.error('Selecione uma imagem para o slide!');
      return;
    }

    const file = Array.from(event.target.files)[0];

    const preview = {
      name: file.name,
      url: URL.createObjectURL(file),
    };

    setFile((oldstate) => ({
      ...oldstate,
      images: oldstate && oldstate.images ? [...oldstate.images, file] : [file],
    }));

    setPreview((oldstate) => ({
      ...oldstate,
      images: oldstate && oldstate.images ? [...oldstate.images, preview] : [preview],
    }));
  }

  function handleRemoveImageSlide(image: string) {
    if (file) {
      setFile((oldstate) => ({
        ...oldstate,
        images: oldstate.images.filter((slide) => slide.name !== image),
      }));
    }

    setPreview((oldstate) => ({
      ...oldstate,
      images: oldstate.images.filter((img) => img.name !== image),
    }));
  }

  function handleSaveNewProject(data: IProjectData) {
    const { title = '', resume = '', githubUrl, about, knowledge, url } = data;

    if (title.trim() === '' || resume.trim() === '') {
      toast.error('Campos obrigatórios não informados');
      return;
    }

    if (
      file.images.length === 0 &&
      Object.keys(file.thumbnail).length === 0 &&
      Object.keys(file.video).length === 0
    ) {
      toast.error('Campos obrigatórios não informados');
      return;
    }

    if (!about) {
      data.about = null;
    }
    if (!knowledge) {
      data.knowledge = null;
    }
    if (!url) {
      data.url = null;
    }
    if (!githubUrl) {
      data.githubUrl = null;
    }

    newProject(data, file);
  }

  function handleEditProject(data: IProjectData) {
    const { about, url, githubUrl, resume, title, knowledge } = data;

    if (!data && !file && preview) {
      return;
    }

    if (!data && !file && !preview) {
      toast.error('Informe dados para a edição!');
      return;
    }

    if (title) {
      delete data.title;
    }
    if (resume) {
      delete data.resume;
    }
    if (about) {
      delete data.about;
    }
    if (githubUrl) {
      delete data.githubUrl;
    }
    if (knowledge) {
      delete data.knowledge;
    }
    if (url) {
      delete data.url;
    }

    editProject(data, file);
  }

  return (
    <>
      <Container
        onSubmit={project.id ? handleSubmit(handleEditProject) : handleSubmit(handleSaveNewProject)}
      >
        <FiX color="red" className="close" onClick={closeModal} />

        <main>
          <Input type="text" placeholder="Título" {...register('title')} />

          <Textarea placeholder="Resumo" {...register('resume')} />

          <Textarea placeholder="Sobre" {...register('about')} />

          <Textarea placeholder="Conhecimentos" {...register('knowledge')} />

          <Input type="text" placeholder="Link" {...register('url')} />

          <Input type="text" placeholder="Link no github" {...register('githubUrl')} />

          <InputFile title="Selecione a thumbnail" onChange={handleSelectThumbnail}>
            {preview.thumbnail && preview.thumbnail.url && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveThumbnail} />
                </div>
                <img src={preview.thumbnail.url} alt={preview.thumbnail.name} />
              </div>
            )}
          </InputFile>

          <InputFile title="Selecione um vídeo" onChange={handleSelectVideo}>
            {preview.video && preview.video.url && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveVideo} />
                </div>
                <video controls>
                  <source type="video/webm" src={preview.video.url} />
                  <strong>Seu navegador não possui suporte para videos. </strong>
                </video>
              </div>
            )}
          </InputFile>

          <InputFile title="Selecione as imagens para o slide" onChange={handleSelectImagesSlide}>
            {preview.images &&
              preview.images.map((image) => (
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
        </main>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: colors.backgroundSecondary,
              color: colors.textPrimary,
              zIndex: 99999,
            },
          }}
        />
      </Container>

      <Blur />
    </>
  );
}
