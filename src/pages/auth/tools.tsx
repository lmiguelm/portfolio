import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { api } from '../../services/api';

import { Header } from '../../components/AuthHeader';

import { Container, Card } from '../../styles/pages/auth/tools';

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

  async function hanleRemoveTool(id: string) {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_APP_URL}/tools/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar está ferramenta?`)) {
        const newTools = tools.filter((tool) => tool.id !== id);
        setTools(newTools);
      }
    } catch (error) {
      console.log('erro', error);
      alert('Erro interno do servidor!');
    }
  }

  return (
    <>
      <Header currentPage="tools" showRegisterButton />
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
