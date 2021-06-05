import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../../services/api';

import { Container, Card } from '../../styles/pages/auth/tools';
import { useAuth } from '../../contexts/AuthContext';

import { ITool } from '../../../types/lmiguelm/ITools';
import { FormEvent } from 'react';
import { Button, Input, Textarea } from '../../styles/global';
import { Modal } from '../../components/Modal';

type IToolProps = {
  initialTools: ITool[];
};

export default function Tools({ initialTools }: IToolProps) {
  const [tools, setTools] = useState(initialTools);
  const [tool, setTool] = useState<ITool>({} as ITool);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  async function hanleRemoveTool(id: string) {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_APP_URL}/tools/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar está ferramenta?`)) {
        const newTools = tools.filter((tool) => tool.id !== id);
        setTools(newTools);
      }
    } catch (error) {
      alert('Erro interno do servidor!');
    }
  }

  function handleOpenModalEdit(tool: ITool) {
    setTool(tool);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(!showModal);
  }

  async function handleEdit(event: FormEvent) {
    event.preventDefault();

    const { name, description, url } = tool;

    if (name.length == 0 || description.length == 0 || url.length == 0) {
      alert('Campos não podem ser vazios!');
      return;
    }

    try {
      await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/tools/update/${tool.id}`, tool);

      const newtools = tools.map((element) => {
        if (element.id == tool.id) {
          return {
            ...element,
            ...tool,
          };
        }
        return element;
      });

      setTools(newtools as []);
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
        {tools.map((tool) => (
          <Card key={tool.id}>
            <img src={tool.image} alt={tool.name} />

            <div>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>

            <footer>
              <button onClick={() => handleOpenModalEdit(tool)} type="button">
                Editar
              </button>

              <button onClick={() => hanleRemoveTool(tool.id)} type="button">
                Remover
              </button>
            </footer>
          </Card>
        ))}
      </Container>

      {showModal && (
        <Modal closeModal={handleCloseModal} handleSubmit={tool.id ? handleEdit : () => {}}>
          <Input
            type="text"
            placeholder="Nome"
            value={tool.name}
            onChange={(event) => setTool({ ...tool, name: event.target.value })}
          />

          <Input
            type="text"
            placeholder="Url"
            value={tool.description}
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

    const { data } = await api.get('/tools');

    return {
      props: {
        initialTools: data,
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
