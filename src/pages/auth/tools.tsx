import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Routes from 'next/router';
import { FiX } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

import { Modal } from '../../components/Modal';

import { Container, Card } from '../../styles/pages/auth/tools';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea';
import { database, storage } from '../../services/firebase';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

import { IImage, ITool, TypeFirebaseTools } from '../../../types/lmiguelm/tools';
import { Loading } from '../../components/Loading';
import { InputFile } from '../../components/InputFile';

export default function Tools() {
  const { handleSetHeader, user, loadedAuth } = useAuth();
  const { colors } = useTheme();

  const [tools, setTools] = useState<ITool[]>([]);
  const [tool, setTool] = useState<ITool | undefined>({} as ITool);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

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
    const toolsRef = database.ref('tools');

    toolsRef.on('value', (response) => {
      const tools: TypeFirebaseTools = response.val() ?? ({} as TypeFirebaseTools);

      const parsedtools = Object.entries(tools).map(([key, value]) => {
        return {
          id: key,
          description: value.description,
          name: value.name,
          url: value.url,
          image: value.image ?? ({} as IImage),
        };
      });

      setTools(parsedtools);
      setLoading(false);
    });

    return () => toolsRef.off('value');
  }, []);

  function handleOpenModalEdit(tool: ITool) {
    setTool(tool);
    setShowModal(true);
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    clearData();
  }, []);

  async function handleRemoveTool(id: string) {
    setLoading(true);
    await database.ref(`tools/${id}`).remove();
    await storage.ref(`tools/${id}`).delete();
    toast.success('Habilidade removida com sucesso!');
    setLoading(false);
  }

  async function handleEdit(event: FormEvent) {
    setShowModal(false);
    setLoading(true);
    event.preventDefault();

    const { name, description, url, id } = tool;

    if (name.trim() === '' || description.trim() === '' || url.trim() === '') {
      toast.error('Campos não podem ser vazios!');
      setLoading(false);
      return;
    }

    try {
      if (file) {
        const imageRef = storage.ref(`images/${file.name}`);
        await imageRef.put(file);
        const imageUrl = {
          url: await imageRef.getDownloadURL(),
          name: file.name,
        };

        await database.ref(`/tools/${id}`).update({ image: imageUrl });
      }

      await database.ref(`/tools/${id}`).update(tool);

      clearData();
      toast.success(`${name} editado com sucesso!`);
    } catch {
      toast.error('Erro ao salvar!');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveNewtool(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setShowModal(false);

    if (!file) {
      toast.error('Selecione uma imagem');
      return;
    }

    const { name, description, url } = tool;

    if (name.trim() === '' || description.trim() === '' || url.trim() === '') {
      toast.error('Campos não podem ser vazios!');
      return;
    }

    try {
      const { key } = await database.ref('tools').push({
        name,
        description,
        url,
      });

      const imageRef = storage.ref(`tools/${key}`);
      await imageRef.put(file);
      const imageUrl = {
        name: file.name,
        url: await imageRef.getDownloadURL(),
      };

      await database.ref(`tools/${key}`).update({ image: imageUrl });

      clearData();
      toast.success(`${name} salvo com sucesso!`);
    } catch {
      toast.error('Erro ao salvar!');
    } finally {
      setLoading(false);
    }
  }

  function handleSelectFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      toast.error('Selecione uma Imagem');
      return;
    }

    const selectedVideo = Array.from(event.target.files);
    setFile(selectedVideo[0]);

    const selectedVideoPreview = {
      name: selectedVideo[0].name,
      url: URL.createObjectURL(selectedVideo[0]),
    };

    setTool({ ...tool, image: selectedVideoPreview });
  }

  function handleRemoveFile() {
    setFile(undefined);
    setTool({ ...tool, image: undefined });
  }

  function clearData() {
    setTool({} as ITool);
    setFile(undefined);
  }

  if (loading || loadedAuth) {
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
          {tools.map((tool) => (
            <Card key={tool.id}>
              <header>
                <img src={tool.image.url} alt={tool.image.name} />
              </header>

              <main className="card">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
              </main>

              <footer>
                <button onClick={() => handleOpenModalEdit(tool)} type="button">
                  Editar
                </button>
                <button onClick={() => handleRemoveTool(tool.id)} type="button">
                  Remover
                </button>
              </footer>
            </Card>
          ))}
        </main>
      </Container>

      {showModal && (
        <Modal closeModal={handleCloseModal} onSubmit={tool.id ? handleEdit : handleSaveNewtool}>
          <InputFile title="Selecione a imagem" onChange={handleSelectFile}>
            {tool.image && (
              <div className="image-container">
                <div className="icon-container">
                  <FiX color="#fff" onClick={handleRemoveFile} />
                </div>
                <img src={tool.image.url} alt={tool.image.name} />
              </div>
            )}
          </InputFile>

          <Input
            type="text"
            placeholder="Nome"
            value={tool.name}
            onChange={(event) => setTool({ ...tool, name: event.target.value })}
          />

          <Input
            type="text"
            placeholder="Url"
            value={tool.url}
            onChange={(event) => setTool({ ...tool, url: event.target.value })}
          />

          <Textarea
            placeholder="Descrição"
            value={tool.description}
            onChange={(event) => setTool({ ...tool, description: event.target.value })}
          />

          <Button type="submit" style={{ alignSelf: 'center' }}>
            Salvar
          </Button>
        </Modal>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: colors.backgroundSecondary, color: colors.textPrimary },
        }}
      />
    </>
  );
}
