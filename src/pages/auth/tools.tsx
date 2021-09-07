import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { toast, Toaster } from 'react-hot-toast';

import { ToolsModal } from '../../components/ToolsModal';

import { Container, Card } from '../../styles/pages/auth/tools';

import { Button } from '../../components/Button';
import { database, storage } from '../../services/firebase';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

import { ITool } from '../../../@types/lmiguelm/tools';
import { Loading } from '../../components/Loading';
import { useTools } from '../../hooks/useTools';
import { AuthHeader } from '../../components/AuthHeader';

export type IToolData = {
  id?: string;
  name: string;
  description: string;
  url: string;
};

export default function Tools() {
  const { loadedAuth } = useAuth({ header: 'private', route: 'private' });
  const { colors } = useTheme();
  const { tools, loading: loadingTools } = useTools();

  const [selectedTool, setSelectedTool] = useState<ITool>({} as ITool);
  const [loading, setLoading] = useState<boolean>(loadingTools);

  const [showModal, setShowModal] = useState(false);

  function handleOpenModal(tool?: ITool) {
    setShowModal(true);
    setSelectedTool(tool);
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  async function handleRemoveTool(id: string) {
    setLoading(true);
    await database.ref(`tools/${id}`).remove();
    await storage.ref(`tools/${id}`).delete();
    toast.success('Habilidade removida com sucesso!');
    setLoading(false);
  }

  const saveNewTool = useCallback(
    async (data: IToolData, file: File) => {
      setShowModal(false);
      setLoading(true);

      const { name, description, url } = data;

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
        toast.success(`${name} salvo com sucesso!`);
      } catch {
        toast.error('Erro ao salvar!');
      } finally {
        setLoading(false);
      }
    },
    [loading, showModal]
  );

  const editTool = useCallback(
    async (data: IToolData, file: File) => {
      setShowModal(false);
      setLoading(true);

      try {
        if (file) {
          const imageRef = storage.ref(`images/${file.name}`);
          await imageRef.put(file);
          const imageUrl = {
            url: await imageRef.getDownloadURL(),
            name: file.name,
          };

          await database.ref(`/tools/${data.id}`).update({ image: imageUrl });
        }

        await database.ref(`/tools/${data.id}`).update(data);

        toast.success(`Tool editada com sucesso!`);
      } catch (error) {
        console.log(error);
        toast.error(`Errro ao editar`);
      } finally {
        setLoading(false);
      }
    },
    [loading, showModal]
  );

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
        <Button onClick={() => handleOpenModal({} as ITool)}>Adicionar</Button>

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
                <button onClick={() => handleOpenModal(tool)} type="button">
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
        <ToolsModal
          tool={selectedTool}
          closeModal={handleCloseModal}
          editTool={editTool}
          newTool={saveNewTool}
        />
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
