import React, { ChangeEvent, useState } from 'react';

import { Container } from './styles';
import { Blur } from '../../styles/global';

import { FiX } from 'react-icons/fi';
import { InputFile } from '../InputFile';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Button } from '../Button';
import { useForm } from 'react-hook-form';
import { ITool } from '../../../@types/lmiguelm/tools';
import { IToolData } from '../../pages/auth/tools';
import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from 'styled-components';

type IModalProps = {
  tool: ITool;
  closeModal(): void;
  newTool(data: IToolData, file: File): void;
  editTool(data: IToolData, file: File): void;
};

type IPreviewFile = {
  url: string;
  name: string;
};

export function ToolsModal({ tool, closeModal, editTool, newTool }: IModalProps) {
  const { register, handleSubmit } = useForm();
  const { colors } = useTheme();

  const [file, setFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState<IPreviewFile>(
    tool.image
      ? {
          name: tool.image.name,
          url: tool.image.url,
        }
      : ({} as IPreviewFile)
  );

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      toast.error('Selecione uma imagem!');
      return;
    }

    const file = Array.from(event.target.files)[0];

    const filePreview = {
      name: file.name,
      url: URL.createObjectURL(file),
    };

    setFile(file);
    setPreviewFile(filePreview);
  }

  function handleRemoveFile() {
    setFile(null);
    setPreviewFile({ name: undefined, url: undefined });
  }

  function handleEditSkill(data: IToolData) {
    const { name, description, url } = data;

    if (!name && !description && !url && !file) {
      toast.error('Informe dados para a edição!');
      return;
    }

    if (!name) {
      delete data.name;
    }
    if (!url) {
      delete data.url;
    }
    if (!description) {
      delete data.description;
    }

    editTool({ ...data, id: tool.id }, file);
  }

  function handleNewSkill(data: IToolData) {
    const { name, description, url } = data;

    if (!file) {
      toast.error('Selecione uma imagem!');
      return;
    }

    if (!name || !description || !url) {
      toast.error('Preencha todos os campos!');
      return;
    }

    if (name.trim() === '' || description.trim() === '' || url.trim() === '') {
      toast.error('Campos não podem ser vazios!');
      return;
    }

    newTool(data, file);
  }

  return (
    <>
      <Container onSubmit={tool.id ? handleSubmit(handleEditSkill) : handleSubmit(handleNewSkill)}>
        <FiX color="red" className="close" onClick={closeModal} />

        <main>
          <InputFile title="Selecione a imagem" onChange={handleSelectFile}>
            {previewFile.url && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveFile} />
                </div>
                <img src={previewFile.url} alt={previewFile.name} />
              </div>
            )}
          </InputFile>

          <Input type="text" placeholder="Nome" {...register('name')} />

          <Input type="text" placeholder="Url" {...register('url')} />

          <Textarea placeholder="Descrição" {...register('description')} />

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
