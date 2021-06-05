import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../../services/api';

import { Modal } from '../../components/Modal';

import { Container, Card } from '../../styles/pages/auth/skills';
import { Input, Textarea } from '../../styles/global';
import { useAuth } from '../../contexts/AuthContext';

import { ISkill } from '../../../types/lmiguelm/ISkills';

type ISkillProps = {
  initialSkills: ISkill[];
};

export default function Tools({ initialSkills }: ISkillProps) {
  const [skills, setTools] = useState(initialSkills);

  const { handleSetHeader } = useAuth();

  useEffect(() => {
    handleSetHeader('private');
  }, []);

  async function handleRemoveSkill(id: string) {
    try {
      await api.delete(`${process.env.NEXT_PUBLIC_APP_URL}/skills/delete/${id}`);

      if (confirm(`Tem certeza que deseja deletar está habilidade?`)) {
        const newSkill = skills.filter((skill) => skill.id !== id);
        setTools(newSkill);
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
        {skills.map((skill) => (
          <Card key={skill.id}>
            <img src={skill.image} alt={skill.name} />

            <div>
              <h3>{skill.name}</h3>
              <p>{skill.description}</p>
            </div>

            <footer>
              <Link href={`/auth/edit/skills?id=${skill.id}`}>
                <button type="button">Editar</button>
              </Link>
              <button onClick={() => handleRemoveSkill(skill.id)} type="button">
                Remover
              </button>
            </footer>
          </Card>
        ))}
      </Container>

      <Modal handleSubmit={() => {}}>
        <Input type="text" placeholder="Nome" />
        <Input type="text" placeholder="Url" />
        <Textarea placeholder="Descrição" />
      </Modal>
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

    const { data } = await api.get('/skills');

    return {
      props: {
        initialSkills: data,
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
