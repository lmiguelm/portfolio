import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../../services/api';

import { Container, Card } from '../../styles/pages/auth/tools';
import { useAuth } from '../../contexts/AuthContext';

type ITool = {
  id: string;
  name: string;
  image: string;
  url: string;
  description: string;
};

type IToolProps = {
  initialTools: ITool[];
};

export default function Tools({ initialTools }: IToolProps) {
  const [tools, setTools] = useState(initialTools);

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
              <Link href={`/auth/tools/edit?id=${tool.id}`}>
                <button type="button">Editar</button>
              </Link>
              <button onClick={() => hanleRemoveTool(tool.id)} type="button">
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
